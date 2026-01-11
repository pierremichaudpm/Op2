# Video and Overlay Optimizations

## Summary of Changes (January 11, 2025)

This document outlines the optimizations made to improve the hero section performance and fix the overwhelming orange overlay issue in Webkit browsers (Safari and GNOME Web).

---

## 🎨 Orange Overlay Fix

### Problem
The orange overlay in the hero section was overwhelming in Webkit browsers (Safari, GNOME Web), almost completely hiding the background image/video.

### Solution
Reduced overlay opacity by 50% and changed blend mode from `color` to `multiply`:

**Before:**
- Main gradient overlay: `opacity: 0.48`, `mix-blend-mode: color`
- Bottom orange gradient: `0.92 → 0.65 → 0` opacity with `mix-blend-mode: color`

**After:**
- Main gradient overlay: `opacity: 0.125`, `mix-blend-mode: multiply`
- Bottom orange gradient: `0.225 → 0.125 → 0` opacity with `mix-blend-mode: multiply`

### Why it Works
- `mix-blend-mode: multiply` provides more consistent results across browsers
- Webkit browsers handle `multiply` blend mode more predictably than `color`
- Reduced opacity values ensure the background image remains clearly visible

---

## 🎥 Video Optimization

### Problem
The original `hero_animation.mp4` video was:
- **3.2 MB** in size
- Not optimized for web delivery
- Causing performance issues on some browsers
- Including unnecessary audio track
- High bitrate (3377 kb/s)

### Solution
Created optimized versions of the video with multiple format support:

#### Optimized Files Created

1. **hero_animation_optimized.mp4**
   - Size: **822 KB** (75% smaller)
   - Format: H.264 (MP4)
   - Resolution: 1728x1104 (scaled to match hero container)
   - Bitrate: ~870 kb/s
   - Frame rate: 24 fps
   - No audio track
   - Fast start enabled (`-movflags +faststart`)

2. **hero_animation_optimized.webm**
   - Size: **903 KB** (72% smaller)
   - Format: VP9 (WebM)
   - Resolution: 1728x1104
   - Bitrate: ~960 kb/s
   - Frame rate: 24 fps
   - No audio track
   - Better compression for modern browsers

#### FFmpeg Commands Used

**MP4 Optimization:**
```bash
ffmpeg -i public/videos/hero_animation.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 28 \
  -vf "scale=1728:1104:flags=lanczos" \
  -an \
  -movflags +faststart \
  -pix_fmt yuv420p \
  public/videos/hero_animation_optimized.mp4
```

**WebM Optimization:**
```bash
ffmpeg -i public/videos/hero_animation.mp4 \
  -c:v libvpx-vp9 \
  -crf 35 \
  -b:v 0 \
  -vf "scale=1728:1104:flags=lanczos" \
  -an \
  -row-mt 1 \
  -cpu-used 2 \
  public/videos/hero_animation_optimized.webm
```

---

## 🚀 Code Optimizations

### VideoBackground Component Updates

#### Multi-Format Support
The component now automatically tries multiple video formats in order of preference:
1. **WebM** (best compression, modern browsers)
2. **Optimized MP4** (good compression, universal support)
3. **Original MP4** (fallback)

#### Lazy Loading
- Video only loads when it enters the viewport
- Uses `IntersectionObserver` API
- Changed `preload` from `"metadata"` to `"none"` until needed
- Threshold reduced to `0.1` for earlier loading

#### Auto-Detection
The component automatically detects the base video path and tries optimized versions:
```typescript
const baseVideoPath = videoSrc.split("?")[0].replace(/\.(mp4|webm)$/, "");
```

### HeroSection Component Updates
- Removed cache-busting query string (`?v=${Date.now()}`)
- Now uses clean path: `/videos/hero_animation.mp4`
- Component handles format selection automatically

---

## 📊 Performance Impact

### File Size Reduction
- **Original:** 3.2 MB
- **Optimized MP4:** 822 KB (↓ 75%)
- **Optimized WebM:** 903 KB (↓ 72%)

### Benefits
✅ Faster initial page load  
✅ Reduced bandwidth usage  
✅ Smoother playback on slower connections  
✅ Better mobile performance  
✅ Lazy loading reduces initial load time  
✅ Format fallbacks ensure broad compatibility  

### Browser Support
- **WebM (VP9):** Chrome, Firefox, Edge, Opera
- **MP4 (H.264):** All browsers including Safari
- **Fallback:** Original video if optimized versions fail

---

## 🔧 Technical Details

### Video Specifications

| Property | Original | Optimized |
|----------|----------|-----------|
| Format | H.264/AAC | H.264 (no audio) |
| Resolution | 1076x688 | 1728x1104 |
| Duration | 7.7s | 7.7s |
| Bitrate | 3377 kb/s | 870 kb/s |
| File Size | 3.2 MB | 822 KB |
| Audio | Yes (136 kb/s) | Removed |

### Encoding Parameters

**H.264 Settings:**
- CRF: 28 (balanced quality/size)
- Preset: slow (better compression)
- Pixel format: yuv420p (universal compatibility)
- Fast start: enabled (streaming optimized)

**VP9 Settings:**
- CRF: 35 (balanced quality/size)
- CPU used: 2 (faster encoding)
- Row-based multithreading: enabled

---

## 🧪 Testing Recommendations

### Browsers to Test
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari (macOS/iOS)
- ✅ GNOME Web (Epiphany)

### What to Check
1. **Overlay visibility:** Background image should be clearly visible
2. **Video loading:** Should only load when hero section is in view
3. **Playback smoothness:** Video should play without stuttering
4. **Format fallback:** Test in browsers with/without WebM support
5. **Mobile performance:** Test on slower connections

### Performance Metrics to Monitor
- First Contentful Paint (FCP)
- Largest Contentful Paint (LCP)
- Network transfer size
- Video load time

---

## 📝 Future Optimization Ideas

1. **Responsive Videos:** Create different sizes for mobile/tablet/desktop
2. **Poster Image:** Optimize the poster image size
3. **Preconnect:** Add DNS prefetch for video CDN if using one
4. **Service Worker:** Cache video files for repeat visits
5. **AV1 Format:** Consider AV1 for even better compression (when browser support improves)

---

## 🔗 Related Files

- `/src/components/sections/HeroSection.tsx` - Hero section component
- `/src/components/ui/video-background.tsx` - Video background component
- `/public/videos/hero_animation.mp4` - Original video
- `/public/videos/hero_animation_optimized.mp4` - Optimized MP4
- `/public/videos/hero_animation_optimized.webm` - Optimized WebM

---

## Git Commits

1. **Fix overwhelming orange overlay in Webkit browsers (Safari/GNOME Web)** (3725800)
   - Changed blend mode from `color` to `multiply`
   - Reduced initial opacity values

2. **Reduce orange overlay by 50% and optimize hero video for better performance** (f0ef115)
   - Further reduced overlay opacity
   - Added optimized video files
   - Implemented lazy loading
   - Added multi-format support