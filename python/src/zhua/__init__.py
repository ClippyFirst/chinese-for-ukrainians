"""Offline Chinese-to-Ukrainian transcription, using IPA as the adapter boundary."""
from __future__ import annotations
import csv, re, unicodedata
from dataclasses import dataclass, asdict
from importlib.resources import files
from io import StringIO

SYSTEMS=("kirnosova","kirnosova_tsisar","nanu")
HEADERS=("№","Піньїнь","Кірносова","Кірносова—Цісар","НАНУ")
TONE_MARKS={"ā":("a",1),"á":("a",2),"ǎ":("a",3),"à":("a",4),"ē":("e",1),"é":("e",2),"ě":("e",3),"è":("e",4),"ī":("i",1),"í":("i",2),"ǐ":("i",3),"ì":("i",4),"ō":("o",1),"ó":("o",2),"ǒ":("o",3),"ò":("o",4),"ū":("u",1),"ú":("u",2),"ǔ":("u",3),"ù":("u",4),"ǖ":("ü",1),"ǘ":("ü",2),"ǚ":("ü",3),"ǜ":("ü",4)}
TONE_GLYPHS={"a":"āáǎà","e":"ēéěè","i":"īíǐì","o":"ōóǒò","u":"ūúǔù","ü":"ǖǘǚǜ"}
INITIALS=(("zh","ʈʂ"),("ch","ʈʂʰ"),("sh","ʂ"),("b","p"),("p","pʰ"),("m","m"),("f","f"),("d","t"),("t","tʰ"),("n","n"),("l","l"),("g","k"),("k","kʰ"),("h","x"),("j","tɕ"),("q","tɕʰ"),("x","ɕ"),("r","ɹ"),("z","ts"),("c","tsʰ"),("s","s"))
FINALS={"a":"a","o":"ɔ","e":"ɤ","ai":"aɪ","ei":"eɪ","ao":"ɑʊ","ou":"oʊ","an":"an","en":"ən","ang":"ɑŋ","eng":"əŋ","er":"əɹ","i":"i","ia":"ja","ie":"jɛ","iao":"jɑʊ","iu":"joʊ","ian":"jɛn","in":"in","iang":"jɑŋ","ing":"iŋ","iong":"jʊŋ","u":"u","ua":"wa","uo":"uɔ","uai":"waɪ","ui":"weɪ","uan":"wan","un":"wən","uang":"wɑŋ","ong":"ʊŋ","ü":"y","üe":"ɥɛ","üan":"ɥɛn","ün":"yn","ya":"ja","ye":"jɛ","yao":"jɑʊ","you":"joʊ","yan":"jɛn","yin":"in","yang":"jɑŋ","ying":"iŋ","yong":"jʊŋ","wa":"wa","wo":"uɔ","wai":"waɪ","wei":"weɪ","wan":"wan","wen":"wən","wang":"wɑŋ","weng":"wəŋ"}
SPECIAL={"m":"m̩","n":"n̩","ng":"ŋ̍","ê":"ɛ","yo":"jɔ"}
CONTOURS={1:"˥",2:"˧˥",3:"˨˩˦",4:"˥˩"}
@dataclass(frozen=True)
class Token:
    source:str; start:int; end:int; type:str; pinyin:str=""; ipa:str=""; ipa_base:str=""; tone:int=0; status:str="resolved"
@dataclass(frozen=True)
class Issue:
    type:str; status:str; source:str; system:str|None=None; key:str|None=None; source_row:int|None=None
@dataclass(frozen=True)
class ConversionResult:
    source:str; script:str; detected_script:str; pinyin:str; ipa:str; kirnosova:str; kirnosova_tsisar:str; nanu:str; tokens:tuple=(); issues:tuple=()
    @property
    def systems(self): return {s:getattr(self,s) for s in SYSTEMS}
    def as_dict(self): return asdict(self)

def normalize_pinyin(value):
    value=unicodedata.normalize("NFC",str(value)).strip().lower()
    m=re.search(r"([0-5])$",value); tone=int(m.group(1)) if m else 0; base=value[:-1] if m else value
    if not m:
        for c in base:
            if c in TONE_MARKS: base=base.replace(c,TONE_MARKS[c][0],1); tone=TONE_MARKS[c][1]; break
    return base.replace("u:","ü").replace("v","ü"),tone

def tone_marked(value):
    base,tone=normalize_pinyin(value)
    if tone not in range(1,5): return base
    if "a" in base: i=base.index("a")
    elif "e" in base: i=base.index("e")
    elif "ou" in base: i=base.index("o")
    else: i=max((j for j,c in enumerate(base) if c in "aeiouü"),default=-1)
    return base if i<0 else base[:i]+TONE_GLYPHS[base[i]][tone-1]+base[i+1:]

