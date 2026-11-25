# Scraper test fixture provenance

All snapshots were captured on 2026-11-25 unless noted. Sensitive query
parameters and credentials are not stored here.

| Fixture | Real source | Notes |
| --- | --- | --- |
| `k3.xml` | https://web.archive.org/web/20240507103125id_/http://download.k3.de/OpenData/Open_Data_Veranstaltungen_von_k3_stadtfuehrungen_FMPXMLRESULT.xml | Archived 200 response (Wayback timestamp `20240507103125`). The live URL is now 404. Trimmed from the 66 MB original to the metadata, the April 2025 `PRODUCT`/`DATABASE` header, and four real rows: `45791` (English, filtered), `50211` (Hamburg, filtered), `50943` and `51370` (Münster/German). |
| `digitalhub_events.json` | https://www.digitalhub.ms/api/events?api_token=089d362b33ef053d7fcd241d823d27d1 | Public sample token from https://www.digitalhub.ms/api. Trimmed to the first four real events. |
| `stadt_suche.html` | https://web.archive.org/web/20170310102047id_/https://www.muenster.de/veranstaltungskalender/scripts/frontend/suche.php | Archived search form used to assert the form fields submitted by the spider. |
| `stadt_detail.html` | https://web.archive.org/web/20191211175035id_/https://www.muenster.de/veranstaltungskalender/scripts/frontend/mm2/top-veranstaltung.php?id=11150&guestID=101 | Archived detail page (`Frühjahrssend`). Date line changed from `14.3.2020 -- 22.3.2020` to `Samstag, 14.03.2020, 19.30 Uhr` so it matches the format the spider currently parses. All other markup is from the snapshot. |
| `stadt_detail_archived.html` | Same as above | Unmodified archived page, kept to document the real date format that the spider does not currently handle. |
| `stadt_results.html` | Reconstructed from the real detail link above | Minimal result-list markup using the spider's real selectors (`div.eintrag div.location a.intern`). Archived POST result pages were not preserved by Wayback, and the live endpoint now redirects to an SPA. |
| `studierendenwerk_ms.ics` | https://stw-muenster.de/events/?ical=1 | Live 200 response; redirects to https://www.stw-muenster.de/veranstaltungskalender/?ical=1. Full calendar kept. |
| `hafenkaeserei.ics` | https://hafenkaeserei.de/?ical=1 | Live 200 response. Full calendar kept. |
| `peng_impro.ics` | https://www.yesticket.org/ical/peng-impro.ics | Live 200 response. Full calendar kept. |
| `rare_guitar.ics` | https://bar.rareguitar.de/?ical=1&tribe_display=list | Live 200 response. Full calendar kept. |
| `datenportal_events.json` | Pending user-provided snapshot | `https://www.datenportal-muensterland.de/api/v1/events` returns 401 without Basic-auth credentials. The corresponding test is skipped until a real response is added. |

The original live URLs remain in the spider source code; these files are only
offline inputs for regression tests and should not be regenerated from synthetic
data without updating this file.
