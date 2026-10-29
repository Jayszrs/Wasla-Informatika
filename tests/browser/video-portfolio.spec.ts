import { expect, test } from '@playwright/test'

test('all nine supplied destinations are available and film embeds open only on request', async ({ page }) => {
  await page.route('https://www.youtube-nocookie.com/embed/**', route => route.fulfill({ contentType: 'text/html', body: '<html><body>Portfolio playback test</body></html>' }))
  await page.goto('/portofolio')
  await page.getByRole('button', { name: 'Lewati intro', exact: true }).click()
  const portfolio = page.locator('#video-portfolio')
  await expect(portfolio.locator('iframe')).toHaveCount(0)
  const destinations = [
    'https://www.youtube.com/watch?v=XV0e0PkjDPc',
    'https://www.youtube.com/watch?v=K0dGYfzaAX0',
    'https://www.youtube.com/watch?v=mnIo2zrQwRk',
    'https://www.youtube.com/watch?v=hOLDG50DHCI',
    'https://www.youtube.com/@fuldayy',
    'https://www.tiktok.com/@jayszrss',
    'https://drive.google.com/file/d/1Vtk5hSiIk9hXtsa2feURucZyPy4DLxri/view',
    'https://www.instagram.com/cimuningppkhmti/',
    'https://www.instagram.com/growthfin.id/',
  ]
  expect(await portfolio.locator('a[target="_blank"]').evaluateAll(links => [...new Set(links.map(link => (link as HTMLAnchorElement).href))].sort())).toEqual(destinations.sort())
  await expect(portfolio.getByRole('link', { name: 'Tonton SEPTIHAN di YouTube', exact: true })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=K0dGYfzaAX0')
  await expect(portfolio.getByRole('link', { name: 'Tonton Seventeen di YouTube', exact: true })).toHaveAttribute('href', 'https://www.youtube.com/watch?v=mnIo2zrQwRk')
  for (const [title, id] of [
    ['A Day at World Stamp Championship', 'XV0e0PkjDPc'],
    ['Sejarah Singkat Universitas Bani Saleh', 'hOLDG50DHCI'],
  ]) {
    const opener = portfolio.getByRole('button', { name: `Putar ${title}`, exact: true })
    await opener.click()
    const modal = portfolio.getByRole('dialog', { name: title, exact: true })
    await expect(modal).toBeVisible()
    await expect(modal.locator('iframe')).toHaveAttribute('src', `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`)
    await page.keyboard.press('Escape')
    await expect(portfolio.locator('iframe')).toHaveCount(0)
    await expect(opener).toBeFocused()
  }
  await expect(portfolio).toContainText('Pernah berkontribusi dalam editing video untuk kanal Fulday.')
})

test('portfolio stays readable on small phones, tablets and desktop in both locales', async ({ page }) => {
  for (const [width, height, path, heading] of [
    [320, 700, '/portofolio', 'Video & karya kreatif.'],
    [820, 1180, '/portofolio', 'Video & karya kreatif.'],
    [1440, 900, '/en/portofolio', 'Video & creative work.'],
  ] as const) {
    await page.setViewportSize({ width, height })
    await page.goto(path)
    await page.getByRole('button', { name: path.startsWith('/en') ? 'Skip intro' : 'Lewati intro', exact: true }).click()
    const portfolio = page.locator('#video-portfolio')
    await expect(portfolio.getByRole('heading', { name: heading, exact: true })).toBeVisible()
    await portfolio.scrollIntoViewIfNeeded()
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth + 1)).toBe(true)
    for (const image of await portfolio.locator('img').all()) {
      await image.scrollIntoViewIfNeeded()
      await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    }
    await portfolio.screenshot({ path: `.local/site-review/video-portfolio-${width}-20261029.png` })
  }
})
