# NOURA MVP

Erste klickbare Version von **NOURA – Dein Ernährungs- & Alltagsassistent**.

## Was bereits funktioniert
- Mobile Home-Ansicht
- Mahlzeiten abhaken
- Kalorien-/Protein-Fortschritt reagiert darauf
- Wochenplan
- Essen manuell hinzufügen
- Einkaufsliste abhaken und durchsuchen
- Budget verändern
- Zyklus-Personalisierung an/aus
- Responsive Mobile UI

## Was aktuell Demo/Mock ist
- Schritte und Schlaf
- Supermarktpreise/Angebote
- Apple Health / HealthKit / Health Connect
- Zyklusprognosen
- KI-Rezepte, Foto-/Barcode-Erkennung
- Login, Cloud-Speicherung, Backend

## Starten
Einfach `index.html` öffnen oder lokal:

```bash
python3 -m http.server 8000
```

Dann `http://localhost:8000` öffnen.

## GitHub Pages
Das Projekt funktioniert ohne Build-Schritt. Repo hochladen und unter **Settings → Pages** den `main`-Branch als Quelle wählen.

## Dateien
- `index.html` – App-Shell
- `styles.css` – komplettes Mobile Design
- `app.js` – Zustand, Navigation und Interaktionen
- `public/noura-concept.png` – ursprünglicher visueller Konzeptentwurf

## Nächste technische Ausbaustufe
1. Backend/Auth (z. B. Supabase/Firebase)
2. echte Nutzerprofile und gespeicherte Ziele
3. native HealthKit-/Health-Connect-Integration
4. Lebensmitteldatenbank + Barcode
5. Rezept-/KI-Engine
6. Supermarkt-/Angebotsdaten via API/Partnerschaften
7. Datenschutz-/Consent-System und DSGVO-Review
8. Native App-Verpackung für App Store/Play Store
