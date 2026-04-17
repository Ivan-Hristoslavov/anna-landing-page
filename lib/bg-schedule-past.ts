const BG_MONTH_INDEX: Record<string, number> = {
  януари: 0,
  февруари: 1,
  март: 2,
  април: 3,
  май: 4,
  юни: 5,
  юли: 6,
  август: 7,
  септември: 8,
  октомври: 9,
  ноември: 10,
  декември: 11,
};

function findFirstBulgarianMonth(text: string): {
  name: string;
  monthIndex: number;
  position: number;
} | null {
  let best: { name: string; monthIndex: number; position: number } | null =
    null;
  for (const [name, monthIndex] of Object.entries(BG_MONTH_INDEX)) {
    const position = text.indexOf(name);
    if (position === -1) continue;
    if (!best || position < best.position) {
      best = { name, monthIndex, position };
    }
  }
  return best;
}

/**
 * Връща края на последния ден от обучението (23:59:59.999, локално време),
 * извлечен от типични етикети с български месеци (вкл. съставни низове от формата).
 */
export function parseBulgarianScheduleEndDate(text: string): Date | null {
  const normalized = text.replace(/[–—−‐‑]/g, "-");
  const first = findFirstBulgarianMonth(normalized);
  if (!first) return null;

  const beforeMonth = normalized.slice(0, first.position).trim();
  const afterMonth = normalized.slice(first.position + first.name.length);
  const yearMatch = afterMonth.match(/(\d{4})/);
  if (!yearMatch) return null;
  const year = parseInt(yearMatch[1], 10);

  const dayMatches = beforeMonth.match(/\d+/g);
  if (!dayMatches?.length) return null;
  const days = dayMatches.map((d) => parseInt(d, 10));
  const lastDay = Math.max(...days);

  return new Date(year, first.monthIndex, lastDay, 23, 59, 59, 999);
}

/**
 * Дали последният ден на обучението е преди дадения календарен ден.
 * При `referenceDate == null` връща `false` (удобно за SSR до клиентски mount).
 */
export function isPastBulgarianScheduleLabel(
  text: string,
  referenceDate?: Date | null
): boolean {
  if (referenceDate == null) return false;
  const end = parseBulgarianScheduleEndDate(text);
  if (!end) return false;
  const startOfToday = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );
  return end.getTime() < startOfToday.getTime();
}
