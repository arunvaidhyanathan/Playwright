import { Page, Locator } from '@playwright/test';

export class LoginPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly nextButton: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.locator('input[type="email"]');
    this.nextButton = page.locator('#identifierNext button');
    this.passwordInput = page.locator('input[type="password"]');
    this.submitButton = page.locator('#passwordNext button');
  }

  async login(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.nextButton.click();
    
    // Wait for password field to be visible and interactable
    await this.passwordInput.waitFor({ state: 'visible' });
    await this.passwordInput.fill(password);
    await this.submitButton.click();
    
    // Wait for navigation after login
    await this.page.waitForLoadState('networkidle');
  }
}