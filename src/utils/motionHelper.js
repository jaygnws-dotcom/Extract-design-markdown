// Motion tokens and animation specifications with distinct per-site physics

import { extractCleanDomain } from './assetHelper.js';

export const PRESET_MOTIONS = {
  'youtube.com': {
    brandName: 'YouTube',
    motionType: 'media-zoom',
    badgeText: 'Snappy Media Zoom & Red Runner',
    personality: 'Grounded buttons with zero vertical float, high-speed thumbnail scale, and signature red runner.',
    easings: {
      standard: 'cubic-bezier(0.05, 0, 0, 1)',
      entrance: 'cubic-bezier(0, 0, 0.2, 1)',
      hover: 'cubic-bezier(0.05, 0, 0, 1)',
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    durations: {
      instant: '80ms',
      fast: '140ms',
      normal: '200ms',
      slow: '320ms',
    },
    buttonHover: {
      transform: 'scale(1.04)',
      backgroundColor: '#CC0000',
      boxShadow: '0 4px 16px rgba(255, 0, 0, 0.35)',
    },
    buttonActive: {
      transform: 'scale(0.96)',
    },
    cardHover: {
      transform: 'scale(1.03)',
      boxShadow: '0 12px 32px rgba(0, 0, 0, 0.35)',
      borderColor: '#3F3F3F',
    },
    chipHover: {
      backgroundColor: '#3F3F3F',
      color: '#FFFFFF',
      transform: 'scale(1.03)',
    },
    scroll: {
      name: 'Rapid Shelf Pop-In',
      description: 'Zero vertical drift; items emerge with instantaneous opacity pop.',
      stagger: '30ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: scale(0.94); }
        to { opacity: 1; transform: scale(1); }
      }
      @keyframes siteShimmer {
        0% { opacity: 1; }
        50% { opacity: 0.45; }
        100% { opacity: 1; }
      }
    `,
    loading: {
      name: 'Signature YouTube Red Runner',
      description: 'Continuous top red progress runner with deep dark card opacity pulse.',
      progressColor: '#FF0000',
      shimmerGradient: 'linear-gradient(90deg, #272727 0%, #383838 50%, #272727 100%)',
      shimmerAnimation: 'siteShimmer 1.4s ease-in-out infinite',
    },
  },

  'stripe.com': {
    brandName: 'Stripe',
    motionType: 'magnetic-lift',
    badgeText: 'Magnetic 3D Elevation & Fluid Decel',
    personality: 'Iconic vertical float with deep ambient blurple shadow bloom and ultra-smooth cubic-bezier deceleration.',
    easings: {
      standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
      entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      hover: 'cubic-bezier(0.16, 1, 0.3, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    durations: {
      instant: '120ms',
      fast: '200ms',
      normal: '300ms',
      slow: '500ms',
    },
    buttonHover: {
      transform: 'translateY(-3px)',
      backgroundColor: '#7A73FF',
      boxShadow: '0 10px 25px -4px rgba(99, 91, 255, 0.5), 0 4px 10px -2px rgba(0, 0, 0, 0.12)',
    },
    buttonActive: {
      transform: 'translateY(0)',
      boxShadow: '0 2px 6px rgba(99, 91, 255, 0.25)',
    },
    cardHover: {
      transform: 'translateY(-7px)',
      boxShadow: '0 20px 40px -10px rgba(50, 50, 93, 0.25), 0 12px 24px -10px rgba(0, 0, 0, 0.2)',
      borderColor: '#635BFF',
    },
    chipHover: {
      transform: 'translateY(-2px)',
      borderColor: '#635BFF',
      color: '#635BFF',
      boxShadow: '0 4px 12px rgba(99, 91, 255, 0.15)',
    },
    scroll: {
      name: 'Staggered Fluid Glide',
      description: 'Extended 500ms deceleration curve giving cards a floating inertia.',
      stagger: '60ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: translateY(28px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes siteShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
    loading: {
      name: 'Luminous Blurple Shimmer',
      description: 'Mesh gradient light sweep across surface containers.',
      progressColor: '#635BFF',
      shimmerGradient: 'linear-gradient(90deg, #F6F9FC 0%, #D8E2FC 50%, #F6F9FC 100%)',
      shimmerAnimation: 'siteShimmer 1.8s infinite linear',
    },
  },

  'apple.com': {
    brandName: 'Apple',
    motionType: 'spring-scale',
    badgeText: 'Tactile Spring Physics & Soft Squircle Zoom',
    personality: 'Fluid iOS/macOS spring curves, squircle zoom, and frosted glass illumination with gentle damping.',
    easings: {
      standard: 'cubic-bezier(0.32, 0.72, 0, 1)',
      entrance: 'cubic-bezier(0.25, 1, 0.5, 1)',
      hover: 'cubic-bezier(0.32, 0.72, 0, 1)',
      bounce: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
    },
    durations: {
      instant: '100ms',
      fast: '220ms',
      normal: '340ms',
      slow: '550ms',
    },
    buttonHover: {
      transform: 'scale(1.04)',
      backgroundColor: '#0077ED',
      boxShadow: '0 6px 20px rgba(0, 113, 227, 0.35)',
    },
    buttonActive: {
      transform: 'scale(0.97)',
    },
    cardHover: {
      transform: 'scale(1.03)',
      boxShadow: '0 16px 40px rgba(0, 0, 0, 0.14)',
      borderColor: '#D2D2D7',
    },
    chipHover: {
      transform: 'scale(1.04)',
      backgroundColor: '#E5E5EA',
      color: '#1D1D1F',
    },
    scroll: {
      name: 'Kinetic Spring Pop-In',
      description: 'Elements expand smoothly from scale(0.9) to scale(1.0) with fluid spring physics.',
      stagger: '50ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: scale(0.9) translateY(12px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes siteShimmer {
        0%, 100% { opacity: 0.95; }
        50% { opacity: 0.45; }
      }
    `,
    loading: {
      name: 'Monochrome Glass Breathe',
      description: 'Gentle opacity breathing pulse reminiscent of Apple device boot states.',
      progressColor: '#0071E3',
      shimmerGradient: 'linear-gradient(90deg, #F5F5F7 0%, #E5E5E7 50%, #F5F5F7 100%)',
      shimmerAnimation: 'siteShimmer 2s ease-in-out infinite',
    },
  },

  'linear.app': {
    brandName: 'Linear',
    motionType: 'neon-glow',
    badgeText: 'Keyboard-First Neon Glow & Zero Float',
    personality: 'Zero vertical lift; focuses strictly on electric purple perimeter neon bloom and snappy dark transitions.',
    easings: {
      standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
      entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      hover: 'cubic-bezier(0.16, 1, 0.3, 1)',
      bounce: 'cubic-bezier(0.2, 1.4, 0.4, 1)',
    },
    durations: {
      instant: '70ms',
      fast: '130ms',
      normal: '190ms',
      slow: '340ms',
    },
    buttonHover: {
      transform: 'none',
      backgroundColor: '#6A76E5',
      boxShadow: '0 0 0 1px #5E6AD2, 0 0 28px rgba(94, 106, 210, 0.65)',
    },
    buttonActive: {
      transform: 'scale(0.98)',
      boxShadow: '0 0 12px rgba(94, 106, 210, 0.4)',
    },
    cardHover: {
      transform: 'none',
      borderColor: '#5E6AD2',
      boxShadow: '0 0 0 1px #5E6AD2, 0 8px 32px rgba(94, 106, 210, 0.25)',
      backgroundColor: '#161A23',
    },
    chipHover: {
      borderColor: '#5E6AD2',
      color: '#FFFFFF',
      boxShadow: '0 0 14px rgba(94, 106, 210, 0.4)',
    },
    scroll: {
      name: 'Cyber Blade Blur Wipe',
      description: 'Instant micro-entry combined with sharp boundary illumination.',
      stagger: '20ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; filter: blur(4px); transform: translateY(8px); }
        to { opacity: 1; filter: blur(0px); transform: translateY(0); }
      }
      @keyframes siteShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
    loading: {
      name: 'Obsidian Dark Cyber Shimmer',
      description: 'Luminous metallic hairline highlight gliding across dark containers.',
      progressColor: '#5E6AD2',
      shimmerGradient: 'linear-gradient(90deg, #12151C 0%, #2A3042 50%, #12151C 100%)',
      shimmerAnimation: 'siteShimmer 1.5s infinite linear',
    },
  },

  'vercel.com': {
    brandName: 'Vercel',
    motionType: 'monochrome-flash',
    badgeText: 'Razor-Sharp Monochrome & Terminal Speed',
    personality: 'Ultra-fast 100ms durations, 1px white border stroke illumination, and strict zero-blur developer minimalism.',
    easings: {
      standard: 'cubic-bezier(0, 0, 0.2, 1)',
      entrance: 'cubic-bezier(0, 0, 0.2, 1)',
      hover: 'cubic-bezier(0, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.3, 1.3, 0.5, 1)',
    },
    durations: {
      instant: '50ms',
      fast: '100ms',
      normal: '160ms',
      slow: '260ms',
    },
    buttonHover: {
      transform: 'none',
      backgroundColor: '#262626',
      color: '#FFFFFF',
      boxShadow: '0 0 0 2px #FFFFFF',
    },
    buttonActive: {
      transform: 'scale(0.98)',
    },
    cardHover: {
      transform: 'none',
      borderColor: '#FFFFFF',
      boxShadow: '0 0 0 1px #FFFFFF, 0 8px 24px rgba(0, 0, 0, 0.5)',
    },
    chipHover: {
      borderColor: '#FFFFFF',
      backgroundColor: '#000000',
      color: '#FFFFFF',
    },
    scroll: {
      name: 'Instant Terminal Blink Stagger',
      description: 'Sub-160ms razor entry mimicking command line responses.',
      stagger: '15ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: translateY(6px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes siteShimmer {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.3; }
      }
    `,
    loading: {
      name: 'Terminal Blinking Cursor Pulse',
      description: 'High-contrast monochrome hairline pulse.',
      progressColor: '#0070F3',
      shimmerGradient: 'linear-gradient(90deg, #111111 0%, #333333 50%, #111111 100%)',
      shimmerAnimation: 'siteShimmer 1.2s infinite ease-in-out',
    },
  },

  'github.com': {
    brandName: 'GitHub',
    motionType: 'tactile-press',
    badgeText: 'Primer Utilitarian Press & Code Density',
    personality: 'Tactile inset shadow shifts, commit green color switches, and minimal displacement tailored for code diff density.',
    easings: {
      standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
      entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      hover: 'cubic-bezier(0.2, 0, 0, 1)',
      bounce: 'cubic-bezier(0.2, 1.2, 0.4, 1)',
    },
    durations: {
      instant: '75ms',
      fast: '120ms',
      normal: '190ms',
      slow: '300ms',
    },
    buttonHover: {
      transform: 'translateY(-1px)',
      backgroundColor: '#2C974B',
      boxShadow: '0 3px 8px rgba(35, 134, 54, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    buttonActive: {
      transform: 'translateY(1px)',
      boxShadow: 'inset 0 1px 2px rgba(0, 0, 0, 0.2)',
    },
    cardHover: {
      transform: 'translateY(-2px)',
      borderColor: '#0969DA',
      boxShadow: '0 6px 18px rgba(1, 4, 9, 0.1)',
    },
    chipHover: {
      backgroundColor: '#1F2328',
      color: '#FFFFFF',
      borderColor: '#8C959F',
    },
    scroll: {
      name: 'Primer Dense Row Stagger',
      description: 'Compact 8px glide engineered for massive table/repository listings.',
      stagger: '25ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes siteShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
    loading: {
      name: 'Primer Commit Green Pulse',
      description: 'Utilitarian neutral skeleton with commit green branch progress bar.',
      progressColor: '#238636',
      shimmerGradient: 'linear-gradient(90deg, #F6F8FA 0%, #E2E8F0 50%, #F6F8FA 100%)',
      shimmerAnimation: 'siteShimmer 1.6s infinite linear',
    },
  },

  'spotify.com': {
    brandName: 'Spotify',
    motionType: 'play-pop',
    badgeText: 'Energetic Play Pop & Glowing Green Bloom',
    personality: 'Dynamic play button expansion scale(1.08) with luminous radial Spotify green glow and album drop shadow depth.',
    easings: {
      standard: 'cubic-bezier(0.3, 0, 0, 1)',
      entrance: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      hover: 'cubic-bezier(0.3, 0, 0, 1)',
      bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    },
    durations: {
      instant: '90ms',
      fast: '160ms',
      normal: '240ms',
      slow: '380ms',
    },
    buttonHover: {
      transform: 'scale(1.08)',
      backgroundColor: '#1ED760',
      boxShadow: '0 0 32px rgba(29, 185, 84, 0.65), 0 4px 12px rgba(0, 0, 0, 0.3)',
    },
    buttonActive: {
      transform: 'scale(0.96)',
    },
    cardHover: {
      transform: 'translateY(-6px)',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.7)',
      backgroundColor: '#282828',
    },
    chipHover: {
      backgroundColor: '#FFFFFF',
      color: '#000000',
      transform: 'scale(1.05)',
    },
    scroll: {
      name: 'Album Pop-In Bounce',
      description: 'Playful pop-in with slight spring overshoot.',
      stagger: '35ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: scale(0.92) translateY(14px); }
        to { opacity: 1; transform: scale(1) translateY(0); }
      }
      @keyframes siteShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
    loading: {
      name: 'Equalizer Glow & Charcoal Shimmer',
      description: 'Vibrant green progress tracker with deep charcoal surface pulse.',
      progressColor: '#1DB954',
      shimmerGradient: 'linear-gradient(90deg, #181818 0%, #303030 50%, #181818 100%)',
      shimmerAnimation: 'siteShimmer 1.6s infinite linear',
    },
  },

  'airbnb.com': {
    brandName: 'Airbnb',
    motionType: 'editorial-glide',
    badgeText: 'Warm Editorial Glide & Search Pill Expansion',
    personality: 'Soft vertical glide, rounded pill expansion scale(1.03), and warm Rausch coral halo glow.',
    easings: {
      standard: 'cubic-bezier(0.2, 0, 0, 1)',
      entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
      hover: 'cubic-bezier(0.2, 0, 0, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
    durations: {
      instant: '100ms',
      fast: '180ms',
      normal: '260ms',
      slow: '420ms',
    },
    buttonHover: {
      transform: 'scale(1.03)',
      backgroundColor: '#E00B41',
      boxShadow: '0 8px 24px rgba(255, 56, 92, 0.35)',
    },
    buttonActive: {
      transform: 'scale(0.97)',
    },
    cardHover: {
      transform: 'translateY(-4px)',
      boxShadow: '0 14px 28px rgba(0, 0, 0, 0.12)',
    },
    chipHover: {
      transform: 'scale(1.03)',
      borderColor: '#222222',
      color: '#222222',
    },
    scroll: {
      name: 'Airy Editorial Fade Up',
      description: 'Generous 24px vertical ascent with gentle decelerating float.',
      stagger: '40ms',
    },
    keyframes: `
      @keyframes siteEntrance {
        from { opacity: 0; transform: translateY(24px); }
        to { opacity: 1; transform: translateY(0); }
      }
      @keyframes siteShimmer {
        0% { background-position: -200% 0; }
        100% { background-position: 200% 0; }
      }
    `,
    loading: {
      name: 'Warm Rausch Coral Shimmer',
      description: 'Warm mist shimmer with Rausch coral loading pulse.',
      progressColor: '#FF385C',
      shimmerGradient: 'linear-gradient(90deg, #F7F7F7 0%, #EBEBEB 50%, #F7F7F7 100%)',
      shimmerAnimation: 'siteShimmer 1.8s infinite linear',
    },
  },
};

// Procedural generator that deterministically produces distinct animation physics for arbitrary custom domains
export const getSiteMotionTokens = (url, name = 'Website', primaryColor = '#2563EB') => {
  const domain = extractCleanDomain(url);

  // 1. Direct preset match
  if (PRESET_MOTIONS[domain]) {
    return PRESET_MOTIONS[domain];
  }

  // 2. Synthesize distinct motion profile based on domain name hash
  let hash = 0;
  for (let i = 0; i < domain.length; i++) {
    hash = domain.charCodeAt(i) + ((hash << 5) - hash);
  }
  const absHash = Math.abs(hash);

  const MOTION_PROFILES = [
    {
      motionType: 'magnetic-lift',
      badgeText: 'Magnetic Elevation & Luminous Float',
      personality: `High-elevation float with layered depth shadow and smooth deceleration.`,
      easings: {
        standard: 'cubic-bezier(0.16, 1, 0.3, 1)',
        entrance: 'cubic-bezier(0.16, 1, 0.3, 1)',
        hover: 'cubic-bezier(0.16, 1, 0.3, 1)',
        bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      durations: { instant: '110ms', fast: '180ms', normal: '270ms', slow: '440ms' },
      buttonHover: {
        transform: 'translateY(-3px)',
        boxShadow: `0 10px 24px -2px ${primaryColor}55`,
      },
      buttonActive: { transform: 'translateY(0)' },
      cardHover: {
        transform: 'translateY(-6px)',
        boxShadow: `0 18px 36px -6px ${primaryColor}25, 0 6px 14px rgba(0,0,0,0.06)`,
        borderColor: primaryColor,
      },
      chipHover: { transform: 'translateY(-2px)', borderColor: primaryColor, color: primaryColor },
      scroll: { name: 'Elevated Float Entrance', description: 'Smooth 20px upward translation with damping.', stagger: '45ms' },
      keyframes: `
        @keyframes siteEntrance { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes siteShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `,
    },
    {
      motionType: 'spring-scale',
      badgeText: 'Fluid Spring Scale & Ambient Glow',
      personality: `Energetic spring scaling with radial focus bloom.`,
      easings: {
        standard: 'cubic-bezier(0.32, 0.72, 0, 1)',
        entrance: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
        hover: 'cubic-bezier(0.32, 0.72, 0, 1)',
        bounce: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
      durations: { instant: '90ms', fast: '160ms', normal: '240ms', slow: '380ms' },
      buttonHover: {
        transform: 'scale(1.05)',
        boxShadow: `0 0 24px ${primaryColor}60`,
      },
      buttonActive: { transform: 'scale(0.96)' },
      cardHover: {
        transform: 'scale(1.025)',
        boxShadow: `0 14px 32px rgba(0,0,0,0.1)`,
        borderColor: primaryColor,
      },
      chipHover: { transform: 'scale(1.05)', borderColor: primaryColor },
      scroll: { name: 'Kinetic Pop-In', description: 'Components expand dynamically from scale(0.92).', stagger: '35ms' },
      keyframes: `
        @keyframes siteEntrance { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
        @keyframes siteShimmer { 0% { background-position: -200% 0; } 100% { background-position: 200% 0; } }
      `,
    },
    {
      motionType: 'monochrome-flash',
      badgeText: 'Snappy Border Stroke & Zero-Float Speed',
      personality: `High-velocity 100ms transitions with sharp outline illumination.`,
      easings: {
        standard: 'cubic-bezier(0, 0, 0.2, 1)',
        entrance: 'cubic-bezier(0, 0, 0.2, 1)',
        hover: 'cubic-bezier(0, 0, 0.2, 1)',
        bounce: 'cubic-bezier(0.2, 1.2, 0.4, 1)',
      },
      durations: { instant: '60ms', fast: '110ms', normal: '170ms', slow: '280ms' },
      buttonHover: {
        transform: 'none',
        boxShadow: `0 0 0 2px ${primaryColor}`,
      },
      buttonActive: { transform: 'scale(0.98)' },
      cardHover: {
        transform: 'none',
        borderColor: primaryColor,
        boxShadow: `0 0 0 1px ${primaryColor}, 0 6px 20px rgba(0,0,0,0.12)`,
      },
      chipHover: { borderColor: primaryColor, color: primaryColor },
      scroll: { name: 'Near-Instant Terminal Entry', description: 'Fast 140ms vertical fade.', stagger: '20ms' },
      keyframes: `
        @keyframes siteEntrance { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes siteShimmer { 0%, 100% { opacity: 1; } 50% { opacity: 0.35; } }
      `,
    },
  ];

  const profile = MOTION_PROFILES[absHash % MOTION_PROFILES.length];

  return {
    brandName: name,
    ...profile,
    loading: {
      name: `${name} Brand Shimmer & Progress Runner`,
      description: 'Continuous linear gradient shimmer with branded loading bar.',
      progressColor: primaryColor,
      shimmerGradient: `linear-gradient(90deg, #F8FAFC 0%, ${primaryColor}22 50%, #F8FAFC 100%)`,
      shimmerAnimation: 'siteShimmer 1.6s infinite linear',
    },
  };
};
