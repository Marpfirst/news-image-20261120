// News-image entry (Node 22, standard library only).
//
// The image summing up Friday 20 November 2026's world news lives in this
// repository as entry.png; the program copies it to the output directory
// the grader reads. The grader runs with no network, so nothing is fetched
// or drawn at run time — the file is shipped whole and copied byte for byte.
//
// Run it locally with:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts

import { copyFileSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
const src = new URL('./entry.png', import.meta.url);
const dest = join(outDir, 'entry.png');

copyFileSync(src, dest);

// Sanity check the copy: it must be a whole PNG, within the 1 MiB cap.
const bytes = readFileSync(dest);
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!bytes.subarray(0, 8).equals(pngMagic)) {
  throw new Error('entry.png is not a PNG');
}
if (statSync(dest).size > 1048576) {
  throw new Error('entry.png exceeds the 1 MiB cap');
}
