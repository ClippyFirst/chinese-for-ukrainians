#!/usr/bin/env node
/**
 * Validate the research benchmark corpus schema without treating examples as gold.
 * This checks structural integrity only; it does not certify linguistic correctness.
 * Optional first CLI argument allows isolated fixture validation in automated tests.
 */
import fs from "node:fs";

const path = process.argv[2] ?? "docs/audits/current/CROSS-ENGINE-BENCHMARK-CORPUS-SCHEMA-2026-10-24.csv";
const requiredHeaders = [
  "case_id", "partition", "layer", "source_text", "target_span",
  "intended_sense", "expected_pinyin", "expected_ipa", "ipa_convention",
  "expected_uk_kirnosova", "expected_uk_kirnosova_tsisar", "expected_uk_nanu",
  "source_url", "source_quote_or_locator", "evidence_scope", "review_status",
  "reviewer", "license_status", "notes"
];
const allowedPartitions = new Set(["development", "held_out", "challenge"]);
const allowedLayers = new Set(["g2p", "ipa", "ukrainian", "end_to_end"]);
const allowedReviewStatuses = new Set(["NOT_GOLD", "UNREVIEWED", "IN_REVIEW", "VERIFIED", "DISPUTED", "UNRESOLVED"]);
const allowedLicenseStatuses = new Set(["UNREVIEWED", "OPEN", "RESTRICTED", "PERMISSION_REQUIRED", "PUBLIC_DOMAIN", "NOT_APPLICABLE"]);

function parseCsv(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (quoted) {
      if (ch === '"' && text[i + 1] === '"') { field += '"'; i++; }
      else if (ch === '"') quoted = false;
      else field += ch;
    } else if (ch === '"' && field.length === 0) quoted = true;
    else if (ch === ",") { row.push(field); field = ""; }
    else if (ch === "\n") {
      row.push(field.replace(/\r$/, ""));
      if (row.some((cell) => cell.length > 0)) rows.push(row);
      row = []; field = "";
    } else field += ch;
  }
  if (quoted) throw new Error("CSV ends inside a quoted field.");
  if (field.length || row.length) { row.push(field.replace(/\r$/, "")); rows.push(row); }
  return rows;
}

function fail(message) {
  console.error(`BENCHMARK_CORPUS_INVALID: ${message}`);
  process.exitCode = 1;
}

if (!fs.existsSync(path)) {
  fail(`missing corpus schema file: ${path}`);
} else {
  let rows;
  try {
    rows = parseCsv(fs.readFileSync(path, "utf8"));
  } catch (error) {
    fail(error.message);
    process.exit(1);
  }
  const headers = rows.shift() ?? [];
  const missing = requiredHeaders.filter((header) => !headers.includes(header));
  const duplicates = headers.filter((header, index) => headers.indexOf(header) !== index);
  if (missing.length) fail(`missing required headers: ${missing.join(", ")}`);
  if (duplicates.length) fail(`duplicate headers: ${[...new Set(duplicates)].join(", ")}`);

  const index = Object.fromEntries(headers.map((header, i) => [header, i]));
  const ids = new Set();
  for (const [offset, cells] of rows.entries()) {
    const line = offset + 2;
    if (cells.length !== headers.length) {
      fail(`line ${line}: expected ${headers.length} cells, got ${cells.length}`);
      continue;
    }
    const get = (key) => (cells[index[key]] ?? "").trim();
    const id = get("case_id");
    if (!id) fail(`line ${line}: case_id is empty`);
    if (ids.has(id)) fail(`line ${line}: duplicate case_id ${id}`);
    ids.add(id);
    if (!allowedPartitions.has(get("partition"))) fail(`line ${line}: invalid partition ${get("partition")}`);
    if (!allowedLayers.has(get("layer"))) fail(`line ${line}: invalid layer ${get("layer")}`);
    if (!allowedReviewStatuses.has(get("review_status"))) fail(`line ${line}: invalid review_status ${get("review_status")}`);
    if (!allowedLicenseStatuses.has(get("license_status"))) fail(`line ${line}: invalid license_status ${get("license_status")}`);

    const status = get("review_status");
    const partition = get("partition");
    const layer = get("layer");
    const expectedFieldsByLayer = {
      g2p: ["expected_pinyin"],
      ipa: ["expected_ipa", "ipa_convention"],
      ukrainian: [],
      end_to_end: ["expected_pinyin", "expected_ipa", "ipa_convention", "expected_uk_kirnosova", "expected_uk_kirnosova_tsisar", "expected_uk_nanu"]
    };
    if (status === "VERIFIED") {
      for (const key of ["source_text", "target_span", "source_url", "source_quote_or_locator", "evidence_scope", "reviewer"]) {
        if (!get(key)) fail(`line ${line}: VERIFIED row requires ${key}`);
      }
      if (get("license_status") === "UNREVIEWED") fail(`line ${line}: VERIFIED row cannot have UNREVIEWED license status`);
      const requiredExpectedFields = expectedFieldsByLayer[layer] ?? [];
      for (const key of requiredExpectedFields) {
        if (key === "ipa_convention") {
          if (!get(key) || get(key).toLowerCase() === "not_applicable") {
            fail(`line ${line}: VERIFIED IPA row requires a non-empty declared IPA convention`);
          }
        } else if (!get(key)) {
          fail(`line ${line}: VERIFIED ${layer} row requires ${key}`);
        }
      }
      if (layer === "ukrainian" && !["expected_uk_kirnosova", "expected_uk_kirnosova_tsisar", "expected_uk_nanu"].some(get)) {
        fail(`line ${line}: VERIFIED ukrainian row requires at least one expected Ukrainian output`);
      }
      if (partition === "held_out" && /\b(tun(e|ing)|train(ing)?|develop(ment)?)\b/i.test(get("notes"))) {
        fail(`line ${line}: held_out row notes indicate possible tuning leakage`);
      }
    }
    if (partition === "held_out" && status !== "VERIFIED") {
      fail(`line ${line}: held_out rows must be VERIFIED before they can be used for scoring`);
    }
    if (partition === "held_out" && status === "VERIFIED" && get("license_status") === "PERMISSION_REQUIRED") {
      fail(`line ${line}: held_out row cannot be used until required permission is documented`);
    }
    if (get("review_status") === "NOT_GOLD" && get("partition") === "held_out") {
      fail(`line ${line}: NOT_GOLD example cannot be in held_out partition`);
    }
  }
  if (!rows.length) fail("corpus contains no data rows; retain an explicit NOT_GOLD schema example until verified rows exist");
  if (!process.exitCode) {
    const verified = rows.filter((cells) => cells[index.review_status] === "VERIFIED").length;
    const heldOut = rows.filter((cells) => cells[index.partition] === "held_out").length;
    console.log(`Benchmark corpus schema PASS: ${rows.length} row(s) structurally valid; ${verified} VERIFIED row(s), ${heldOut} held-out row(s). Structural validation is not linguistic adjudication.`);
  }
}
