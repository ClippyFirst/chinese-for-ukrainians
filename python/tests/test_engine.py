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
    for c in cases: assert zhua.convert(c["text"]).pinyin==c["pinyin"],c["text"]

def test_package_data_matches_canonical_source_byte_for_byte():
    from importlib.resources import files
    root_csv=pathlib.Path(__file__).resolve().parents[2]/"zh-in-ua.csv"
    packaged=files("zhua").joinpath("data/zh-in-ua.csv").read_bytes()
    assert packaged==root_csv.read_bytes()
    assert zhua.validate_packaged_data()["valid"] is True

def test_blank_cells_remain_missing_in_their_own_system():
    maps=zhua.load_mappings()
    # The canonical ê row deliberately leaves the NANU value blank.
    assert maps["nanu"]["ɛ"]["missing"] is True
    assert maps["kirnosova"]["ɛ"]["missing"] is False
