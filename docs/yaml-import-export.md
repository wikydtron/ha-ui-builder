# Importing and exporting YAML safely

The builder converts Lovelace YAML into its own dashboard model and generates
new YAML from that model. Keep your original YAML as a separate backup and
review the generated result before applying it to Home Assistant.

## Save your current builder project first

Use **Save Project** to download a JSON project containing the dashboard and
reusable modules. **Export YAML** downloads the generated Lovelace dashboard;
it is a different format with different purposes.

Importing a dashboard replaces the current builder dashboard. The store then
autosaves the new state under the browser key `ha-dashboard-builder`; there is
no merge step in the import action. **Parse YAML** only prepares a preview.
The replacement occurs when you click **Import Dashboard**.

## Accepted input shapes

Open **Import YAML**, paste text or upload a `.yaml`/`.yml` file, then click
**Parse YAML**. The [parser](../src/yaml/parser.ts) recognizes:

| Top-level structure | Result |
| --- | --- |
| An object with a `views` array | Full dashboard. |
| An object with a `cards` array | One imported view. |
| An object with a string `type` | One card in an imported view. |
| An array of card objects | One imported view containing those cards. |

For a single container card such as `vertical-stack`, the object also has a
`cards` array. The parser checks for a view's `cards` array before a card's
`type`, so wrap that container in a full dashboard or view to preserve the
container itself.

For example, this input clearly identifies both the view and its container:

```yaml
title: Import Example
views:
  - title: Home
    cards:
      - type: vertical-stack
        cards:
          - type: entity
            entity: light.living_room
```

The example entity is a placeholder. Replace it with one from your own setup.
Review the reported view count, card count, and unknown types before importing.
Nested standard container cards contribute to the card count.

## Review changes made by conversion

The current conversion is not a byte-for-byte or fully lossless round trip:

- YAML comments, original formatting, and anchors are not retained by the
  parse-and-generate process.
- Dashboard output contains the title and views. Extra dashboard keys are not
  carried into the dashboard model.
- View fields such as title, icon, path, supported view type, and cards are
  modeled. Extra view keys such as badges, theme, and `sections` content are
  currently discarded by the parser.
- Imported cards default to a width of four columns; standard containers with
  parsed children default to full width. Consecutive cards with the same
  non-full width are grouped into `horizontal-stack` on export.
- Export removes object properties with internal names such as `id` and `_meta`,
  along with properties whose values are null/undefined, empty strings, empty
  objects, or empty arrays. This cleaning also reaches nested card configuration.
  Array entries are treated differently: null/undefined entries are removed,
  while empty strings, objects, and nested arrays may remain.
- Unknown card types use a raw configuration fallback in the parser. Inspect
  their exported properties individually: fallback parsing does not guarantee
  every unknown type is emitted unchanged by the generator.

A successful parse confirms the input can be converted; it does not establish
that all original metadata or visual behavior will survive. In particular,
review dashboards using sections or custom layout metadata carefully.

## Export and compare before applying

1. Use **Export YAML** to save the generated dashboard, or **Copy YAML** to copy it.
2. Compare the output with your original backup, including view metadata,
   custom card configuration, nested cards, and entity IDs.
3. Try the result in a separate Home Assistant dashboard before replacing a
   dashboard you rely on. Keep the original backup available for restoration.

The toolbar creates a file or clipboard text; these export actions do not write
the dashboard directly into Home Assistant.

For later editing with builder widths and modules, keep the **Save Project** JSON
as well as any YAML export. Import Project restores the builder project format.
Browser localStorage is working state, not a substitute for downloaded backups.

Implementation references: [import dialog](../src/components/panels/ImportModal.tsx),
[dashboard storage](../src/store/dashboardStore.ts),
[YAML generator](../src/yaml/generator.ts), and
[project and YAML toolbar actions](../src/components/layout/Toolbar.tsx).
