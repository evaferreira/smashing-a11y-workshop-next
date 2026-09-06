import { test, expect, type Page, type TestInfo } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const WCAG_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

async function scan(page: Page, testInfo: TestInfo) {
  const { violations } = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  await testInfo.attach('axe-violations.json', {
    body: JSON.stringify(violations, null, 2),
    contentType: 'application/json',
  });

  // Assert on a readable summary; full node detail lives in the attachment.
  return violations.map(
    (v) => `${v.id} (${v.impact ?? 'unknown'}): ${v.help} — ${v.nodes.length} node(s)`,
  );
}

test.describe('home page', () => {
  // Tailwind `dark:` variants mean contrast differs per scheme, so check both.
  for (const colorScheme of ['light', 'dark'] as const) {
    test(`has no WCAG A/AA violations in ${colorScheme} mode`, async ({ page }, testInfo) => {
      await page.emulateMedia({ colorScheme });
      await page.goto('/');

      expect(await scan(page, testInfo)).toEqual([]);
    });
  }
});
