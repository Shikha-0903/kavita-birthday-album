# 🔥 Firebase Setup Instructions

## Step 1: Get Your Firebase Configuration

1. Go to your [Firebase Console](https://console.firebase.google.com/u/0/project/artgallery-1e47c/settings/general)
2. Click on the **gear icon** (⚙️) next to "Project Overview"
3. Select **"Project settings"**
4. Scroll down to **"Your apps"** section
5. If you don't have a web app yet:
   - Click the **`</>`** icon to add a web app
   - Give it a nickname (e.g., "Kavita Birthday Album")
   - Click **"Register app"**
6. Copy the `firebaseConfig` object

## Step 2: Update firebase-config.js

Open `js/firebase-config.js` and replace this section:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "artgallery-1e47c.firebaseapp.com",
  projectId: "artgallery-1e47c",
  storageBucket: "artgallery-1e47c.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
```

With your actual configuration (it should look something like this):

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "artgallery-1e47c.firebaseapp.com",
  projectId: "artgallery-1e47c",
  storageBucket: "artgallery-1e47c.appspot.com",
  messagingSenderId: "123456789012",
  appId: "1:123456789012:web:abcdef1234567890"
};
```

## Step 3: Configure Storage Rules

1. Go to [Firebase Storage](https://console.firebase.google.com/u/0/project/artgallery-1e47c/storage)
2. Click on the **"Rules"** tab
3. Make sure your rules allow public read access:

```
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read: if true;  // Allow public read access
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

4. Click **"Publish"** to save the rules

## Step 4: Verify Your Images

1. Go to [Firebase Storage Files](https://console.firebase.google.com/u/0/project/artgallery-1e47c/storage/artgallery-1e47c.appspot.com/files)
2. Make sure your images are in the folder: `kavita/memories/`
3. The app will automatically fetch all images from this folder

## Step 5: Test the App

1. Open `index.html` in your browser using a local server:
   ```bash
   npx serve .
   ```
2. Open `http://localhost:3000`
3. Check the browser console (F12) for any errors
4. Images should load from Firebase Storage

## Troubleshooting

### "Firebase: Error (auth/api-key-not-valid)"
- Double-check your `apiKey` in `firebase-config.js`

### "Firebase Storage: User does not have permission"
- Update your Storage Rules (see Step 3)

### Images not showing
- Verify images are in `kavita/memories/` folder
- Check browser console for CORS errors
- Make sure Storage Rules allow read access

### Still having issues?
- Open browser console (F12) and check for error messages
- The app will use demo images if Firebase is not configured correctly
