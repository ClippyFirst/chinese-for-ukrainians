"""Read-only PyPI name probe; a 404 is not a reservation or guarantee of claimability."""
from urllib.error import HTTPError, URLError
from urllib.request import Request, urlopen

for name in ("chinese-ukrainian-transcription", "chuktrans"):
    url = f"https://pypi.org/pypi/{name}/json"
    request = Request(url, headers={"User-Agent": "chinese-for-ukrainians-name-probe/1.0"})
    try:
        with urlopen(request, timeout=10) as response:
            print(f"{name}: REGISTERED (HTTP {response.status}); choose another distribution name.")
    except HTTPError as error:
        if error.code == 404:
            print(f"{name}: NO_PUBLIC_PROJECT_JSON (HTTP 404); this does not prove the name is claimable or reserved.")
        else:
            print(f"{name}: UNVERIFIED (HTTP {error.code}).")
    except URLError as error:
        print(f"{name}: UNVERIFIED ({error.reason}).")
