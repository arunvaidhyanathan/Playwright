import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly searchInput: Locator;
  readonly searchButton: Locator;
  readonly signInButton: Locator;
  readonly userAvatar: Locator;
  readonly cookiesAcceptButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('input#search');
    this.searchButton = page.locator('button#search-icon-legacy');
    this.signInButton = page.locator('a[aria-label="Sign in"]');
    this.userAvatar = page.locator('img.ytd-topbar-menu-button-renderer');
    this.cookiesAcceptButton = page.locator('button[aria-label="Accept all"], button[aria-label="Accept the use of cookies and other data for the purposes described"]');
  }

  async search(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
  }

  async clickSignIn(): Promise<void> {
    await this.signInButton.click();
  }

  async acceptCookiesIfPresent(): Promise<void> {
    if (await this.cookiesAcceptButton.isVisible({ timeout: 5000 }).catch(() => false)) {
      await this.cookiesAcceptButton.click();
    }
  }
}