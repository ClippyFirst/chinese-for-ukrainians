import importlib.util
import tempfile
import unittest
from pathlib import Path

MODULE_PATH = Path(__file__).with_name("measure_formants.py")
SPEC = importlib.util.spec_from_file_location("measure_formants", MODULE_PATH)
MODULE = importlib.util.module_from_spec(SPEC)
assert SPEC and SPEC.loader
SPEC.loader.exec_module(MODULE)


def token(token_id="t001", **overrides):
    row = {
        "token_id": token_id,
        "recording_path": "audio/example.wav",
        "speaker_id": "speaker01",
        "pinyin": "dong1",
        "tone": "1",
        "initial": "d",
        "final": "ong",
        "nucleus_start_s": "0.10",
        "nucleus_end_s": "0.24",
        "manual_boundary_status": "verified",
        "quality_status": "pass",
        "max_formant_hz": "5500",
    }
    row.update(overrides)
    return row


class TokenIndexValidationTests(unittest.TestCase):
    def test_accepts_a_manually_verified_token(self):
        MODULE.validate_rows([token()])

    def test_rejects_unverified_boundaries(self):
        with self.assertRaisesRegex(ValueError, "manually verified"):
            MODULE.validate_rows([token(manual_boundary_status="automatic")])

    def test_rejects_failed_quality_without_silent_exclusion(self):
        with self.assertRaisesRegex(ValueError, "quality_status must be pass"):
            MODULE.validate_rows([token(quality_status="fail")])

    def test_rejects_duplicate_token_ids(self):
        with self.assertRaisesRegex(ValueError, "duplicate token_id"):
            MODULE.validate_rows([token(), token()])

    def test_rejects_invalid_or_reversed_boundaries(self):
        with self.assertRaisesRegex(ValueError, "invalid nucleus interval"):
            MODULE.validate_rows([token(nucleus_start_s="0.25", nucleus_end_s="0.20")])

    def test_rejects_missing_required_metadata(self):
        row = token()
        row["speaker_id"] = ""
        with self.assertRaisesRegex(ValueError, "speaker_id and recording_path"):
            MODULE.validate_rows([row])

    def test_prevents_recording_path_escape(self):
        with tempfile.TemporaryDirectory() as temporary:
            root = Path(temporary) / "corpus"
            root.mkdir()
            outside = Path(temporary) / "outside.wav"
            outside.write_bytes(b"not audio")
            with self.assertRaisesRegex(ValueError, "escapes corpus root"):
                MODULE.safe_audio_path(root, "../outside.wav")


if __name__ == "__main__":
    unittest.main()
