// Monday Morning Punchlines — entry generator.
// Writes one fixed joke to /output/entry.txt (or $MAKEFUN_OUTPUT_DIR).
// The joke: a reversal, not an escalation — the bed complains about ME,
// and HR sides with the bed. First-person voice, concrete numbers
// (6am, midnight), closes on a concrete object (the bed).
import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "Monday morning my bed filed a formal complaint: I leave at 6am and return exhausted at midnight. HR sided with the bed.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outFile = join(outDir, "entry.txt");

// Gate (RULES.txt): entry must be UTF-8 text of 1 to 200 characters,
// not only white space. Fail loudly instead of writing an invalid entry.
const len = [...ENTRY].length;
if (len < 1 || len > 200) {
  throw new Error(`entry length ${len} outside 1-200 characters`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is blank");
}

mkdirSync(outDir, { recursive: true });
writeFileSync(outFile, ENTRY, "utf8");
console.log(`wrote ${outFile} (${len} chars)`);
