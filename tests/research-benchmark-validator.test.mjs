import assert from "node:assert/strict";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { after, test } from "node:test";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../", import.meta.url));
const validator = path.join(root, "scripts/validate-benchmark-corpus.mjs");
const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), "benchmark-corpus-validator-"));
after(() => fs.rmSync(tempDir, { recursive: true, force: true }));

const headers = [
  "case_id", "partition", "layer", "source_text", "target_span", "intended_sense",
  "expected_pinyin", "expected_ipa", "ipa_convention", "expected_uk_kirnosova",
  "expected_uk_kirnosova_tsisar", "expected_uk_nanu", "source_url",
  "source_quote_or_locator", "evidence_scope", "review_status", "reviewer",
  "license_status", "notes"
];
const valid = {
  case_id: "TEST-001", partition: "development", layer: "g2p",
  source_text: "银行", target_span: "行", intended_sense: "bank",
  expected_pinyin: "háng", expected_ipa: "", ipa_convention: "not_applicable",
  expected_uk_kirnosova: "", expected_uk_kirnosova_tsisar: "", expected_uk_nanu: "",
  source_url: "https://example.org/source", source_quote_or_locator: "table 1",
  evidence_scope: "target character reading", review_status: "VERIFIED",
  reviewer: "test fixture", license_status: "OPEN", notes: "fixture only"
};
function csvRow(record) {
  return headers.map((key) => {
    const value = String(record[key] ?? "");
    return /[",\r\n]/u.test(value) ? `"${value.replaceAll('"', '""')}"` : value;
  }).join(",");
}
function run(records) {
  const file = path.join(tempDir, `fixture-${Math.random().toString(36).slice(2)}.csv`);
  fs.writeFileSync(file, [headers.join(","), ...records.map(csvRow)].join("\n") + "\n");
  return spawnSync(process.execPath, [validator, file], { encoding: "utf8" });
}

test("accepts a VERIFIED G2P row with reading evidence and reviewed rights", () => {
  const result = run([valid]);
  assert.equal(result.status, 0, result.stderr);
  assert.match(result.stdout, /1 VERIFIED row\(s\)/u);
});

test("rejects a VERIFIED IPA row without a declared IPA convention", () => {
  const record = { ...valid, layer: "ipa", expected_pinyin: "", expected_ipa: "ɕi", ipa_convention: "" };
  const result = run([record]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /requires a non-empty declared IPA convention/u);
});

test("accepts one explicitly populated Ukrainian system without requiring all three", () => {
  const record = {
    ...valid, layer: "ukrainian", expected_pinyin: "", expected_uk_kirnosova: "хан",
    expected_uk_kirnosova_tsisar: "", expected_uk_nanu: ""
  };
  const result = run([record]);
  assert.equal(result.status, 0, result.stderr);
});

test("rejects held-out records that are not VERIFIED", () => {
  const record = { ...valid, partition: "held_out", review_status: "UNREVIEWED" };
  const result = run([record]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /held_out rows must be VERIFIED/u);
});

test("rejects duplicate case identifiers", () => {
  const result = run([valid, { ...valid, source_text: "重行" }]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /duplicate case_id TEST-001/u);
});


test("rejects a quote embedded in an unquoted CSV field", () => {
  const file = path.join(tempDir, "malformed-quote.csv");
  fs.writeFileSync(file, [headers.join(","), csvRow(valid).replace("银行", '银"行')].join("\n") + "\n");
  const result = spawnSync(process.execPath, [validator, file], { encoding: "utf8" });
  assert.equal(result.status, 1);
  assert.match(result.stderr, /Unexpected quote in unquoted field/u);
});

test("rejects an end-to-end gold row missing one required Ukrainian target", () => {
  const record = {
    ...valid, layer: "end_to_end", expected_ipa: "paŋ˧˥", ipa_convention: "broad IPA",
    expected_uk_kirnosova: "пан", expected_uk_kirnosova_tsisar: "пан", expected_uk_nanu: ""
  };
  const result = run([record]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /VERIFIED end_to_end row requires expected_uk_nanu/u);
});

test("rejects held-out gold rows with unresolved permission requirements", () => {
  const record = { ...valid, partition: "held_out", license_status: "PERMISSION_REQUIRED" };
  const result = run([record]);
  assert.equal(result.status, 1);
  assert.match(result.stderr, /held_out row cannot be used until required permission is documented/u);
});