def pinyin_to_ipa(value,include_tone=False):
    base,tone=normalize_pinyin(value); s=base
    if s in SPECIAL: out=SPECIAL[s]
    elif s=="er": out=FINALS["er"]
    else:
        initial,ini="", ""
        for cand,ipa in INITIALS:
            if s.startswith(cand): initial,ini=cand,ipa; break
        final=s[len(initial):]
        if not initial and final=="yi": final="i"
        if not initial and final=="wu": final="u"
        if not initial and final.startswith("yu"): final="ü"+final[2:]
        if initial in ("j","q","x") and final.startswith("u"): final="ü"+final[1:]
        if initial=="r" and final=="i": out="ɻ̩"
        elif initial in ("zh","ch","sh") and final=="i": out=ini+"ɻ̩"
        elif initial in ("z","c","s") and final=="i": out=ini+"ɹ̩"
        else:
            final_ipa="uɔ" if initial in ("b","p","m","f") and final=="o" else FINALS.get(final,"")
            if not final_ipa: return ""
            out=ini+final_ipa
    return out+(CONTOURS.get(tone,"") if include_tone and out else "")

def _csv_text():
    return files("zhua").joinpath("data/zh-in-ua.csv").read_text(encoding="utf-8-sig")
def validate_packaged_data():
    """Return the packaged CSV size and digest for clean-wheel verification."""
    import hashlib
    raw=files("zhua").joinpath("data/zh-in-ua.csv").read_bytes()
    return {"valid": bool(raw), "bytes": len(raw), "sha256": hashlib.sha256(raw).hexdigest()}

def load_mappings():
    reader=csv.DictReader(StringIO(_csv_text()),delimiter=";")
    if tuple(reader.fieldnames or ())!=HEADERS: raise ValueError("Invalid canonical CSV header")
    maps={s:{} for s in SYSTEMS}; cols={"kirnosova":"Кірносова","kirnosova_tsisar":"Кірносова—Цісар","nanu":"НАНУ"}
    for row in reader:
        for alias in row["Піньїнь"].split("/"):
            base,_=normalize_pinyin(alias); key=pinyin_to_ipa(base)
            if not key: continue
            for system,col in cols.items():
                if key in maps[system]: raise ValueError(f"IPA key collision in {system}: {alias}")
                val=row[col]; maps[system][key]={"value":val,"missing":not val,"source_row":int(row["№"]),"source_key":row["Піньїнь"],"pinyin_key":base}
    return maps

def scan_text(text):
    out=[]; i=0
    def han(c):
        n=ord(c); return 0x3400<=n<=0x4dbf or 0x4e00<=n<=0x9fff or 0xf900<=n<=0xfaff or 0x20000<=n<=0x2fa1f
    while i<len(text):
        start=i; kind="han" if han(text[i]) else "text"; i+=1
        while i<len(text) and ("han" if han(text[i]) else "text")==kind: i+=1
        out.append((text[start:i],start,i,kind))
    return out

def _pronounce(text):
    from pypinyin import Style,pinyin
    values=pinyin(text,style=Style.TONE3,heteronym=False,errors=lambda chars:list(chars),neutral_tone_with_five=True,v_to_u=False)
    chars=list(text)
    if len(values)!=len(chars): return [(c,"",0,"unresolved") for c in chars]
    result=[]
    for c,v in zip(chars,values):
        raw=v[0] if v else ""; base,tone=normalize_pinyin(raw)
        result.append((c,(base+str(tone)) if base and base!=c and tone else base, tone, "resolved" if base and base!=c else "unresolved"))
    return result

def detect_script(text):
    """Classify distinctive Han variants using the same generated map as the web app.

    Shared-only Han text is intentionally undetermined; mixed text is reported as mixed.
    This is character-evidence classification, not locale inference.
    """
    import json
    raw=files("zhua").joinpath("data/traditional-to-simplified.json").read_text(encoding="utf-8")
    mapping=json.loads(raw)
    traditional=set(mapping)
    simplified_only={value for value in mapping.values() if value not in traditional}
    has_traditional=has_simplified=False
    ranges=((0x3400,0x4dbf),(0x4e00,0x9fff),(0xf900,0xfaff),(0x20000,0x2fa1f))
    for char in text:
        cp=ord(char)
        if not any(start <= cp <= end for start,end in ranges): continue
        if char in traditional: has_traditional=True
        elif char in simplified_only: has_simplified=True
    status="mixed" if has_traditional and has_simplified else "traditional" if has_traditional else "simplified" if has_simplified else "undetermined"
    return {"status":status,"has_simplified":has_simplified,"has_traditional":has_traditional}
