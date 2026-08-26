export interface WeddingConfig {
  couplePhotoUrl: string;
}

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

export const weddingConfig = {
  couplePhotoUrl: '/assets/image_copy.png',
  leftPhotoUrl: '/assets/image_copy_2.png',
  centerPhotoUrl: '/assets/image.png',
  rightPhotoUrl: '/assets/image_copy_3.png',
  couple: {
    groom: {
      firstName: "Dinesshkumar",
      fullName: "M Dinesshkumar",
      parents: "Mr. & Mrs. Parents",
    },
    bride: {
      firstName: "Jayakavi",
      fullName: "J Jayakavi",
      parents: "Mr. & Mrs. Parents",
    },
    monogram: "DJ",
    hashtag: "#DinesshkumarAndJayakavi",
    storyQuote: "Two hearts, blessed by family & bound by love.",
    invitationPrefix: "WITH THE BLESSINGS OF OUR FAMILIES,",
    welcomeMessage:
      "cordially invite you and your family to grace the joyous wedding celebration and shower your heartfelt blessings as they begin their journey of love and togetherness.",
  },


  schedule: {
    isoDate: "2026-09-17T06:00:00+05:30",
    displayDate: "16 & 17 SEPTEMBER 2026",
    dayOfWeek: "Wednesday & Thursday",
    time: "Celebrations Begin at 6:30 PM",
    timezone: "IST / Local Time",
    reception: {
      title: "RECEPTION",
      badge: "✨ RECEPTION",
      icon: "Sparkles",
      photoUrl: "/assets/reception_card.png",
      date: "SEPTEMBER 16, 2026",
      displayDate: "SEPTEMBER 16",
      day: "Wednesday",
      time: "7:00 PM Onwards",
      venueName: "VEL SOKKANATHAN THIRUMANA NILAYAM",
      description: "An evening filled with joy, dinner, music & celebration to honor the couple.",
    },
    muhurtham: {
      title: "MUHURTHAM",
      badge: "💍 MUHURTHAM",
      icon: "HeartHandshake",
      photoUrl: "/assets/muhurtham_card.png",
      date: "SEPTEMBER 17, 2026",
      displayDate: "SEPTEMBER 17",
      day: "Thursday",
      time: "8:30 AM – 10:00 AM (Auspicious Muhurtham)",
      venueName: "VEL SOKKANATHAN THIRUMANA NILAYAM",
      description: "The sacred traditional wedding rituals, tying of the sacred knot & feast.",
    },
    events: [
      {
        time: "Sep 16 • 7:00 PM",
        title: "Wedding Reception",
        description: "Grand welcome, stage photography, dinner & musical evening.",
        iconName: "Sparkles",
      },
      {
        time: "Sep 17 • 8:30 AM",
        title: "Auspicious Muhurtham",
        description: "Sacred marriage rituals, Kanyadanam, Mangalsutra dharanam & traditional feast.",
        iconName: "HeartHandshake",
      },
    ],
  },
  // Best & Featured Messages (Updated by couple)
  bestMessages: [
    {
      name: "Beloved Parents",
      tag: "Family Blessings",
      message: "May your married life blossom with endless love, peace, understanding, and divine grace. You make our hearts proud.",
      isSpecial: true,
    },
    {
      name: "Elders & Grandparents",
      tag: "Sacred Wishes",
      message: "May the sacred vows you take today guide your path with harmony, health, and prosperity forever.",
      isSpecial: true,
    },
    {
      name: "Closest Friends & Well-Wishers",
      tag: "Love & Cheers",
      message: "To our favorite duo, Dinesshkumar & Jayakavi! Wishing you both a lifetime of adventure, laughter, and unbreakable companionship!",
      isSpecial: false,
    },
  ],
  venue: {
    name: "VEL SOKKANATHAN THIRUMANA NILAYAM",
    subVenue: "",
    streetAddress: "",
    cityStateZip: "",
    country: "India",
    googleMapsUrl: "https://maps.app.goo.gl/1EC95Lvk3EvRPn3VA",
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
    musicUrl: "/music/ill.mp3",
  },
};
