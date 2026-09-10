import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const WCAG = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test('home page has no a11y issues', async ({ page }) => {
	const { violations } = await new AxeBuilder({ page }).withTags(WCAG).analyze();
	expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
