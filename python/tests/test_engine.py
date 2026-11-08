import json, pathlib, subprocess, sys
import pytest
import zhua

def test_api_and_empty():
    r=zhua.convert("")
    assert r.pinyin==r.ipa==r.kirnosova==r.kirnosova_tsisar==r.nanu==""
    assert set(r.systems)=={"kirnosova","kirnosova_tsisar","nanu"}
    with pytest.raises(ValueError): zhua.convert("你好",script="bad")
    with pytest.raises(ValueError): zhua.transcribe("你好","bad")

def test_scanner_preserves_mixed_unicode():
    text="Hi，中文🙂\n𠀀"
    assert "".join(x[0] for x in zhua.scan_text(text))==text
    assert zhua.scan_text(text)[-1][3]=="han"

def test_ipa_adapter_contract():
    assert zhua.pinyin_to_ipa("zhi4")=="ʈʂɻ̩"
    assert zhua.pinyin_to_ipa("ê")=="ɛ" and zhua.pinyin_to_ipa("yo")=="jɔ"
    assert zhua.pinyin_to_ipa("hm")==zhua.pinyin_to_ipa("hng")==""

def test_tone_and_mapping_provenance():
    r=zhua.convert("你好")
    assert len(r.tokens)==2 and r.tokens[0].start==0
    assert all(t.ipa_base for t in r.tokens)
    assert zhua.transcribe("你好","kirnosova")==r.kirnosova

def test_traditional_and_cli():
    assert len(zhua.convert("中國").tokens)==2
    p=subprocess.run([sys.executable,"-m","zhua","--json","你好"],text=True,capture_output=True)
    assert p.returncode==0 and json.loads(p.stdout)["pinyin"]=="nǐ hǎo"

def test_shared_cross_runtime_golden():
    cases=json.loads((pathlib.Path(__file__).parent/"fixtures/cross_runtime_golden.json").read_text())
    for c in cases:
        r=zhua.convert(c["text"])
        assert r.pinyin==c["pinyin"],c["text"]
        assert r.ipa==c["ipa"],c["text"]

def test_package_data_matches_canonical_source_byte_for_byte():
    from importlib.resources import files
    packaged=files("zhua").joinpath("data/zh-in-ua.csv").read_bytes()
    root_csv=pathlib.Path(__file__).resolve().parents[2]/"zh-in-ua.csv"
    if root_csv.exists():
        assert packaged==root_csv.read_bytes()
    assert zhua.validate_packaged_data()["valid"] is True

def test_blank_cells_remain_missing_in_their_own_system():
    maps=zhua.load_mappings()
    # The canonical ê row deliberately leaves the NANU value blank.
    assert maps["nanu"]["ɛ"]["missing"] is True
    assert maps["kirnosova"]["ɛ"]["missing"] is False

def test_cli_stdin_file_and_error_channels(tmp_path):
    piped=subprocess.run([sys.executable,"-m","zhua","--json"],input="你好",text=True,capture_output=True)
    assert piped.returncode==0 and json.loads(piped.stdout)["source"]=="你好"
    source=tmp_path/"input.txt"
    source.write_text("中国",encoding="utf-8")
    from_file=subprocess.run([sys.executable,"-m","zhua","--file",str(source),"--system","kirnosova"],text=True,capture_output=True)
    assert from_file.returncode==0 and from_file.stdout.strip()
    bad=subprocess.run([sys.executable,"-m","zhua","--script","invalid","你好"],text=True,capture_output=True)
    assert bad.returncode==2 and bad.stderr and not bad.stdout

def test_tone_options_are_independent():
    marked=zhua.convert("你好")
    plain_pinyin=zhua.convert("你好",show_pinyin_tones=False)
    plain_ukrainian=zhua.convert("你好",show_ukrainian_tones=False)
    assert plain_pinyin.pinyin=="ni hao"
    assert marked.pinyin=="nǐ hǎo"
    assert plain_ukrainian.kirnosova!=marked.kirnosova


def test_shared_script_detection_fixture_matches_browser_classifier():
    fixture=json.loads((pathlib.Path(__file__).parent/"fixtures/script_detection.json").read_text())
    for case in fixture:
        result=zhua.detect_script(case["text"])
        assert result["status"]==case["status"],case["text"]
        converted=zhua.convert(case["text"])
        assert converted.detected_script==case["status"]


def test_auto_script_detection_reports_traditional_simplified_mixed_and_shared():
    assert zhua.detect_script("中國")["status"]=="traditional"
    assert zhua.detect_script("中国")["status"]=="simplified"
    assert zhua.detect_script("中国與國")["status"]=="mixed"
    assert zhua.detect_script("中文")["status"]=="undetermined"


def test_packaged_script_map_is_present_and_parseable():
    from importlib.resources import files
    mapping=json.loads(files("zhua").joinpath("data/traditional-to-simplified.json").read_text(encoding="utf-8"))
    assert mapping["國"]=="国"
    assert mapping["與"]=="与"
    assert len(mapping)>1000


def test_phrase_overrides_are_source_backed_and_fix_traditional_bank_reading():
    records=json.loads((pathlib.Path(__file__).resolve().parents[1]/"src/zhua/data/pronunciation-overrides.json").read_text())
    assert records[0]["phrase"]=="銀行"
    assert records[0]["pinyin"]==[["yín"],["háng"]]
    assert records[0]["source_url"].startswith("https://zdic.net/")
    assert zhua.convert("銀行").pinyin=="yín háng"
