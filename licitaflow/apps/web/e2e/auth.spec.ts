import { test, expect } from '@playwright/test'

test.describe('Auth pages', () => {
  test('login page renders', async ({ page }) => {
    await page.goto('/auth/login')
    await expect(page.getByRole('heading', { name: 'LicitaFlow' })).toBeVisible()
    await expect(page.getByPlaceholder('seu@email.com')).toBeVisible()
    await expect(page.getByText('Entrar com Google')).toBeVisible()
  })

  test('signup page renders', async ({ page }) => {
    await page.goto('/auth/signup')
    await expect(page.getByRole('heading', { name: 'Criar conta' })).toBeVisible()
    await expect(page.getByPlaceholder('00.000.000/0000-00')).toBeVisible()
  })

  test('login links to signup', async ({ page }) => {
    await page.goto('/auth/login')
    await page.getByText('Cadastre-se').click()
    await expect(page).toHaveURL(/\/auth\/signup/)
  })

  test('reset password page renders', async ({ page }) => {
    await page.goto('/auth/reset')
    await expect(page.getByRole('heading', { name: 'Recuperar senha' })).toBeVisible()
  })
})
