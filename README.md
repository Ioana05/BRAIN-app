# BRAIN PWA Notifications

A Progressive Web App (PWA) designed to foster user engagement with [BRAIN – Broad Research in Artificial Intelligence and Neuroscience](https://brain.edusoft.ro/index.php/brain).
The app sends push notifications whenever a new announcement or issue is published, keeping researchers and readers instantly updated.


## Features

- Real-time notifications for new announcements, journal issues, and updates.
- Article carousel showcasing latest research.
- Cross-platform support: iOS (Safari), Android (Chrome/Edge), and modern desktop browsers.
- Persistent notifications with read/unread states.
- Offline-ready PWA with service workers.

## Tech Stack

**Frontend**: React (Vite) + React Router <br>
**State Management (client-side)**: React Context API + LocalStorage <br>
**Styling**: Styled Components + Bootstrap <br>
**PWA Support**: vite-plugin-pwa + Workbox <br>
**Notifications**: Firebase Cloud Messaging (FCM) <br>
**Backend utilities**: Node.js (for API endpoints), Firestore (token & announcements storage) <br>
**Deployment & Hosting**: Vercel (serverless API functions + frontend hosting) <br>
**Automation**: GitHub Actions (cron job to trigger notification endpoint) <br>
**Scraping**: JavaScript for fetching announcements from edusoft.ro <br>

## Supported Platforms

**Mobile**: Android (Chrome, Edge), iOS (Safari) <br>
**Desktop**: Chrome, Edge, Firefox (limited), Safari <br>
⚠️ iOS Safari supports PWA + push notifications starting from iOS 16.4+.

## Installation
### For Users (PWA installation)

1) Visit the app in a supported browser: <br>
**Android**: Chrome or Edge (you’ll get an Install App prompt). <br>
**Desktop**: Chrome, Edge, Safari (click Install App in the address bar). <br>
**iOS/iPadOS**: **Safari only** (other browsers just create a bookmark, not a PWA). <br>
2) Open the installed app and enable notifications when prompted.

‼️iOS specific steps:

1) Open the app's domain in Safari.
2) Tap the **Share** button.
3) Select **Add to Home Screen**.
4) The app icon will appear on your home screen like a native app.

### For Developers

Clone the repository and run locally:
```
git clone https://github.com/Ioana05/BRAIN-app.git
cd BRAIN-app
npm install
npm run dev
```
Build for production:
```
npm run build
npm run preview
```
