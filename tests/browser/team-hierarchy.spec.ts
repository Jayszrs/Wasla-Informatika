import { expect, test } from '@playwright/test'

test('Ahmad leads Bayu with all five remaining members on the same level on home and about pages', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 })
  for (const path of ['/', '/tentang-kami']) {
    await page.goto(path)
    await page.getByRole('button', { name: 'Lewati intro', exact: true }).click()
    const chart = page.getByRole('list', { name: 'Struktur organisasi Wasla' })
    const leader = chart.locator(':scope > li')
    const deputy = chart.locator(':scope > li > div > ul > li')
    const members = chart.locator(':scope > li > div > ul > li > div > ul > li')
    await expect(leader).toHaveCount(1)
    await expect(leader.locator('.division-card-info strong').first()).toHaveText('Ahmad Suroso')
    await expect(deputy).toHaveCount(1)
    await expect(deputy.locator('.division-card-info strong').first()).toHaveText('Bayu Saputra')
    await expect(members).toHaveCount(5)
    await expect(members.locator('.division-card-info strong')).toHaveText(['Jaelani Surya Saputra', 'Al Hafiz Taufikur Rohman', 'Muhammad Lakchamana', 'Adelya Amanda', 'Difa Alfaruq'])
    const cards = await chart.locator('.division-flip-card').evaluateAll(elements => elements.map(element => element.getBoundingClientRect().toJSON()))
    expect(cards[0].top).toBeLessThan(cards[1].top)
    expect(cards[1].bottom).toBeLessThan(cards[2].top)
    for (const card of cards.slice(2)) expect(Math.abs(card.top - cards[2].top)).toBeLessThan(1)
    for (let index = 3; index < cards.length; index++) expect(cards[index].left).toBeGreaterThanOrEqual(cards[index - 1].right)
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  }
})

test('phone organisation keeps hierarchy and lets the member row scroll without widening the page', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/tentang-kami')
  await page.getByRole('button', { name: 'Lewati intro', exact: true }).click()
  const chart = page.getByRole('list', { name: 'Struktur organisasi Wasla' })
  const members = chart.locator(':scope > li > div > ul > li > div > ul > li')
  const difa = members.last().locator('.division-flip-card')
  await difa.getByRole('button', { name: /^Kenali Difa Alfaruq/ }).click()
  await expect(difa.getByRole('button', { name: 'Kembali ke profil Difa Alfaruq', exact: true })).toHaveAttribute('aria-expanded', 'true')
  await expect(difa.getByRole('link', { name: 'LinkedIn Difa Alfaruq', exact: true })).toHaveAttribute('href', 'https://www.linkedin.com/in/difa-alfaruq/')
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
  await page.locator('.division-structure').screenshot({ path: '.local/site-review/team-hierarchy-mobile-20261029.png' })
})

test('onboarding film fills the browser viewport on desktop and phone', async ({ page }) => {
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    await page.setViewportSize({ width, height })
    await page.goto('/')
    const film = page.locator('dialog video')
    await expect(film).toBeVisible()
    const bounds = (await film.boundingBox())!
    expect(bounds.x).toBe(0)
    expect(bounds.y).toBe(0)
    expect(bounds.width).toBe(width)
    expect(bounds.height).toBe(height)
    await expect(film).toHaveCSS('object-fit', 'cover')
    expect(await film.evaluate(v => (v as HTMLVideoElement).controls)).toBe(false)
    await page.getByRole('button', { name: 'Lewati intro', exact: true }).click()
  }
})
