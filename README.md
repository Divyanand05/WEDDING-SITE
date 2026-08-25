# 💌 Luxury Interactive Digital Wedding Invitation

A high-end, romantic, and cinematic interactive digital wedding invitation web application built with **React**, **Vite**, **Framer Motion**, and **Tailored Luxury CSS**.

Inspired by boutique Etsy stationery invitations, this project features a realistic **3D envelope opening animation**, floating rose petals, soft background music, live countdown, Google Maps location integration, and direct WhatsApp RSVP messaging.

---

## ✨ Features

- 💌 **Screen 1: Romantic Notification Alert** — *"A beautiful new chapter is about to begin..."* with an animated glowing heart and pulsing "TAP TO OPEN" action.
- ✉️ **Screen 2: 3D Wax-Sealed Ivory Envelope** — Realistic 3D perspective flap unfolding (`rotateX(180deg)`), gold wax seal, botanical white rose framing, and smooth upward emergence of the invitation card.
- 💍 **Screen 3: Grand Announcement** — Elegant typography featuring Bride & Groom names, custom monogram, and family invitation message.
- 🗓️ **Screen 4: Wedding Details & Actions**
  - **Live Countdown Timer** to the wedding date & time
  - **Itinerary & Order of Celebration** timeline
  - **Dress Code & Attire Palette** color swatches
  - **View Location** button (opens Google Maps)
  - **RSVP via WhatsApp** button (opens pre-filled WhatsApp message)
  - **Add to Calendar** button (Google Calendar / iCal)
  - **Copy Address** button
- 🌸 **Sensory & Visual Polish**
  - Subtle falling rose petals canvas animation
  - Web Audio API harp chime & paper rustle sound effects
  - Romantic background acoustic music stream with floating toggle button
  - Fully responsive across Mobile, Tablet, and Desktop
  - Respects `prefers-reduced-motion`

---

## 📊 Excel Sheet Storage for Guest Blessings

All guest blessings and wishes submitted on the website are automatically saved and accessible in Excel format in **2 ways**:

### Method 1: 1-Click Excel Download (Built-in & Instant)
- Click the **`📊 Download Blessings Excel Sheet (.csv)`** button in the BLESSINGS section on the website.
- Downloads `Jananee_Arivannal_Guest_Blessings.csv` containing all guest names, messages, and timestamps formatted natively for **Microsoft Excel**.

### Method 2: Live Google Sheets / Excel Webhook (Real-Time Cloud Storage)
To have guest messages automatically append to a live **Google Sheet / Excel** in real time:
1. Create a Google Sheet titled `Jananee & Arivannal Guest Blessings`.
2. Go to **Extensions → Apps Script**, paste this code, and click **Deploy as Web App**:
```javascript
function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  sheet.appendRow([data.name, data.message, data.date]);
  return ContentService.createTextOutput("Success");
}
```
3. Copy the Web App URL and paste it into [`src/config/weddingConfig.ts`](src/config/weddingConfig.ts):
```typescript
  rsvp: {
    excelWebhookUrl: "YOUR_GOOGLE_APPS_SCRIPT_URL_HERE",
  }
```
4. Now every guest blessing will instantly write a new row into your Excel Google Sheet!

---


## ⚙️ Easy Customization

All wedding details are centrally configured in **[`src/config/weddingConfig.ts`](src/config/weddingConfig.ts)**:

```typescript
export const weddingConfig = {
  couple: {
    groom: { firstName: "Alexander", fullName: "Alexander James Hayes", parents: "Mr. & Mrs. Robert Hayes" },
    bride: { firstName: "Elena", fullName: "Elena Sofia Vance", parents: "Mr. & Mrs. Edward Vance" },
    monogram: "A & E",
    hashtag: "#ElenaAndAlexForever",
    welcomeMessage: "Together with our families, we joyfully invite you to celebrate the beginning of our forever.",
  },
  schedule: {
    isoDate: "2026-08-25T18:30:00+05:30",
    displayDate: "25 AUGUST 2026",
    dayOfWeek: "Tuesday",
    time: "6:30 PM",
    events: [ ... ],
  },
  venue: {
    name: "The Rosewood Villa & Botanical Glasshouse",
    streetAddress: "742 Magnolia Blossom Way",
    cityStateZip: "Beverly Hills, CA 90210",
    googleMapsUrl: "https://maps.google.com/?q=The+Rosewood+Villa+Estate",
  },
  rsvp: {
    whatsappNumber: "15551234567", // Country code + phone number (no '+' or dashes)
    defaultMessageTemplate: "Hi! 💌 I would love to RSVP for the wedding on August 25, 2026!",
    deadlineDate: "10 August 2026",
  },
  // ...
};
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 🌐 How to Deploy to Vercel

### Step 1: Initialize Git and Commit
```bash
git init
git add .
git commit -m "feat: initial interactive wedding invitation"
```

### Step 2: Push to GitHub
1. Create a new repository on [GitHub](https://github.com/new) (e.g., `wedding-invitation`).
2. Link your local project and push:
```bash
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and log in.
2. Click **"Add New..."** → **"Project"**.
3. Import your GitHub repository.
4. Keep the default Vite build settings (`Framework Preset: Vite`, `Build Command: npm run build`, `Output Directory: dist`).
5. Click **Deploy**!

Vercel will provide you with a live shareable URL (e.g., `https://your-wedding.vercel.app`) to send to your guests on WhatsApp, SMS, or Email!

---

## 📱 What Your Guests Experience

Guests receive a link:
> *💌 You have received a special invitation... Tap here to open*

1. They open the web link on their mobile or desktop.
2. They see the elegant notification alert and click **"TAP TO OPEN"**.
3. The wax-sealed ivory envelope appears. They tap it.
4. The envelope flap smoothly flips open in 3D with a gentle harp chime.
5. The invitation card physically rises out of the envelope with celebratory sparkle.
6. The full ceremony itinerary, Google Maps directions, live countdown, and direct WhatsApp RSVP button appear.
