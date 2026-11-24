// 3 AM Hotfix: The Funniest Commit Message
// u-yuki-kato-3-am-hotfix-the-funniest-commit-message-e9f60106
//
// One git commit message (74 characters, one line) from a developer who has
// just fixed production at 3 AM: the pager is finally quiet, production is
// back — and the only lesson learned is that nothing was learned.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const LINE =
  "hotfix: production is back, the pager is quiet, and I have learned nothing";

// The sealed scorer only accepts 1–179 UTF-8 characters, non-blank, one line.
if (
  [...LINE].length < 1 ||
  [...LINE].length > 179 ||
  LINE.trim() === "" ||
  LINE.includes("\n")
) {
  throw new Error("entry line violates the 1–179 character single-line rule");
}

const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(out.slice(0, out.lastIndexOf("/")) || ".", { recursive: true });
writeFileSync(out, LINE, "utf8");

// Verify the write landed byte-exact: the scorer reads this file verbatim,
// so a partial or altered write must fail loudly instead of passing silently.
if (readFileSync(out, "utf8") !== LINE) {
  throw new Error("entry file does not match the commit line byte-for-byte");
}
console.log(LINE);
