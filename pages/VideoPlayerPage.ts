import { Page, Locator } from '@playwright/test';

export class VideoPlayerPage {
  readonly page: Page;
  readonly videoPlayer: Locator;
  readonly playButton: Locator;
  readonly pauseButton: Locator;
  readonly videoTitle: Locator;
  readonly progressBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.videoPlayer = page.locator('video.html5-main-video');
    this.playButton = page.locator('button.ytp-play-button[aria-label*="Play"]');
    this.pauseButton = page.locator('button.ytp-play-button[aria-label*="Pause"]');
    this.videoTitle = page.locator('h1.ytd-video-primary-info-renderer');
    this.progressBar = page.locator('.ytp-progress-bar');
  }

  async waitForVideoToLoad(): Promise<void> {
    await this.videoPlayer.waitFor({ state: 'visible' });
  }

  async play(): Promise<void> {
    // Only click play if video is not already playing
    if (await this.playButton.isVisible()) {
      await this.playButton.click();
    }
  }

  async pause(): Promise<void> {
    // Only click pause if video is playing
    if (await this.pauseButton.isVisible()) {
      await this.pauseButton.click();
    }
  }

  async getVideoTitle(): Promise<string> {
    await this.videoTitle.waitFor({ state: 'visible' });
    return await this.videoTitle.textContent() || '';
  }

  async isVideoPlaying(): Promise<boolean> {
    // Check if the video element is playing by examining its paused property
    return await this.page.evaluate(() => {
      const video = document.querySelector('video.html5-main-video') as HTMLVideoElement;
      return video ? !video.paused : false;
    });
  }
}