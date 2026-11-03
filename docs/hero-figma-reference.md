# Hero composition reference

Read-only measurements captured from the supplied Figma prototype before implementation changes. The Figma file remains unmodified.

## Desktop source frames

- `landing corazon`: 1440 × 1498 px.
- `pajaro`: 1441 × 867 px, positioned after the heart frame; content is not clipped.

## Elements

- Heart image: 1126.69 × 1624.29 px at x=156.65, y=-85.30 within the heart frame. It intentionally extends beyond the frame.
- `MONSTRUO`: text box 1616.2 × 452.54 px; E1 at 300/450.
- `TALLER`: two text boxes, each 1201.73 × 452.54 px; E1 at 300/450. One is rotated 180 degrees.
- Bird component: 1143 × 1001 px at x=358.5, y=0 in the lower frame.
- Eye component: 300.05 × 182 px at x=124.5, y=343; variants cycle after a 300 ms delay with an instant swap.
- “Lo llamamos monstruo / Porque es imaginario…”: 967 × 195 px; E2 at 80/120.
- “Y nadie sabe cómo es”: 585 × 120 px at x=66.5, y=703; Barrio at 60 px with 120 px line-height.

These are source-frame measurements. Implementation should preserve their proportions and clipping relationship while adapting to narrower viewports. “Cositas nuevas” is outside the scope of this hero reference.
