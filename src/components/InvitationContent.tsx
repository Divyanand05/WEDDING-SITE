import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Clock,
  MapPin,
  MessageCircle,
  ExternalLink,
  Share2,
  Menu,
  X,
  Send,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';


interface Blessing {
  name: string;
  message: string;
  date: string;
}

export const InvitationContent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Blessings Guest Book State
  const [blessings, setBlessings] = useState<Blessing[]>([
    {
      name: "Suresh & Family",
      message: "Wishing Jananee & Arivannal a lifetime of love, laughter, and endless happiness together!",
      date: "Today",
    },
    {
      name: "Anitha R.",
      message: "So thrilled to celebrate your special day! May your bond grow stronger with each passing day.",
      date: "Yesterday",
    },
  ]);

  const [guestName, setGuestName] = useState('');
  const [guestMessage, setGuestMessage] = useState('');
  const [submittedBlessing, setSubmittedBlessing] = useState(false);

  // Live Countdown State
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

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

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: 'Jananee & Arivannal Wedding Invitation',
          text: 'You are warmly invited to celebrate the wedding of Jananee & Arivannal!',
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Initialize Blessings from localStorage if available
  useEffect(() => {
    try {
      const saved = localStorage.getItem('wedding_blessings');
      if (saved) {
        setBlessings(JSON.parse(saved));
      }
    } catch (e) {
      console.debug(e);
    }
  }, []);

  const handleAddBlessing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;

    const newBlessing: Blessing = {
      name: guestName.trim(),
      message: guestMessage.trim(),
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit' }),
    };

    const updated = [newBlessing, ...blessings];
    setBlessings(updated);

    try {
      localStorage.setItem('wedding_blessings', JSON.stringify(updated));
    } catch (e) {
      console.debug(e);
    }

    // Send POST to Google Sheets / Excel Webhook if configured
    if (weddingConfig.rsvp.excelWebhookUrl) {
      try {
        await fetch(weddingConfig.rsvp.excelWebhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newBlessing),
        });
      } catch (err) {
        console.debug('Webhook POST:', err);
      }
    }

    setGuestName('');
    setGuestMessage('');
    setSubmittedBlessing(true);
    setTimeout(() => setSubmittedBlessing(false), 3500);
  };

  // Download Guest Blessings directly as Microsoft Excel (.csv) file
  const downloadExcelSheet = () => {
    const headers = ['Guest Name', 'Blessings & Message', 'Date Submitted'];
    const rows = blessings.map((b) => [
      `"${b.name.replace(/"/g, '""')}"`,
      `"${b.message.replace(/"/g, '""')}"`,
      `"${b.date}"`,
    ]);

    const csvContent = '\uFEFF' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'Jananee_Arivannal_Guest_Blessings.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#FAF7F2',
        color: '#2C2520',
        fontFamily: 'var(--font-sans)',
        position: 'relative',
        overflowX: 'hidden',
      }}
    >
      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          1. NAVIGATION HEADER (Matching Screenshot 2)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'linear-gradient(to bottom, rgba(20, 10, 5, 0.75) 0%, rgba(20, 10, 5, 0.0) 100%)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
        }}
      >
        {/* Logo Monogram JA */}
        <div
          onClick={() => scrollToSection('home')}
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '1.4rem',
            fontWeight: 700,
            letterSpacing: '0.15em',
            color: '#F4E5C3',
            cursor: 'pointer',
            textShadow: '0 2px 8px rgba(0,0,0,0.5)',
          }}
        >
          JA
        </div>

        {/* Desktop Navigation Links */}
        <nav
          style={{
            display: 'none',
            gap: '32px',
            alignItems: 'center',
          }}
          className="md:flex"
        >
          {['HOME', 'EVENTS', 'MOMENTS', 'BLESSINGS'].map((link) => (
            <button
              key={link}
              onClick={() => scrollToSection(link.toLowerCase())}
              style={{
                background: 'none',
                border: 'none',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.22em',
                color: '#F4E5C3',
                cursor: 'pointer',
                transition: 'color 0.3s ease',
                textShadow: '0 2px 6px rgba(0,0,0,0.6)',
              }}
            >
              {link}
            </button>
          ))}
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle menu"
          style={{
            background: 'none',
            border: 'none',
            color: '#F4E5C3',
            cursor: 'pointer',
            padding: '4px',
          }}
        >
          {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            style={{
              position: 'fixed',
              top: '60px',
              left: 0,
              right: 0,
              background: 'rgba(25, 16, 12, 0.95)',
              backdropFilter: 'blur(16px)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              alignItems: 'center',
              borderBottom: '1px solid rgba(212, 175, 55, 0.3)',
              boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
            }}
          >
            {['HOME', 'EVENTS', 'MOMENTS', 'BLESSINGS'].map((link) => (
              <button
                key={link}
                onClick={() => scrollToSection(link.toLowerCase())}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  letterSpacing: '0.25em',
                  color: '#FDFBF7',
                  cursor: 'pointer',
                }}
              >
                {link}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          2. HERO HERO BANNER (Matching Screenshot 2 EXACTLY)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="home"
        style={{
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          padding: '120px 20px 60px',
          backgroundImage: `url(${weddingConfig.couplePhotoUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center 25%',
          backgroundAttachment: 'scroll',
        }}
      >
        {/* Dark Warm Mahogany Overlay — subtle so background photo is beautifully visible */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(180deg, rgba(20, 10, 5, 0.48) 0%, rgba(30, 15, 10, 0.42) 50%, rgba(18, 8, 4, 0.75) 100%)',
            pointerEvents: 'none',
          }}
        />


        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            zIndex: 10,
            maxWidth: '860px',
            width: '100%',
          }}
        >
          {/* TOGETHER WITH THEIR FAMILIES, */}
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(0.72rem, 2vw, 0.88rem)',
              fontWeight: 600,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#D4AF37',
              marginBottom: '20px',
            }}
          >
            TOGETHER WITH THEIR FAMILIES,
          </p>

          {/* Jananee & Arivannal */}
          <h1
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(3rem, 9vw, 5.8rem)',
              lineHeight: 1.1,
              color: '#FFFDF9',
              fontWeight: 400,
              marginBottom: '22px',
              textShadow: '0 4px 20px rgba(0,0,0,0.6)',
            }}
          >
            {weddingConfig.couple.bride.firstName}{' '}
            <span
              style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(2.5rem, 7vw, 4.5rem)',
                color: '#D4AF37',
                margin: '0 8px',
              }}
            >
              &amp;
            </span>{' '}
            {weddingConfig.couple.groom.firstName}
          </h1>

          {/* Subtitle invitation text */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 'clamp(0.9rem, 2.2vw, 1.15rem)',
              lineHeight: 1.7,
              color: 'rgba(255, 253, 249, 0.9)',
              maxWidth: '680px',
              margin: '0 auto 36px',
              fontWeight: 300,
              letterSpacing: '0.04em',
            }}
          >
            {weddingConfig.couple.welcomeMessage}
          </p>

          {/* CTA Buttons matching Screenshot 2 */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {/* VIEW SCHEDULE ↓ */}
            <button
              onClick={() => scrollToSection('events')}
              id="view-schedule-btn"
              style={{
                padding: '16px 32px',
                background: 'linear-gradient(135deg, #C5A059 0%, #A37E30 100%)',
                color: '#FFFFFF',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                borderRadius: '6px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              VIEW SCHEDULE ↓
            </button>

            {/* SHARE INVITATION 🔗 */}
            <button
              onClick={handleShare}
              id="share-invitation-btn"
              style={{
                padding: '16px 32px',
                background: 'rgba(20, 12, 8, 0.65)',
                color: '#FFFDF9',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.82rem',
                fontWeight: 600,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                borderRadius: '6px',
                border: '1px solid rgba(212, 175, 55, 0.6)',
                backdropFilter: 'blur(8px)',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                transition: 'all 0.3s ease',
              }}
            >
              <span>{copiedLink ? 'LINK COPIED!' : 'SHARE INVITATION'}</span>
              <Share2 size={16} style={{ color: '#D4AF37' }} />
            </button>
          </div>
        </motion.div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          3. MOMENTS SECTION (Matching Screenshot 1 EXACTLY)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="moments"
        style={{
          padding: '90px 24px',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Header: A GLIMPSE OF US / Moments, held forever. */}
        <div style={{ marginBottom: '48px' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#A37E30',
              marginBottom: '10px',
            }}
          >
            A GLIMPSE OF US
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              color: '#34251D',
              fontWeight: 400,
            }}
          >
            Moments, held{' '}
            <span
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontStyle: 'italic',
                color: '#A37E30',
              }}
            >
              forever.
            </span>
          </h2>
        </div>

        {/* Moments Photo Gallery Cards Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '24px',
          }}
        >
          {/* Card 1: Full Portrait Couple Photo */}
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(60, 40, 25, 0.12)',
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.25)',
            }}
          >
            <div style={{ height: '380px', overflow: 'hidden' }}>
              <img
                src={weddingConfig.couplePhotoUrl}
                alt="Jananee & Arivannal"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 20%',
                }}
              />
            </div>
            <div style={{ padding: '18px 20px', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif-luxury)',
                  fontSize: '1.25rem',
                  color: '#34251D',
                  fontStyle: 'italic',
                }}
              >
                "Bound by love and laughter"
              </p>
            </div>
          </motion.div>

          {/* Card 2: Traditional Attire Close-Up */}
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(60, 40, 25, 0.12)',
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.25)',
            }}
          >
            <div style={{ height: '380px', overflow: 'hidden', background: '#F5ECE0' }}>
              <img
                src={weddingConfig.couplePhotoUrl}
                alt="Sacred Union"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 50%',
                }}
              />
            </div>
            <div style={{ padding: '18px 20px', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif-luxury)',
                  fontSize: '1.25rem',
                  color: '#34251D',
                  fontStyle: 'italic',
                }}
              >
                "Sacred vows beneath golden sunlight"
              </p>
            </div>
          </motion.div>

          {/* Card 3: Couple Walking Arm-in-Arm */}
          <motion.div
            whileHover={{ y: -6 }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              boxShadow: '0 12px 30px rgba(60, 40, 25, 0.12)',
              background: '#FFFFFF',
              border: '1px solid rgba(212, 175, 55, 0.25)',
            }}
          >
            <div style={{ height: '380px', overflow: 'hidden' }}>
              <img
                src={weddingConfig.couplePhotoUrl}
                alt="Together Forever"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 80%',
                }}
              />
            </div>
            <div style={{ padding: '18px 20px', textAlign: 'center' }}>
              <p
                style={{
                  fontFamily: 'var(--font-serif-luxury)',
                  fontSize: '1.25rem',
                  color: '#34251D',
                  fontStyle: 'italic',
                }}
              >
                "Walking into our forever"
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          4. EVENTS & LOCATION SECTION (EVENTS)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="events"
        style={{
          padding: '90px 24px',
          background: 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #F5ECE0 100%)',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#A37E30',
              marginBottom: '10px',
            }}
          >
            JOIN US IN CELEBRATION
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              color: '#34251D',
              marginBottom: '32px',
            }}
          >
            Wedding Date &amp; Location
          </h2>

          {/* Countdown Timer Grid */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '40px',
              flexWrap: 'wrap',
            }}
          >
            <div className="countdown-box">
              <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '2rem', fontWeight: 600, color: '#3A2E25' }}>
                {timeLeft.days}
              </span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Days</span>
            </div>
            <div className="countdown-box">
              <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '2rem', fontWeight: 600, color: '#3A2E25' }}>
                {timeLeft.hours}
              </span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Hours</span>
            </div>
            <div className="countdown-box">
              <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '2rem', fontWeight: 600, color: '#3A2E25' }}>
                {timeLeft.minutes}
              </span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Mins</span>
            </div>
            <div className="countdown-box">
              <span style={{ display: 'block', fontFamily: 'var(--font-serif-luxury)', fontSize: '2rem', fontWeight: 600, color: '#A37E30' }}>
                {timeLeft.seconds}
              </span>
              <span style={{ fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#827468' }}>Secs</span>
            </div>
          </div>

          {/* Schedule Details Card */}
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '20px',
              padding: '36px 28px',
              boxShadow: '0 12px 36px rgba(60, 40, 20, 0.08)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              marginBottom: '36px',
            }}
          >
            <h3
              style={{
                fontFamily: 'var(--font-serif-luxury)',
                fontSize: '2rem',
                color: '#A37E30',
                marginBottom: '6px',
              }}
            >
              {weddingConfig.schedule.displayDate}
            </h3>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '0.9rem', color: '#6E6054', letterSpacing: '0.1em', marginBottom: '24px' }}>
              {weddingConfig.schedule.dayOfWeek} at {weddingConfig.schedule.time}
            </p>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                gap: '20px',
                textAlign: 'left',
              }}
            >
              <div style={{ background: '#FAF7F2', padding: '20px', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <Clock style={{ color: '#A37E30', marginBottom: '8px' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.15em', color: '#382D25' }}>TIMING</h4>
                <p style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.2rem', color: '#A37E30', marginTop: '4px' }}>
                  {weddingConfig.schedule.time}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#7E7064', marginTop: '4px' }}>
                  Sacred Ceremony followed by Reception
                </p>
              </div>

              <div style={{ background: '#FAF7F2', padding: '20px', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.2)' }}>
                <MapPin style={{ color: '#A37E30', marginBottom: '8px' }} />
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.15em', color: '#382D25' }}>LOCATION</h4>
                <p style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.2rem', color: '#382D25', marginTop: '4px', fontWeight: 600 }}>
                  {weddingConfig.venue.name}
                </p>
                <p style={{ fontSize: '0.78rem', color: '#7E7064', marginTop: '4px' }}>
                  {weddingConfig.venue.streetAddress}, {weddingConfig.venue.cityStateZip}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px', margin: '0 auto' }}>
            <a
              href={weddingConfig.venue.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              <MapPin size={18} />
              <span>VIEW LOCATION ON GOOGLE MAPS</span>
              <ExternalLink size={14} />
            </a>

            <a
              href={`https://wa.me/${weddingConfig.rsvp.whatsappNumber}?text=${encodeURIComponent(weddingConfig.rsvp.defaultMessageTemplate)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{
                width: '100%',
                padding: '16px',
                background: 'linear-gradient(135deg, #2E7D32 0%, #1B5E20 100%)',
              }}
            >
              <MessageCircle size={18} />
              <span>RSVP VIA WHATSAPP</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          5. GUEST BLESSINGS & WISHES SECTION (BLESSINGS)
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section
        id="blessings"
        style={{
          padding: '90px 24px',
          maxWidth: '900px',
          margin: '0 auto',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '0.78rem',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#A37E30',
              marginBottom: '10px',
            }}
          >
            GUESTBOOK &amp; WISHES
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              color: '#34251D',
            }}
          >
            Leave Your Blessings
          </h2>
          <p style={{ fontSize: '0.9rem', color: '#736559', marginTop: '6px' }}>
            Share your love &amp; warm wishes for Jananee &amp; Arivannal
          </p>
          <div style={{ marginTop: '16px' }}>
            <button
              type="button"
              onClick={downloadExcelSheet}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                borderRadius: '999px',
                background: 'rgba(212, 175, 55, 0.12)',
                border: '1px solid rgba(212, 175, 55, 0.5)',
                color: '#8C6A28',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.78rem',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
            >
              <span>📊 Download Blessings Excel Sheet (.csv)</span>
            </button>
          </div>
        </div>


        {/* Leave a Blessing Form */}
        <form
          onSubmit={handleAddBlessing}
          style={{
            background: '#FFFFFF',
            borderRadius: '20px',
            padding: '32px 24px',
            boxShadow: '0 12px 30px rgba(60, 40, 20, 0.08)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            marginBottom: '48px',
          }}
        >
          <div style={{ marginBottom: '18px' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: '#382D25',
                marginBottom: '8px',
              }}
            >
              YOUR NAME
            </label>
            <input
              type="text"
              required
              value={guestName}
              onChange={(e) => setGuestName(e.target.value)}
              placeholder="e.g. Rahul & Priya"
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: '#FAF7F2',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: '#34251D',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '22px' }}>
            <label
              style={{
                display: 'block',
                fontFamily: 'var(--font-heading)',
                fontSize: '0.75rem',
                letterSpacing: '0.15em',
                color: '#382D25',
                marginBottom: '8px',
              }}
            >
              YOUR BLESSINGS &amp; WISHES
            </label>
            <textarea
              required
              rows={4}
              value={guestMessage}
              onChange={(e) => setGuestMessage(e.target.value)}
              placeholder="Write a warm message for the couple..."
              style={{
                width: '100%',
                padding: '14px 16px',
                borderRadius: '10px',
                border: '1px solid rgba(212, 175, 55, 0.4)',
                background: '#FAF7F2',
                fontFamily: 'var(--font-sans)',
                fontSize: '0.9rem',
                color: '#34251D',
                outline: 'none',
                resize: 'vertical',
              }}
            />
          </div>

          <button type="submit" className="btn-gold" style={{ width: '100%', padding: '14px' }}>
            <Send size={16} />
            <span>{submittedBlessing ? 'BLESSING SENT! ❤️' : 'SEND BLESSING'}</span>
          </button>
        </form>

        {/* Guest Blessings Stream */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
          {blessings.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                padding: '22px',
                border: '1px solid rgba(212, 175, 55, 0.25)',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h4 style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.25rem', color: '#34251D', fontWeight: 600 }}>
                  {b.name}
                </h4>
                <span style={{ fontSize: '0.75rem', color: '#9B8C80' }}>{b.date}</span>
              </div>
              <p style={{ fontSize: '0.88rem', color: '#65574E', lineHeight: 1.6, fontStyle: 'italic' }}>
                "{b.message}"
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
          6. FOOTER
         ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <footer
        style={{
          padding: '48px 24px',
          textAlign: 'center',
          background: '#251A14',
          color: '#FFFDF9',
          borderTop: '1px solid rgba(212, 175, 55, 0.3)',
        }}
      >
        <p style={{ fontFamily: 'var(--font-script)', fontSize: '2.8rem', color: '#D4AF37', marginBottom: '4px' }}>
          Jananee &amp; Arivannal
        </p>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.22em', color: '#C5A059' }}>
          {weddingConfig.couple.hashtag}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#8A7C72', marginTop: '18px' }}>
          September 17, 2026 • Made with ❤️
        </p>
      </footer>
    </div>
  );
};
