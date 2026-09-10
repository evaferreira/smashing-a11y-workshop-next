import { test, expect } from '@playwright/test';
import { AxeBuilder } from '@axe-core/playwright';

const WCAG = ['EN-301-549'];

test('home page has no a11y issues', async ({ page }) => {
  await page.goto('/');

  const { violations } = await new AxeBuilder({ page }).withTags(WCAG).analyze();

  expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});

test('home page has no a11y issues in dark mode', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/');

  const { violations } = await new AxeBuilder({ page }).withTags(WCAG).analyze();

  expect(violations.map((v) => `${v.id}: ${v.help}`)).toEqual([]);
});
