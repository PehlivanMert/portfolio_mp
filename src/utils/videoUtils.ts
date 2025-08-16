// Video Utilities for Safari Compatibility
import './videoUtils.css';

export interface VideoConfig {
  src: string;
  type: string;
  codecs?: string;
}

export const VIDEO_SOURCES: VideoConfig[] = [
  {
    src: '/PortfolyoVideo.webm',
    type: 'video/webm',
    codecs: 'vp9,opus'
  },
  {
    src: '/PortfolyoVideo.mp4',
    type: 'video/mp4',
    codecs: 'avc1.42E01E, mp4a.40.2'
  },
  {
    src: '/PortfolyoVideo.mp4',
    type: 'video/mp4'
  }
];

// Check if browser supports specific video format
export const supportsVideoFormat = (format: string): boolean => {
  const video = document.createElement('video');
  return video.canPlayType(format) !== '';
};

// Get the best supported video source for current browser
export const getBestVideoSource = (): VideoConfig => {
  // Check WebM support first (modern browsers)
  if (supportsVideoFormat('video/webm; codecs=vp9,opus')) {
    return VIDEO_SOURCES[0];
  }
  
  // Check MP4 with specific codecs
  if (supportsVideoFormat('video/mp4; codecs=avc1.42E01E, mp4a.40.2')) {
    return VIDEO_SOURCES[1];
  }
  
  // Fallback to generic MP4
  return VIDEO_SOURCES[2];
};

// Safari-specific video fixes
export const applySafariVideoFixes = (videoElement: HTMLVideoElement): void => {
  // Safari-specific attributes
  videoElement.setAttribute('webkit-playsinline', 'true');
  videoElement.setAttribute('playsinline', 'true');
  videoElement.setAttribute('muted', 'true');
  videoElement.setAttribute('autoplay', 'true');
  
  // Add Safari-specific CSS class
  videoElement.classList.add('safari-video-fixes');
  
  // Force video to load in Safari
  if (videoElement.readyState === 0) {
    videoElement.load();
  }
};

// Detect Safari browser
export const isSafari = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return userAgent.includes('safari') && !userAgent.includes('chrome');
};

// Detect iOS Safari
export const isIOSSafari = (): boolean => {
  const userAgent = navigator.userAgent.toLowerCase();
  return /iphone|ipad|ipod/.test(userAgent) && userAgent.includes('safari') && !userAgent.includes('chrome');
};

// Safari-specific video loading strategy
export const loadVideoForSafari = (videoElement: HTMLVideoElement): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!isSafari() && !isIOSSafari()) {
      resolve();
      return;
    }

    const handleCanPlay = () => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      resolve();
    };

    const handleError = (e: Event) => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      reject(e);
    };

    videoElement.addEventListener('canplay', handleCanPlay);
    videoElement.addEventListener('error', handleError);

    // Force load in Safari
    videoElement.load();
    
    // Timeout after 10 seconds
    setTimeout(() => {
      videoElement.removeEventListener('canplay', handleCanPlay);
      videoElement.removeEventListener('error', handleError);
      reject(new Error('Video loading timeout'));
    }, 10000);
  });
};

// Create video element with Safari compatibility
export const createSafariCompatibleVideo = (): HTMLVideoElement => {
  const video = document.createElement('video');
  
  // Set basic attributes
  video.muted = true;
  video.playsInline = true;
  video.autoplay = true;
  video.loop = true;
  video.preload = 'metadata';
  video.crossOrigin = 'anonymous';
  
  // Apply Safari fixes
  applySafariVideoFixes(video);
  
  return video;
};

// Video error handling
export const handleVideoError = (error: Event, videoElement: HTMLVideoElement): void => {
  console.error('Video error:', error);
  
  // Try to reload video
  if (videoElement.src) {
    videoElement.load();
  }
  
  // Log browser info for debugging
  console.log('Browser:', navigator.userAgent);
  console.log('Is Safari:', isSafari());
  console.log('Is iOS Safari:', isIOSSafari());
};
