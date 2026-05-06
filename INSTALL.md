# Belgien 2026 — App auf dem iPhone installieren

Die App ist eine **Progressive Web App (PWA)**. Sie läuft im Safari, kann aber wie eine native iOS-App auf den Home-Bildschirm gelegt werden, ohne Xcode oder Mac.

## Schnellster Weg: Lokal vom iPhone öffnen (Variante A)

Diese Variante reicht, wenn du die App nur als Lesezeichen mit Icon haben willst. Service Worker / Offline-Modus funktioniert hier **nicht** (iOS lässt SW nur über HTTPS zu).

1. Sende dir die Datei `index.html` (samt der Icon- und Manifest-Dateien) per **AirDrop**, **iCloud Drive** oder **E-Mail** aufs iPhone.
2. Öffne die Datei in **Safari**.
3. Tippe unten auf das **Teilen-Symbol** (Quadrat mit Pfeil nach oben).
4. Wähle **„Zum Home-Bildschirm"**.
5. Bestätige mit **Hinzufügen** — Symbol erscheint auf dem Home-Screen wie eine echte App.

## Empfohlen: Echte PWA mit Offline-Modus (Variante B)

So funktioniert die App auch ohne Internet (Service Worker aktiv) und sieht auf dem iPhone aus wie eine native App im Vollbild.

1. Lade alle Dateien auf einen einfachen, kostenlosen Hosting-Dienst:
   - **GitHub Pages** (gratis, HTTPS automatisch): Datei-Repo erstellen, Pages aktivieren, fertig.
   - **Netlify Drop** (https://app.netlify.com/drop): Ordner mit allen Dateien einfach reinziehen — bekommst sofort eine HTTPS-URL.
   - **Cloudflare Pages**: ähnlich wie Netlify.
2. Öffne die HTTPS-URL im **Safari** auf deinem iPhone.
3. Tippe **Teilen → „Zum Home-Bildschirm"**.
4. App öffnet ab jetzt im Vollbild und funktioniert auch offline.

## Dateien in diesem Ordner

| Datei | Zweck |
|-------|-------|
| `index.html` | Die komplette App (HTML + CSS + JS + Daten in einer Datei) |
| `manifest.webmanifest` | PWA-Manifest (Name, Farben, Icons) |
| `sw.js` | Service Worker für Offline-Modus |
| `icon-192.png` / `icon-512.png` | App-Icons für Android/PWA |
| `apple-touch-icon.png` | App-Icon für iPhone Home-Bildschirm |
| `Belgien.pdf` | Deine ursprüngliche Reise-Übersicht (Originaldaten) |

## Daten ändern

Alle Reisedaten stehen im Block `const TRIP = { … }` direkt in `index.html` (ca. Zeile 460). Dort kannst du:

- Datum, Distanzen, Etappen anpassen
- Stellplätze umstellen oder ergänzen
- Aktivitäten (Velotouren, Sehenswürdigkeiten) hinzufügen
- Neue Etappen einfügen

Nach dem Ändern einfach im Browser neu laden — fertig.

## Was die App kann

- **5 Tabs**: Übersicht, Etappen, Stellplätze, Aktivitäten, Infos
- **Live-Countdown** bis zur Abreise (oder Tag X von Y während der Reise)
- **Tages-Highlight**: Die heutige/aktuelle Etappe wird automatisch hervorgehoben
- **Apple-Maps-Integration**: Tap auf „In Karten" öffnet die Route direkt
- **Direktlinks** zu allen Camping-Websites
- **Übersichtskarte** mit allen Stops als SVG (funktioniert offline)
- **Notruf-Direktwahl**: Tap auf 112 / 100 / 101 startet sofort den Anruf
- **Dark-Mode**: Folgt automatisch der iPhone-Einstellung
- **Vollständig offline** (in Variante B): Alle Daten + UI im Cache
