import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { VideoPlayerPage } from '../pages/VideoPlayerPage';

test('YouTube login, search and play video', async ({ page }) => {
  // Initialize page objects
  const loginPage = new LoginPage(page);
  const homePage = new HomePage(page);
  const searchResultsPage = new SearchResultsPage(page);
  const videoPlayerPage = new VideoPlayerPage(page);
  
  // Navigate to YouTube
  await page.goto('/');
  
  // Accept cookies if prompted
  await homePage.acceptCookiesIfPresent();
  
  // Login to YouTube
  await homePage.clickSignIn();
  await loginPage.login(process.env.YOUTUBE_EMAIL || 'your_email@example.com', 
                        process.env.YOUTUBE_PASSWORD || 'your_password');
  
  // Verify login was successful
  await expect(homePage.userAvatar).toBeVisible();
  
  // Search for Playwright tutorials
  await homePage.search('playwright tutorials');
  
  // Verify search results page loaded
  await expect(searchResultsPage.resultsContainer).toBeVisible();
  
  // Click on the first video
  await searchResultsPage.clickFirstVideo();
  
  // Verify video is playing
  await expect(videoPlayerPage.videoPlayer).toBeVisible();
});