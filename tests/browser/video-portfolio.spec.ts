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

test('FTID and all four accounts have artwork and open in-site previews on a phone', async ({ page }) => {
  await page.route('https://www.tiktok.com/embed.js', route => route.fulfill({ contentType: 'application/javascript', body: `const host = document.querySelector('.tiktok-embed'); const frame = document.createElement('iframe'); frame.src = 'https://www.tiktok.com/embed/@jayszrss'; frame.title = 'TikTok creator preview'; host.append(frame);` }))
  for (const pattern of ['https://drive.google.com/file/d/*/preview', 'https://www.youtube-nocookie.com/embed/**', 'https://www.tiktok.com/embed/**', 'https://www.instagram.com/*/embed/']) {
    await page.route(pattern, route => route.fulfill({ contentType: 'text/html', body: '<html><body>Native portfolio preview fixture</body></html>' }))
  }
  await page.setViewportSize({ width: 390, height: 844 })
  await page.goto('/portofolio')
  await page.getByRole('button', { name: 'Lewati intro', exact: true }).click()
  const portfolio = page.locator('#video-portfolio')
  for (const [name, label, source] of [
    ['Company Profile FTID', 'Putar Company Profile FTID', 'https://drive.google.com/file/d/1Vtk5hSiIk9hXtsa2feURucZyPy4DLxri/preview'],
    ['Fulday', 'Jelajahi Fulday', 'https://www.youtube-nocookie.com/embed/videoseries?list=UU9mWFyZ012ttTrws7LLKuMg'],
    ['@jayszrss', 'Jelajahi @jayszrss', 'https://www.tiktok.com/embed/@jayszrss'],
    ['Cimuning PPKHMTI', 'Jelajahi Cimuning PPKHMTI', 'https://www.instagram.com/cimuningppkhmti/embed/'],
    ['Growthfin', 'Jelajahi Growthfin', 'https://www.instagram.com/growthfin.id/embed/'],
  ]) {
    const opener = portfolio.getByRole('button', { name: label, exact: true })
    await opener.scrollIntoViewIfNeeded()
    const image = opener.locator('img').first()
    await expect.poll(() => image.evaluate(img => (img as HTMLImageElement).naturalWidth)).toBeGreaterThan(0)
    await opener.click()
    const modal = portfolio.getByRole('dialog', { name, exact: true })
    await expect(modal).toBeVisible()
    expect(await modal.locator('iframe').getAttribute('src')).toContain(source)
    await expect(modal.getByRole('link', { name: 'Buka sumber asli' })).toBeVisible()
    const box = (await modal.boundingBox())!
    expect(box.x).toBeGreaterThanOrEqual(0)
    expect(box.width).toBeLessThanOrEqual(390)
    await modal.getByRole('button', { name: 'Tutup video', exact: true }).click()
    await expect(portfolio.locator('iframe')).toHaveCount(0)
    await expect(opener).toBeFocused()
    await expect(page.locator('body')).not.toHaveCSS('overflow', 'hidden')
  }
})
