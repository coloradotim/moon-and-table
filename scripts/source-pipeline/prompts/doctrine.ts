import { runtimeEnumSummary } from "../schemas";

export const sourcePipelineDoctrine = `
Moon & Table imports self-contained source-backed Ritual records.

A Ritual may exist when it has a beginning/container, middle/core action,
end/closing, intrinsic purpose, source-backed ritual logic, and enough
self-containment to perform from the app without opening the source.

Inventory is not eligibility. Do not omit adult, explicit, sex-forward,
consent-sensitive, kink-adjacent, body-fluid, technique-heavy, culturally
loaded, gender-loaded, devotional, spirit/deity-framed, protective, baneful,
coercive, revenge/hex, therapy-adjacent, medical-claim-adjacent, awkward, or
non-default-recommendation material merely because of category. Label it and
surface it for human decision.

Use repository-safe paraphrase. Do not reproduce long private or copyrighted
source text, full rituals, full prayers, full meditations, full recipes, or
distinctive passages. Exact operative source words may only be preserved when
short and structurally necessary; otherwise record the source location and
ritual function.

Metadata supports search, recommendation, and review. Metadata does not
assemble rituals.

Runtime enum summary:
${JSON.stringify(runtimeEnumSummary, null, 2)}
`;
