# 🎂 Birthday Website - Customization Guide

This is a beautiful, interactive birthday website built with React, TypeScript, and Tailwind CSS. Here's how to customize it for your special someone!

## 🎨 Quick Customization (Easy Edits)

### 1. Change Names
Open `src/pages/Index.tsx` and find the customization section at the top:

```typescript
const sisterName = "Sarah"; // CHANGE YOUR SISTER'S NAME HERE
const senderName = "Your Brother"; // CHANGE YOUR NAME HERE
```

### 2. Change Photos
Replace the images in `src/assets/` with your own photos:
- `photo1.jpg` - Keep the same filenames or update the imports in `src/components/PhotoGallery.tsx`
- `photo2.jpg`
- `photo3.jpg`
- `photo4.jpg`

Update captions in `src/components/PhotoGallery.tsx`:
```typescript
const photos: Photo[] = [
  { src: photo1, caption: "Your custom caption here 🌅" },
  // ... more photos
];
```

### 3. Change Birthday Messages
Edit messages in `src/components/TypewriterMessages.tsx`:

```typescript
const messages: Message[] = [
  { text: "Your message here!", from: "Mom" },
  // ... add or modify messages
];
```

### 4. Change Gift Box Surprises
Customize gift messages in `src/components/GiftBoxes.tsx`:

```typescript
const gifts: GiftBox[] = [
  {
    id: 1,
    message: "Your surprise message here! 💫",
    icon: <Sparkles className="w-12 h-12 text-accent" />,
  },
  // ... modify all 3 gifts
];
```

### 5. Add Birthday Music
1. Get a birthday song MP3 file
2. Create a folder: `public/audio/`
3. Add your file: `public/audio/birthday-song.mp3`
4. The music player will automatically use it!

## 🎨 Design Customization

### Colors
All colors are defined in `src/index.css`. The current theme uses:
- **Soft Blush Pink**: #FFDDE6
- **Dusty Rose**: #F7D1D8
- **Off-White**: #FFF8F6
- **Deep Teal**: #095B5B
- **Gold Accent**: #D4AF37

To change colors, edit the HSL values in `src/index.css` under `:root`.

### Fonts
Current fonts: **Poppins** (headings) and **Nunito** (body text).

To change fonts:
1. Edit `index.html` and replace the Google Fonts link
2. Update `tailwind.config.ts` font family settings

## 🚀 How to Run

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📱 Features

✨ **Interactive Elements:**
- Floating balloons with wobble animation
- Flickering birthday candles
- Blow candles to reveal surprises
- Confetti celebration
- Opening gift boxes
- Typewriter effect messages
- Photo gallery with lightbox
- Music player
- Accessibility features (reduce motion toggle)

## 🌐 Hosting

### Easy Option: Open the File
Just open `index.html` in a browser after building!

### Professional Hosting:
1. Run `npm run build`
2. Upload the `dist` folder to any static hosting service:
   - Netlify
   - Vercel
   - GitHub Pages
   - Lovable (click Share → Publish)

## 📄 Downloading as PDF

There's a "Download as PDF" button in the footer that triggers the browser's print dialog. Users can save the page as a PDF from there.

## 💡 Tips

- Test on mobile devices - it's fully responsive!
- The reduce motion toggle helps users who prefer less animation
- Music won't auto-play (browser restrictions), but there's a friendly prompt
- All animations use smooth easing for a polished feel

## 🎉 Have Fun!

This website is designed to bring joy and celebrate your special person. Feel free to customize every detail to make it uniquely yours!

---

Made with 💖 using React, Framer Motion, and lots of love!
