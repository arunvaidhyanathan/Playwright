import { Page, Locator } from '@playwright/test';

export class SearchResultsPage {
  readonly page: Page;
  readonly resultsContainer: Locator;
  readonly videoResults: Locator;

  constructor(page: Page) {
    this.page = page;
    this.resultsContainer = page.locator('ytd-search');
    this.videoResults = page.locator('ytd-video-renderer');
  }

  async clickFirstVideo(): Promise<void> {
    // Wait for search results to load
    await this.resultsContainer.waitFor({ state: 'visible' });
    
    // Get the first video result and click on its title
    const firstVideo = this.videoResults.first();
    const videoTitle = firstVideo.locator('h3 a#video-title');
    
    // Wait for the video title to be visible and clickable
    await videoTitle.waitFor({ state: 'visible' });
    await videoTitle.click();
    
    // Wait for navigation to complete after clicking
    await this.page.waitForLoadState('networkidle');
  }

  async getSearchResultsCount(): Promise<number> {
    await this.resultsContainer.waitFor();
    return await this.videoResults.count();
  }
}