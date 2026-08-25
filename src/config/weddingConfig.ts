export interface WeddingEvent {
  time: string;
  title: string;
  description: string;
  iconName: string;
}

export interface WeddingConfig {
  couple: {
    groom: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    bride: {
      firstName: string;
      fullName: string;
      parents: string;
    };
    monogram: string; // e.g. "A & E" or "A • E"
    hashtag: string;
    storyQuote: string;
    welcomeMessage: string;
  };
  schedule: {
    isoDate: string; // "2026-08-25T18:30:00" for countdown timer & calendar
    displayDate: string; // "25 August 2026"
    dayOfWeek: string; // "Tuesday"
    time: string; // "6:30 PM"
    timezone: string;
    events: WeddingEvent[];
  };
  venue: {
    name: string;
    subVenue?: string;
    streetAddress: string;
    cityStateZip: string;
    country: string;
    googleMapsUrl: string;
    coordinates?: { lat: number; lng: number };
  };
  rsvp: {
    whatsappNumber: string; // Country code + number without + or spaces e.g. "1234567890"
    defaultMessageTemplate: string;
    deadlineDate: string;
    emailContact?: string;
  };
  details: {
    dressCode: {
      title: string;
      description: string;
      palette: string[]; // hex codes for recommended attire colors
    };
    giftRegistry?: {
      title: string;
      note: string;
      bankDetails?: {
        bankName: string;
        accountName: string;
        accountNumber: string;
      };
    };
  };
  theme: {
    primaryGold: string;
    ivoryBg: string;
    blushAccent: string;
    enableAudio: boolean;
    musicUrl?: string; // Optional audio mp3 stream
  };
}

export const weddingConfig: WeddingConfig = {
  couple: {
    groom: {
      firstName: "Alexander",
      fullName: "Alexander James Hayes",
      parents: "Mr. & Mrs. Robert Hayes",
    },
    bride: {
      firstName: "Elena",
      fullName: "Elena Sofia Vance",
      parents: "Mr. & Mrs. Edward Vance",
    },
    monogram: "A & E",
    hashtag: "#ElenaAndAlexForever",
    storyQuote: "Two souls, one destiny, and a lifetime of love to unfold.",
    welcomeMessage:
      "Together with our families, we joyfully invite you to celebrate the beginning of our forever.",
  },
  schedule: {
    isoDate: "2026-08-25T18:30:00+05:30",
    displayDate: "25 AUGUST 2026",
    dayOfWeek: "Tuesday",
    time: "6:30 PM",
    timezone: "IST / Local Time",
    events: [
      {
        time: "5:30 PM",
        title: "Guest Arrival & Welcome Refreshments",
        description: "Welcome champagne, botanical mocktails, and live acoustic quartet in the Courtyard.",
        iconName: "GlassWater",
      },
      {
        time: "6:30 PM",
        title: "Sacred Wedding Ceremony",
        description: "The exchange of vows and rings beneath the floral grand archway at sunset.",
        iconName: "HeartHandshake",
      },
      {
        time: "7:45 PM",
        title: "Cocktail & Golden Hour Reception",
        description: "Artisanal hors d'oeuvres, signature couple cocktails, and live jazz.",
        iconName: "Sparkles",
      },
      {
        time: "8:45 PM",
        title: "Gourmet Banquet & Toasts",
        description: "A candlelit 4-course culinary dinner, heartfelt speeches, and cake cutting.",
        iconName: "UtensilsCrossed",
      },
      {
        time: "10:00 PM",
        title: "First Dance & Midnight Celebration",
        description: "Dancing under the stars followed by a sparkler send-off.",
        iconName: "Music",
      },
    ],
  },
  venue: {
    name: "The Rosewood Villa & Botanical Glasshouse",
    subVenue: "Grand Sunken Pavilion",
    streetAddress: "742 Magnolia Blossom Way",
    cityStateZip: "Beverly Hills, CA 90210",
    country: "USA",
    googleMapsUrl: "https://maps.google.com/?q=The+Rosewood+Villa+Estate",
  },
  rsvp: {
    whatsappNumber: "15551234567",
    defaultMessageTemplate:
      "Hi Alexander & Elena! 💌 I received your beautiful wedding invitation. I would love to RSVP for the wedding on August 25, 2026! My Name: [Your Name] | Number of Guests Attending: [1/2] | Dietary Preferences: [None/Veg/Vegan]",
    deadlineDate: "10 August 2026",
    emailContact: "celebrate@alexanderandelena.com",
  },
  details: {
    dressCode: {
      title: "Black-Tie Optional / Romantic Elegance",
      description:
        "We kindly request formal evening attire. We invite you to embrace soft neutrals, champagne, gold, and warm blush tones.",
      palette: ["#FDFBF7", "#EAD8C0", "#C5A059", "#D4AF37", "#2C2C2C"],
    },
    giftRegistry: {
      title: "Your Presence is Our Greatest Gift",
      note:
        "Having you with us to share in our joy is the most wonderful gift. If you wish to bless us with a token of love, a contribution toward our new home & honeymoon journey would be deeply appreciated.",
    },
  },
  theme: {
    primaryGold: "#D4AF37",
    ivoryBg: "#FDFBF7",
    blushAccent: "#EAD8C0",
    enableAudio: true,
    // High-quality soothing romantic royalty-free acoustic cello & piano stream
    musicUrl: "https://cdn.pixabay.com/download/audio/2022/05/16/audio_c97a5525d8.mp3?filename=romantic-wedding-piano-112191.mp3",
  },
};
