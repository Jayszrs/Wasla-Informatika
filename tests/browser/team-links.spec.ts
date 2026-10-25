import { test, expect } from '@playwright/test'

test('provided LinkedIn profiles remain independently clickable on both card faces', async ({ page }) => {
  for (const width of [1440, 390]) {
    await page.setViewportSize({ width, height: 900 })
    await page.goto('/')
    for (const [name, profile] of [
      ['Jaelani Surya Saputra', 'jayszrs'],
      ['Al Hafiz Taufikur Rohman', 'alhafiztaufikurrohman'],
      ['Muhammad Lakchamana', 'lakchamana'],
    ]) {
      const card = page.locator('.division-flip-card').filter({ has: page.locator('strong', { hasText: name }) })
      const checkLink = async () => {
        const link = card.getByRole('link', { name: `LinkedIn ${name}`, exact: true })
        await expect(link).toBeVisible()
        await expect(link).toHaveAttribute('href', `https://www.linkedin.com/in/${profile}/`)
        await expect(link).toHaveAttribute('target', '_blank')
        await link.scrollIntoViewIfNeeded()
        expect(await link.evaluate(el => { const r = el.getBoundingClientRect(); return document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)?.closest('a') === el })).toBe(true)
        await link.evaluate(el => el.addEventListener('click', event => event.preventDefault(), { once: true }))
        await link.click()
      }
      await checkLink()
      await expect(card).not.toHaveClass(/is-flipped/)
      const toggle = card.locator('.division-card-toggle')
      await toggle.click({ position: { x: 20, y: 20 } })
      await expect(card).toHaveClass(/is-flipped/)
      await checkLink()
      await expect(card).toHaveClass(/is-flipped/)
      await toggle.click({ position: { x: 20, y: 20 } })
      await expect(card).not.toHaveClass(/is-flipped/)
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false)
  }
})
