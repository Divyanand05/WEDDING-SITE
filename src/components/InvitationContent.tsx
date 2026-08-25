import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Calendar,
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Heart,
  Sparkles,
  Share2,
  Check,
  GlassWater,
  HeartHandshake,
  UtensilsCrossed,
  Music,
} from 'lucide-react';
import { weddingConfig, WeddingEvent } from '../config/weddingConfig';

const iconMap: Record<string, React.ReactNode> = {
  GlassWater: <GlassWater className="w-5 h-5 text-[#C5A059]" />,
  HeartHandshake: <HeartHandshake className="w-5 h-5 text-[#C5A059]" />,
  Sparkles: <Sparkles className="w-5 h-5 text-[#C5A059]" />,
  UtensilsCrossed: <UtensilsCrossed className="w-5 h-5 text-[#C5A059]" />,
  Music: <Music className="w-5 h-5 text-[#C5A059]" />,
};

export const InvitationContent: React.FC = () => {
  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  const [copiedAddress, setCopiedAddress] = useState(false);

  useEffect(() => {
    const target = new Date(weddingConfig.schedule.isoDate).getTime();

    const calculateTime = () => {
      const now = new Date().getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopyAddress = () => {
    const fullAddress = `${weddingConfig.venue.name}, ${weddingConfig.venue.streetAddress}, ${weddingConfig.venue.cityStateZip}`;
    navigator.clipboard.writeText(fullAddress);
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2500);
  };

  const getWhatsAppUrl = () => {
    const phone = weddingConfig.rsvp.whatsappNumber;
    const msg = encodeURIComponent(weddingConfig.rsvp.defaultMessageTemplate);
    return `https://wa.me/${phone}?text=${msg}`;
  };

  const getGoogleCalendarUrl = () => {
    const title = encodeURIComponent(`${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}'s Wedding`);
    const details = encodeURIComponent(weddingConfig.couple.welcomeMessage);
    const location = encodeURIComponent(`${weddingConfig.venue.name}, ${weddingConfig.venue.streetAddress}, ${weddingConfig.venue.cityStateZip}`);
    // 20260825T130000Z format approx
    const startTime = "20260825T130000Z";
    const endTime = "20260825T183000Z";
    return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${startTime}/${endTime}&details=${details}&location=${location}`;
  };

  // Stagger container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.18,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      style={{
        width: '100%',
        maxWidth: '720px',
        margin: '0 auto',
        padding: '30px 16px 80px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      {/* 1. HERO INVITATION CARD (Screen 3) */}
      <motion.section
        variants={itemVariants}
        className="glass-panel border-gold-double"
        style={{
          borderRadius: '24px',
          padding: '48px 24px',
          textAlign: 'center',
          marginBottom: '32px',
          boxShadow: 'var(--shadow-luxury)',
          position: 'relative',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, rgba(255, 253, 249, 0.95) 0%, rgba(250, 244, 235, 0.9) 100%)',
        }}
      >
        {/* Monogram crest */}
        <div style={{ marginBottom: '20px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '68px',
              height: '68px',
              borderRadius: '50%',
              border: '1px solid rgba(212, 175, 55, 0.5)',
              background: 'radial-gradient(circle, #FFFDF8 0%, #F5EFEB 100%)',
              boxShadow: '0 4px 15px rgba(212, 175, 55, 0.15)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '1.25rem',
                fontWeight: 600,
                color: 'var(--color-gold-deep)',
                letterSpacing: '0.15em',
              }}
            >
              {weddingConfig.couple.monogram}
            </span>
          </div>
        </div>

        {/* Small Intro Tag */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-deep)',
            marginBottom: '18px',
          }}
        >
          THE WEDDING CELEBRATION OF
        </p>

        {/* Screen 3 Large text: GROOM NAME & BRIDE NAME */}
        <h1
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: 'clamp(2.8rem, 8vw, 4.2rem)',
            lineHeight: 1.15,
            color: '#342921',
            marginBottom: '12px',
          }}
        >
          {weddingConfig.couple.groom.firstName}
          <span
            style={{
              display: 'block',
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: '1.6rem',
              color: 'var(--color-gold-primary)',
              fontStyle: 'italic',
              margin: '2px 0',
            }}
          >
            &
          </span>
          {weddingConfig.couple.bride.firstName}
        </h1>

        {/* Full Names subtitle */}
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.82rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#6B5E54',
            marginBottom: '28px',
          }}
        >
          {weddingConfig.couple.groom.fullName} &amp; {weddingConfig.couple.bride.fullName}
        </p>

        {/* Delicate divider */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            margin: '0 auto 28px',
            maxWidth: '280px',
          }}
        >
          <span style={{ height: '1px', flex: 1, backgroundColor: 'rgba(212, 175, 55, 0.4)' }} />
          <Heart style={{ width: '14px', height: '14px', fill: '#C5A059', color: '#C5A059' }} />
          <span style={{ height: '1px', flex: 1, backgroundColor: 'rgba(212, 175, 55, 0.4)' }} />
        </div>

        {/* Screen 3 Text Below: Together with our families... */}
        <p
          style={{
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: '1.25rem',
            lineHeight: 1.6,
            color: '#42362C',
            maxWidth: '520px',
            margin: '0 auto 16px',
            fontStyle: 'italic',
          }}
        >
          "{weddingConfig.couple.welcomeMessage}"
        </p>

        {/* Parents mention */}
        <div
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '0.78rem',
            color: '#8A7C72',
            letterSpacing: '0.08em',
            marginTop: '18px',
          }}
        >
          <p>{weddingConfig.couple.groom.parents}</p>
          <p style={{ marginTop: '4px' }}>{weddingConfig.couple.bride.parents}</p>
        </div>
      </motion.section>

      {/* 2. LIVE COUNTDOWN TIMER */}
      <motion.section
        variants={itemVariants}
        style={{
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.72rem',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-deep)',
            marginBottom: '14px',
          }}
        >
          COUNTING DOWN TO OUR FOREVER
        </p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '10px',
            flexWrap: 'wrap',
          }}
        >
          <div className="countdown-box">
            <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '1.8rem', fontWeight: 600, color: '#3A2E25' }}>
              {timeLeft.days}
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Days</span>
          </div>
          <div className="countdown-box">
            <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '1.8rem', fontWeight: 600, color: '#3A2E25' }}>
              {timeLeft.hours}
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Hours</span>
          </div>
          <div className="countdown-box">
            <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '1.8rem', fontWeight: 600, color: '#3A2E25' }}>
              {timeLeft.minutes}
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Mins</span>
          </div>
          <div className="countdown-box">
            <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '1.8rem', fontWeight: 600, color: 'var(--color-gold-deep)' }}>
              {timeLeft.seconds}
            </span>
            <span style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Secs</span>
          </div>
        </div>
      </motion.section>

      {/* 3. SCREEN 4: WEDDING DETAILS (Date, Time, Venue, Location, RSVP) */}
      <motion.section
        variants={itemVariants}
        className="glass-panel"
        style={{
          borderRadius: '24px',
          padding: '36px 24px',
          marginBottom: '32px',
          border: '1px solid rgba(212, 175, 55, 0.35)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.8rem',
              fontWeight: 600,
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-deep)',
            }}
          >
            SAVE THE DATE
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2rem, 5vw, 2.6rem)',
              color: '#342921',
              marginTop: '6px',
            }}
          >
            {weddingConfig.schedule.displayDate}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.85rem',
              color: '#706357',
              letterSpacing: '0.12em',
              marginTop: '4px',
            }}
          >
            {weddingConfig.schedule.dayOfWeek} at {weddingConfig.schedule.time}
          </p>
        </div>

        {/* Date & Location Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '32px',
          }}
        >
          {/* Card: Ceremony Time */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '16px',
              padding: '22px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FAF6EE',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}
            >
              <Clock style={{ width: '20px', height: '20px', color: '#C5A059' }} />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                color: '#3A2E25',
                marginBottom: '6px',
              }}
            >
              TIME & SCHEDULE
            </h3>
            <p style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.2rem', color: 'var(--color-gold-deep)', fontWeight: 600 }}>
              {weddingConfig.schedule.time}
            </p>
            <p style={{ fontSize: '0.75rem', color: '#7E7064', marginTop: '4px' }}>
              Reception to follow ceremony
            </p>
          </div>

          {/* Card: Venue Address */}
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.7)',
              borderRadius: '16px',
              padding: '22px',
              border: '1px solid rgba(212, 175, 55, 0.25)',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                width: '44px',
                height: '44px',
                borderRadius: '50%',
                background: '#FAF6EE',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 12px',
              }}
            >
              <MapPin style={{ width: '20px', height: '20px', color: '#C5A059' }} />
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-heading)',
                fontSize: '0.85rem',
                letterSpacing: '0.15em',
                color: '#3A2E25',
                marginBottom: '6px',
              }}
            >
              VENUE LOCATION
            </h3>
            <p style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.15rem', color: '#3A2E25', fontWeight: 600 }}>
              {weddingConfig.venue.name}
            </p>
            {weddingConfig.venue.subVenue && (
              <p style={{ fontSize: '0.75rem', color: 'var(--color-gold-deep)', fontWeight: 500 }}>
                {weddingConfig.venue.subVenue}
              </p>
            )}
            <p style={{ fontSize: '0.78rem', color: '#7E7064', marginTop: '4px' }}>
              {weddingConfig.venue.streetAddress}, {weddingConfig.venue.cityStateZip}
            </p>
          </div>
        </div>

        {/* PRIMARY ACTION BUTTONS: VIEW LOCATION & RSVP */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '14px',
            maxWidth: '480px',
            margin: '0 auto',
          }}
        >
          {/* VIEW LOCATION Button -> Google Maps */}
          <a
            href={weddingConfig.venue.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="view-location-button"
            className="btn-gold"
            style={{ width: '100%' }}
          >
            <MapPin style={{ width: '18px', height: '18px' }} />
            <span>VIEW LOCATION ON MAPS</span>
            <ExternalLink style={{ width: '14px', height: '14px', opacity: 0.8 }} />
          </a>

          {/* RSVP Button -> Configurable WhatsApp */}
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            id="rsvp-button"
            className="btn-gold"
            style={{
              width: '100%',
              background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
              borderColor: 'rgba(255, 255, 255, 0.3)',
              boxShadow: '0 6px 20px rgba(46, 125, 50, 0.35)',
            }}
          >
            <MessageCircle style={{ width: '18px', height: '18px' }} />
            <span>RSVP VIA WHATSAPP</span>
            <ExternalLink style={{ width: '14px', height: '14px', opacity: 0.8 }} />
          </a>

          {/* Secondary Action: Add to Calendar & Copy Address */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '10px',
              marginTop: '4px',
            }}
          >
            <a
              href={getGoogleCalendarUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-gold"
              style={{ fontSize: '0.75rem', padding: '12px 14px' }}
            >
              <Calendar style={{ width: '14px', height: '14px', color: '#C5A059' }} />
              <span>Add to Cal</span>
            </a>

            <button
              onClick={handleCopyAddress}
              className="btn-outline-gold"
              style={{ fontSize: '0.75rem', padding: '12px 14px' }}
            >
              {copiedAddress ? (
                <>
                  <Check style={{ width: '14px', height: '14px', color: '#2E7D32' }} />
                  <span>Copied!</span>
                </>
              ) : (
                <>
                  <Share2 style={{ width: '14px', height: '14px', color: '#C5A059' }} />
                  <span>Copy Address</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* RSVP Deadline Note */}
        <p
          style={{
            textAlign: 'center',
            fontSize: '0.75rem',
            color: '#8A7B6E',
            fontStyle: 'italic',
            marginTop: '20px',
          }}
        >
          Kindly respond by {weddingConfig.rsvp.deadlineDate}
        </p>
      </motion.section>

      {/* 4. EVENT TIMELINE / SCHEDULE */}
      <motion.section
        variants={itemVariants}
        className="glass-panel"
        style={{
          borderRadius: '24px',
          padding: '36px 24px',
          marginBottom: '32px',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '28px' }}>
          <span
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.75rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color: 'var(--color-gold-deep)',
            }}
          >
            ORDER OF CELEBRATION
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: '1.9rem',
              color: '#342921',
              marginTop: '4px',
            }}
          >
            Wedding Itinerary
          </h2>
        </div>

        <div style={{ position: 'relative', paddingLeft: '28px', borderLeft: '2px dashed rgba(212, 175, 55, 0.4)', marginLeft: '16px' }}>
          {weddingConfig.schedule.events.map((event: WeddingEvent, index: number) => (
            <div
              key={index}
              style={{
                position: 'relative',
                marginBottom: index === weddingConfig.schedule.events.length - 1 ? '0' : '28px',
              }}
            >
              {/* Timeline Pin */}
              <div
                style={{
                  position: 'absolute',
                  left: '-43px',
                  top: '0',
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  backgroundColor: '#FFFDF9',
                  border: '2px solid #D4AF37',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                }}
              >
                {iconMap[event.iconName] || <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />}
              </div>

              <div>
                <span
                  style={{
                    display: 'inline-block',
                    fontFamily: 'var(--font-heading)',
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    color: 'var(--color-gold-deep)',
                    letterSpacing: '0.12em',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    padding: '2px 8px',
                    borderRadius: '4px',
                    marginBottom: '4px',
                  }}
                >
                  {event.time}
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-serif-luxury)',
                    fontSize: '1.25rem',
                    color: '#382D25',
                    fontWeight: 600,
                  }}
                >
                  {event.title}
                </h4>
                <p
                  style={{
                    fontSize: '0.82rem',
                    color: '#736559',
                    lineHeight: 1.5,
                    marginTop: '2px',
                  }}
                >
                  {event.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.section>

      {/* 5. DRESS CODE & ATTIRE PALETTE */}
      <motion.section
        variants={itemVariants}
        className="glass-panel"
        style={{
          borderRadius: '24px',
          padding: '32px 24px',
          marginBottom: '32px',
          textAlign: 'center',
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.75rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color: 'var(--color-gold-deep)',
          }}
        >
          DRESS CODE
        </span>
        <h3
          style={{
            fontFamily: 'var(--font-serif-luxury)',
            fontSize: '1.6rem',
            color: '#342921',
            margin: '6px 0 10px',
          }}
        >
          {weddingConfig.details.dressCode.title}
        </h3>
        <p
          style={{
            fontSize: '0.85rem',
            color: '#6E6054',
            maxWidth: '500px',
            margin: '0 auto 20px',
            lineHeight: 1.6,
          }}
        >
          {weddingConfig.details.dressCode.description}
        </p>

        {/* Color Palette Swatches */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '12px' }}>
          {weddingConfig.details.dressCode.palette.map((color: string, i: number) => (
            <div
              key={i}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: color,
                border: '2px solid #FFF',
                boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
              }}
              title={color}
            />
          ))}
        </div>
      </motion.section>

      {/* 6. GIFT REGISTRY & WISHES */}
      {weddingConfig.details.giftRegistry && (
        <motion.section
          variants={itemVariants}
          className="glass-panel"
          style={{
            borderRadius: '24px',
            padding: '32px 24px',
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          <Heart style={{ width: '22px', height: '22px', color: '#C5A059', margin: '0 auto 10px' }} />
          <h3
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: '1.5rem',
              color: '#342921',
              marginBottom: '10px',
            }}
          >
            {weddingConfig.details.giftRegistry.title}
          </h3>
          <p
            style={{
              fontSize: '0.84rem',
              color: '#6E6054',
              maxWidth: '520px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            {weddingConfig.details.giftRegistry.note}
          </p>
        </motion.section>
      )}

      {/* 7. FOOTER & HASHTAG */}
      <motion.footer
        variants={itemVariants}
        style={{
          textAlign: 'center',
          paddingTop: '20px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-script)',
            fontSize: '2.4rem',
            color: '#9C7A3C',
            marginBottom: '4px',
          }}
        >
          With Love, {weddingConfig.couple.groom.firstName} & {weddingConfig.couple.bride.firstName}
        </p>
        <p
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.85rem',
            letterSpacing: '0.2em',
            color: 'var(--color-gold-deep)',
            marginTop: '8px',
          }}
        >
          {weddingConfig.couple.hashtag}
        </p>
      </motion.footer>
    </motion.div>
  );
};
