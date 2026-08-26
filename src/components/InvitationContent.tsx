import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Clock,
  MapPin,
  ExternalLink,
  Share2,
  Menu,
  X,
  Send,
} from 'lucide-react';
import { weddingConfig } from '../config/weddingConfig';
import { submitBlessing, getFeaturedBlessings, Blessing } from '../config/blessings';

export const InvitationContent: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Blessings Guest Book State
  const [blessings, setBlessings] = useState<Blessing[]>([]);
  const [blessingsLoading, setBlessingsLoading] = useState(true);

  // Selected/Expanded Event in "OUR EVENTS" section ('reception' | 'muhurtham' | null)
  const [expandedEvent, setExpandedEvent] = useState<'reception' | 'muhurtham' | null>(null);
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
          title: `${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName} Wedding Invitation`,
          text: `You are warmly invited to celebrate the wedding of ${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}!`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Load featured blessings from Firebase
  useEffect(() => {
    getFeaturedBlessings()
      .then((data) => setBlessings(data))
      .catch(() => {})
      .finally(() => setBlessingsLoading(false));
  }, []);

  const handleAddBlessing = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim() || !guestMessage.trim()) return;
    try {
      await submitBlessing(guestName, guestMessage);
    } catch (e) {
      console.debug(e);
    }
    setGuestName('');
    setGuestMessage('');
    setSubmittedBlessing(true);
    setTimeout(() => setSubmittedBlessing(false), 3500);
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
      {/* -------------------------------------------------
          1. NAVIGATION HEADER (Matching Screenshot 2)
         ------------------------------------------------- */}
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
        {/* Logo Monogram DJ */}
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
          {weddingConfig.couple.monogram}
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

      {/* -------------------------------------------------
          2. HERO HERO BANNER (Matching Screenshot 2 EXACTLY)
         ------------------------------------------------- */}
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
        {/* Dark Warm Mahogany Overlay - subtle so background photo is beautifully visible */}
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
          {/* WITH THE BLESSINGS OF OUR FAMILIES, */}
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
            {weddingConfig.couple.invitationPrefix || 'WITH THE BLESSINGS OF OUR FAMILIES,'}
          </p>

          {/* Dinesshkumar & Jayakavi */}
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
            {weddingConfig.couple.groom.firstName}{' '}
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
            {weddingConfig.couple.bride.firstName}
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
            {/* VIEW SCHEDULE */}
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
              VIEW SCHEDULE
            </button>

            {/* SHARE INVITATION  */}
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

      {/* -------------------------------------------------
          3. MOMENTS SECTION (Matching Screenshot 1 EXACTLY)
         ------------------------------------------------- */}
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
          {/* Card 1 (Left): image copy 2 */}
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
            <div style={{ height: '420px', overflow: 'hidden', background: '#F5ECE0' }}>
              <img
                src={weddingConfig.leftPhotoUrl || '/assets/image_copy_2.png'}
                alt={`${weddingConfig.couple.groom.firstName} & ${weddingConfig.couple.bride.firstName}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
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

          {/* Card 2 (Center): image.png */}
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
            <div style={{ height: '420px', overflow: 'hidden', background: '#F5ECE0' }}>
              <img
                src={weddingConfig.centerPhotoUrl || '/assets/image.png'}
                alt="Sacred Union"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 15%',
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

          {/* Card 3 (Right): image copy 3 */}
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
            <div style={{ height: '420px', overflow: 'hidden', background: '#F5ECE0' }}>
              <img
                src={weddingConfig.rightPhotoUrl || '/assets/image_copy_3.png'}
                alt="Together Forever"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center 5%',
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

      {/* -------------------------------------------------
          4. OUR EVENTS SECTION
         ------------------------------------------------- */}
      <section
        id="events"
        style={{
          padding: '90px 24px',
          background: 'radial-gradient(circle at 50% 30%, #FFFDF8 0%, #F5ECE0 100%)',
          borderTop: '1px solid rgba(212, 175, 55, 0.25)',
          borderBottom: '1px solid rgba(212, 175, 55, 0.25)',
        }}
      >
        <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
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
            CELEBRATE WITH US
          </p>
          <h2
            style={{
              fontFamily: 'var(--font-serif-luxury)',
              fontSize: 'clamp(2.4rem, 6vw, 4rem)',
              color: '#34251D',
              marginBottom: '40px',
              letterSpacing: '0.04em',
            }}
          >
            OUR EVENTS
          </h2>

          {/* TWO MAIN INTERACTIVE EVENT CARDS */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '28px',
              marginBottom: '48px',
            }}
          >
            {/* ---------- CARD 1: - RECEPTION (SEPTEMBER 16) ---------- */}
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(60, 40, 20, 0.18), 0 0 30px rgba(212, 175, 55, 0.22)' }}
              style={{
                background: '#FDFAF4',
                borderRadius: '24px',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                boxShadow: '0 12px 36px rgba(60, 40, 20, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => setExpandedEvent(expandedEvent === 'reception' ? null : 'reception')}
            >
              {/* Gold corner accents */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', width: '22px', height: '22px', borderTop: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37', borderRadius: '4px 0 0 0', opacity: 0.85, zIndex: 5 }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '22px', height: '22px', borderTop: '2px solid #D4AF37', borderRight: '2px solid #D4AF37', borderRadius: '0 4px 0 0', opacity: 0.85, zIndex: 5 }} />

              {/* Full bleed photo */}
              <div style={{ width: '100%', height: '320px', position: 'relative', overflow: 'hidden', borderRadius: '22px 22px 0 0' }}>
                <img
                  src="/assets/reception_card.png"
                  alt="Reception"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(253,250,244,0.92) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Text content below image */}
              <div style={{ padding: '8px 28px 28px', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '14px' }}>
                  <span style={{ height: '1px', flex: 1, background: 'rgba(212,175,55,0.4)' }} />
                  <span style={{ height: '1px', flex: 1, background: 'rgba(212,175,55,0.4)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, letterSpacing: '0.2em', color: '#34251D', marginBottom: '8px' }}>
                  RECEPTION
                </h3>
                <p style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.05rem', color: '#A37E30', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '20px' }}>
                  16 SEPTEMBER 2026
                </p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '999px',
                  background: expandedEvent === 'reception' ? 'linear-gradient(135deg, #C5A059 0%, #A37E30 100%)' : 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  color: expandedEvent === 'reception' ? '#FFFFFF' : '#8C6A28',
                  fontFamily: 'var(--font-heading)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'all 0.3s ease',
                  boxShadow: expandedEvent === 'reception' ? '0 4px 14px rgba(163, 126, 48, 0.4)' : 'none',
                }}>
                  <span>{expandedEvent === 'reception' ? 'HIDE DETAILS' : 'TAP FOR DETAILS'}</span>
                </div>
                <AnimatePresence>
                  {expandedEvent === 'reception' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      style={{ width: '100%', borderTop: '1px solid rgba(212, 175, 55, 0.25)', paddingTop: '20px', marginTop: '20px', textAlign: 'left' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <Clock size={18} style={{ color: '#A37E30', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A7C72' }}>TIME: </span>
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#34251D' }}>7:00 PM Onwards</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <MapPin size={18} style={{ color: '#A37E30', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A7C72' }}>VENUE: </span>
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#34251D' }}>VEL SOKKANATHAN THIRUMANA NILAYAM</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#685A50', lineHeight: 1.5, marginBottom: '16px' }}>
                        Join us for a grand musical evening, greetings & photography on stage, followed by an exquisite celebratory dinner banquet.
                      </p>
                      <a href="https://maps.app.goo.gl/1EC95Lvk3EvRPn3VA" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: '100%', padding: '12px', fontSize: '0.76rem', borderRadius: '8px' }}>
                        <MapPin size={15} />
                        <span>VIEW LOCATION ON GOOGLE MAPS</span>
                        <ExternalLink size={13} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>


            {/* ---------- CARD 2:  MUHURTHAM (SEPTEMBER 17) ---------- */}
            <motion.div
              whileHover={{ y: -6, boxShadow: '0 24px 56px rgba(60, 40, 20, 0.18), 0 0 30px rgba(212, 175, 55, 0.22)' }}
              style={{
                background: '#FDFAF4',
                borderRadius: '24px',
                border: '1.5px solid rgba(212, 175, 55, 0.45)',
                boxShadow: '0 12px 36px rgba(60, 40, 20, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                position: 'relative',
                overflow: 'hidden',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onClick={() => setExpandedEvent(expandedEvent === 'muhurtham' ? null : 'muhurtham')}
            >
              {/* Gold corner accents */}
              <div style={{ position: 'absolute', top: '12px', left: '12px', width: '22px', height: '22px', borderTop: '2px solid #D4AF37', borderLeft: '2px solid #D4AF37', borderRadius: '4px 0 0 0', opacity: 0.85, zIndex: 5 }} />
              <div style={{ position: 'absolute', top: '12px', right: '12px', width: '22px', height: '22px', borderTop: '2px solid #D4AF37', borderRight: '2px solid #D4AF37', borderRadius: '0 4px 0 0', opacity: 0.85, zIndex: 5 }} />

              {/* Full bleed photo */}
              <div style={{ width: '100%', height: '320px', position: 'relative', overflow: 'hidden', borderRadius: '22px 22px 0 0' }}>
                <img
                  src="/assets/muhurtham_card.png"
                  alt="Muhurtham"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center center', display: 'block' }}
                />
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0, height: '55%',
                  background: 'linear-gradient(to bottom, transparent 0%, rgba(253,250,244,0.92) 100%)',
                  pointerEvents: 'none',
                }} />
              </div>

              {/* Text content below image */}
              <div style={{ padding: '8px 28px 28px', width: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', justifyContent: 'center', marginBottom: '14px' }}>
                  <span style={{ height: '1px', flex: 1, background: 'rgba(212,175,55,0.4)' }} />
                  <span style={{ height: '1px', flex: 1, background: 'rgba(212,175,55,0.4)' }} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', fontWeight: 700, letterSpacing: '0.2em', color: '#34251D', marginBottom: '8px' }}>
                  MUHURTHAM
                </h3>
                <p style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.05rem', color: '#A37E30', fontWeight: 600, letterSpacing: '0.1em', marginBottom: '20px' }}>
                  17 SEPTEMBER 2026
                </p>
                <div style={{
                  display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 22px', borderRadius: '999px',
                  background: expandedEvent === 'muhurtham' ? 'linear-gradient(135deg, #C5A059 0%, #A37E30 100%)' : 'rgba(212, 175, 55, 0.12)',
                  border: '1px solid rgba(212, 175, 55, 0.5)',
                  color: expandedEvent === 'muhurtham' ? '#FFFFFF' : '#8C6A28',
                  fontFamily: 'var(--font-heading)', fontSize: '0.76rem', fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', transition: 'all 0.3s ease',
                  boxShadow: expandedEvent === 'muhurtham' ? '0 4px 14px rgba(163, 126, 48, 0.4)' : 'none',
                }}>
                  <span>{expandedEvent === 'muhurtham' ? 'HIDE DETAILS' : 'TAP FOR DETAILS'}</span>
                </div>
                <AnimatePresence>
                  {expandedEvent === 'muhurtham' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.35, ease: 'easeOut' }}
                      style={{ width: '100%', borderTop: '1px solid rgba(212, 175, 55, 0.25)', paddingTop: '20px', marginTop: '20px', textAlign: 'left' }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                        <Clock size={18} style={{ color: '#A37E30', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A7C72' }}>TIME: </span>
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#34251D' }}>8:30 AM - 10:00 AM</span>
                        </div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                        <MapPin size={18} style={{ color: '#A37E30', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: '#8A7C72' }}>VENUE: </span>
                          <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#34251D' }}>VEL SOKKANATHAN THIRUMANA NILAYAM</span>
                        </div>
                      </div>
                      <p style={{ fontSize: '0.85rem', color: '#685A50', lineHeight: 1.5, marginBottom: '16px' }}>
                        The sacred traditional wedding rituals, tying of the sacred knot & feast.
                      </p>
                      <a href="https://maps.app.goo.gl/1EC95Lvk3EvRPn3VA" target="_blank" rel="noopener noreferrer" className="btn-gold" style={{ width: '100%', padding: '12px', fontSize: '0.76rem', borderRadius: '8px' }}>
                        <MapPin size={15} />
                        <span>VIEW LOCATION ON GOOGLE MAPS</span>
                        <ExternalLink size={13} />
                      </a>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Countdown Timer Grid */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '14px',
              marginBottom: '36px',
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

          {/* Action Buttons (Maps only) */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', maxWidth: '480px', margin: '0 auto' }}>
            <a
              href="https://maps.app.goo.gl/1EC95Lvk3EvRPn3VA"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
              style={{ width: '100%', padding: '16px' }}
            >
              <MapPin size={18} />
              <span>VIEW LOCATION ON GOOGLE MAPS</span>
              <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </section>

      {/* -------------------------------------------------
          5. GUEST BLESSINGS & WISHES SECTION (BLESSINGS)
         ------------------------------------------------- */}
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
            Share your love &amp; warm wishes for {weddingConfig.couple.bride.firstName} &amp; {weddingConfig.couple.groom.firstName}
          </p>
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
            <span>{submittedBlessing ? 'BLESSING SENT! -' : 'SEND BLESSING'}</span>
          </button>
        </form>

        {/* - FEATURED BLESSINGS FROM FIREBASE - */}
        {blessingsLoading ? (
          <p style={{ textAlign: 'center', color: '#A37E30', fontFamily: 'var(--font-serif-luxury)', fontSize: '1rem', padding: '24px 0' }}>
            Loading blessings...
          </p>
        ) : blessings.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#9B8C80', fontSize: '0.9rem', padding: '24px 0' }}>
            Be the first to leave a blessing 
          </p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {blessings.map((b, i) => (
              <motion.div
                key={b.id ?? i}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08 }}
                style={{
                  background: 'linear-gradient(135deg, #FFFDF5 0%, #FDF5E2 100%)',
                  borderRadius: '20px',
                  padding: '28px 24px',
                  border: '1.5px solid rgba(212, 175, 55, 0.45)',
                  boxShadow: '0 8px 28px rgba(212,175,55,0.1)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: '3px',
                  background: 'linear-gradient(90deg, #D4AF37, #ECC880, #C5A059)',
                }} />
                <h4 style={{ fontFamily: 'var(--font-serif-luxury)', fontSize: '1.2rem', color: '#34251D', fontWeight: 600, marginBottom: '10px' }}>
                  {b.name}
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#65574E', lineHeight: 1.7, fontStyle: 'italic' }}>
                  "{b.message}"
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* -------------------------------------------------
          6. FOOTER
         ------------------------------------------------- */}
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
          {weddingConfig.couple.groom.firstName} &amp; {weddingConfig.couple.bride.firstName}
        </p>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '0.82rem', letterSpacing: '0.22em', color: '#C5A059' }}>
          {weddingConfig.couple.hashtag}
        </p>
        <p style={{ fontSize: '0.75rem', color: '#8A7C72', marginTop: '18px' }}>
          September 17, 2026 - Made with love
        </p>
      </footer>
    </div>
  );
};
