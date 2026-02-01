# 🎉 Quick Start Guide - Kavita's Birthday Album

## 📍 Location

Your birthday album is now in a **separate, clean directory**:

```
c:\shikha\projects\kavita\birthday-album\
```

This keeps it completely separate from your Flutter project! 🎯

## 🚀 How to View the Album

### Option 1: Local Server (Already Running!)

The server is already running! Just open your browser to:

**🌐 http://localhost:3000**

### Option 2: Restart Server (if needed)

```bash
cd c:\shikha\projects\kavita\birthday-album
npx -y serve . -p 3000
```

Then open: **http://localhost:3000**

## 📁 What's Inside

```
birthday-album/
├── index.html              # Main page
├── README.md               # Full documentation
├── FIREBASE_SETUP.md       # Firebase config guide
├── css/
│   ├── styles.scss        # Source styles
│   └── main.css           # Compiled CSS
└── js/
    ├── firebase-config.js # Firebase setup
    ├── animations.js      # Animations
    └── app.js             # Main app
```

## ⚙️ Next Steps

### 1. Configure Firebase (Important!)

Open `js/firebase-config.js` and add your Firebase credentials:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",  // ← Replace these
  authDomain: "artgallery-1e47c.firebaseapp.com",
  projectId: "artgallery-1e47c",
  storageBucket: "artgallery-1e47c.appspot.com",
  messagingSenderId: "YOUR_ID",  // ← Replace these
  appId: "YOUR_APP_ID"  // ← Replace these
};
```

**Where to get these values:**
1. Go to [Firebase Console](https://console.firebase.google.com/u/0/project/artgallery-1e47c/settings/general)
2. Click ⚙️ (Settings) → Project Settings
3. Scroll to "Your apps" → Web app
4. Copy the config values

See [FIREBASE_SETUP.md](file:///c:/shikha/projects/kavita/birthday-album/FIREBASE_SETUP.md) for detailed instructions!

### 2. Test It Out!

1. Open **http://localhost:3000** in your browser
2. Watch the loading animation
3. Scroll down to see the train journey
4. Click on memory stations to view photos
5. Use arrows or swipe to navigate photos

### 3. Deploy (When Ready)

Choose any hosting platform:

**Firebase Hosting:**
```bash
cd c:\shikha\projects\kavita\birthday-album
firebase init hosting
firebase deploy
```

**Netlify:**
- Drag the `birthday-album` folder to [Netlify Drop](https://app.netlify.com/drop)

**Vercel:**
```bash
cd c:\shikha\projects\kavita\birthday-album
npx vercel
```

## 🎨 Features You'll See

✨ **Loading Screen** - Animated train with progress bar
🎂 **Hero Section** - "Happy Birthday Kavita!" with gradient text
🚂 **Train Journey** - Train moves as you scroll
📸 **Memory Stations** - Unlock with particle effects
🖼️ **Photo Gallery** - Full-screen modal with navigation
📱 **Responsive** - Works on all devices
⌨️ **Keyboard Support** - Arrow keys, ESC to close

## 🐛 Troubleshooting

**Server not running?**
```bash
cd c:\shikha\projects\kavita\birthday-album
npx -y serve . -p 3000
```

**Images not loading?**
- Configure Firebase (see step 1 above)
- The app will show demo images until Firebase is configured

**Want to change colors?**
- Edit `css/styles.scss`
- Run: `sass css/styles.scss css/main.css`

## 💝 Final Touch

Once Firebase is configured with your actual photos, the album will:
- Auto-organize photos by date
- Create memory stations for each time period
- Show real photos from your friendship

**This is going to be an amazing gift! 🎁✨**

---

Need help? Check the full [README.md](file:///c:/shikha/projects/kavita/birthday-album/README.md) or [FIREBASE_SETUP.md](file:///c:/shikha/projects/kavita/birthday-album/FIREBASE_SETUP.md)!