def _ua_tone(value,tone):
    marks={1:"\u0304",2:"\u0301",3:"\u030c",4:"\u0300"}; chars=list(unicodedata.normalize("NFD",value))
    chars=[c for c in chars if c not in marks.values()]
    if tone in marks:
        i=next((i for i,c in enumerate(chars) if c.lower() in "аеєиіїоуюя"),-1)
        if i>=0: chars[i]+=marks[tone]
    return unicodedata.normalize("NFC","".join(chars))

def convert(text,*,script="auto",show_pinyin_tones=True,show_ukrainian_tones=True):
    if not isinstance(text,str): raise TypeError("text must be str")
    if script not in ("auto","simplified","traditional"): raise ValueError(f"Unknown script mode: {script}")
    maps=load_mappings(); toks=[]; issues=[]; pparts=[]; iparts=[]; outputs={s:[] for s in SYSTEMS}; prev=False
    for source,start,end,kind in scan_text(text):
        if kind=="text":
            toks.append(Token(source,start,end,"text")); pparts.append(source); iparts.append(source)
            for s in SYSTEMS: outputs[s].append(source)
            prev=False; continue
        for offset,(char,py,tone,status) in enumerate(_pronounce(source)):
            base=pinyin_to_ipa(py) if status=="resolved" else ""; ipa=pinyin_to_ipa(py,True) if status=="resolved" else ""
            toks.append(Token(char,start+offset,start+offset+len(char),"han",py,ipa,base,tone,status))
            if prev:
                pparts.append(" "); iparts.append(" ")
                for s in SYSTEMS: outputs[s].append(" ")
            pparts.append(tone_marked(py) if show_pinyin_tones else normalize_pinyin(py)[0])
            iparts.append(ipa if status=="resolved" else f"⟦IPA:{py or char}⟧")
            if status!="resolved": issues.append(Issue("pronunciation",status,char))
            for s in SYSTEMS:
                entry=maps[s].get(base) if base else None
                if status!="resolved": outputs[s].append(char); issues.append(Issue("mapping",status,char,s,base or None))
                elif entry is None: outputs[s].append(char); issues.append(Issue("mapping","unresolved",char,s,base))
                elif entry["missing"]: outputs[s].append(char); issues.append(Issue("mapping","missing",char,s,base,entry["source_row"]))
                else: outputs[s].append(_ua_tone(entry["value"],tone) if show_ukrainian_tones else entry["value"])
            prev=True
    detected=detect_script(text)["status"]
    return ConversionResult(text,script,detected,"".join(pparts),"".join(iparts),*("".join(outputs[s]) for s in SYSTEMS),tuple(toks),tuple(issues))

def transcribe(text,system,*,show_tones=True):
    if system not in SYSTEMS: raise ValueError(f"Unknown transcription system: {system}")
    return convert(text,show_ukrainian_tones=show_tones).systems[system]
def transcribe_all(text,*,show_tones=True):
    r=convert(text,show_ukrainian_tones=show_tones); return {"pinyin":r.pinyin,"ipa":r.ipa,**r.systems}
def main():
    import argparse,json,sys
    p=argparse.ArgumentParser(prog="chuktrans"); p.add_argument("text",nargs="?"); p.add_argument("--file"); p.add_argument("--system",choices=SYSTEMS); p.add_argument("--script",choices=("auto","simplified","traditional"),default="auto"); p.add_argument("--no-tones",action="store_true"); p.add_argument("--json",action="store_true")
    a=p.parse_args()
    try:
        if a.file and a.text is not None: p.error("Use either text or --file")
        text=open(a.file,encoding="utf-8").read() if a.file else a.text if a.text is not None else sys.stdin.read()
        r=convert(text,script=a.script,show_ukrainian_tones=not a.no_tones)
        if a.system: print(r.systems[a.system])
        elif a.json: print(__import__("json").dumps(r.as_dict(),ensure_ascii=False))
        else: print("\n".join((r.pinyin,r.ipa,r.kirnosova,r.kirnosova_tsisar,r.nanu)))
        return 0
    except (OSError,ValueError,TypeError) as e: print(f"chuktrans: {e}",file=sys.stderr); return 2
__version__="0.1.0"
__all__=["convert","transcribe","transcribe_all","ConversionResult","Token","Issue","pinyin_to_ipa","load_mappings","detect_script","main"]
