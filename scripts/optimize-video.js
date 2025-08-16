#!/usr/bin/env node

/**
 * Video Optimization Script for Safari Compatibility
 * 
 * This script optimizes the video file for better Safari compatibility.
 * It converts the video to H.264 codec with AAC audio which Safari supports well.
 * 
 * Requirements:
 * - FFmpeg must be installed on your system
 * - Run: npm install -g ffmpeg-static (or install FFmpeg manually)
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const inputVideo = 'public/PortfolyoVideo.mp4';
const outputVideo = 'public/PortfolyoVideo-optimized.mp4';
const backupVideo = 'public/PortfolyoVideo-backup.mp4';

console.log('🎥 Starting video optimization for Safari compatibility...');

try {
  // Check if input video exists
  if (!fs.existsSync(inputVideo)) {
    console.error('❌ Input video not found:', inputVideo);
    process.exit(1);
  }

  // Create backup of original video
  console.log('📦 Creating backup of original video...');
  fs.copyFileSync(inputVideo, backupVideo);
  console.log('✅ Backup created:', backupVideo);

  // FFmpeg command for Safari optimization
  const ffmpegCommand = [
    'ffmpeg',
    '-i', inputVideo,
    '-c:v', 'libx264',           // H.264 video codec (Safari compatible)
    '-preset', 'medium',         // Balance between quality and encoding speed
    '-crf', '23',               // Constant Rate Factor (good quality)
    '-c:a', 'aac',              // AAC audio codec (Safari compatible)
    '-b:a', '128k',             // Audio bitrate
    '-movflags', '+faststart',  // Optimize for web streaming
    '-pix_fmt', 'yuv420p',      // Pixel format (widely compatible)
    '-profile:v', 'baseline',   // H.264 profile (maximum compatibility)
    '-level', '3.0',            // H.264 level
    '-metadata', 'title=Portfolio Video',
    '-metadata', 'artist=Mert Pehlivan',
    '-y',                       // Overwrite output file
    outputVideo
  ].join(' ');

  console.log('🔄 Converting video for Safari compatibility...');
  console.log('Command:', ffmpegCommand);
  
  execSync(ffmpegCommand, { stdio: 'inherit' });
  
  // Replace original with optimized version
  fs.unlinkSync(inputVideo);
  fs.renameSync(outputVideo, inputVideo);
  
  console.log('✅ Video optimization completed successfully!');
  console.log('📊 Original size:', formatFileSize(fs.statSync(backupVideo).size));
  console.log('📊 Optimized size:', formatFileSize(fs.statSync(inputVideo).size));
  
  // Create WebM version for additional browser support
  console.log('🔄 Creating WebM version for additional browser support...');
  const webmCommand = [
    'ffmpeg',
    '-i', inputVideo,
    '-c:v', 'libvpx-vp9',       // VP9 video codec
    '-crf', '30',               // Quality setting
    '-b:v', '0',                // Variable bitrate
    '-c:a', 'libopus',          // Opus audio codec
    '-b:a', '128k',             // Audio bitrate
    '-y',
    'public/PortfolyoVideo.webm'
  ].join(' ');
  
  execSync(webmCommand, { stdio: 'inherit' });
  console.log('✅ WebM version created: public/PortfolyoVideo.webm');
  
} catch (error) {
  console.error('❌ Error during video optimization:', error.message);
  
  // Restore backup if optimization failed
  if (fs.existsSync(backupVideo)) {
    console.log('🔄 Restoring original video from backup...');
    fs.copyFileSync(backupVideo, inputVideo);
    console.log('✅ Original video restored');
  }
  
  process.exit(1);
}

function formatFileSize(bytes) {
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
}

console.log('\n🎉 Video optimization process completed!');
console.log('📝 Next steps:');
console.log('1. Test the video in Safari');
console.log('2. Update video components to use WebM as fallback');
console.log('3. Consider adding multiple format support');
