// Utility helper for resolving website logos, favicons, and production screenshots

export const extractCleanDomain = (rawUrl) => {
  if (!rawUrl) return '';
  try {
    let clean = rawUrl.trim();
    if (!/^https?:\/\//i.test(clean)) {
      clean = `https://${clean}`;
    }
    const parsed = new URL(clean);
    return parsed.hostname.replace(/^www\./i, '').toLowerCase();
  } catch {
    return rawUrl
      .replace(/^https?:\/\//i, '')
      .replace(/^www\./i, '')
      .split('/')[0]
      .split('?')[0]
      .toLowerCase();
  }
};

export const getInitials = (name = '') => {
  if (!name) return 'UI';
  const clean = name.replace(/[^a-zA-Z0-9 ]/g, '').trim();
  const words = clean.split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase();
  }
  return clean.slice(0, 2).toUpperCase();
};

// Verified high-definition icon maps for popular domains
const KNOWN_BRAND_LOGOS = {
  'youtube.com': 'https://www.youtube.com/s/desktop/f17293b6/img/favicon_144x144.png',
  'stripe.com': 'https://unavatar.io/stripe.com',
  'apple.com': 'https://www.apple.com/favicon.ico',
  'spotify.com': 'https://open.spotifycdn.com/cdn/images/favicon.0f31d2ea.ico',
  'github.com': 'https://github.githubassets.com/favicons/favicon.png',
  'vercel.com': 'https://assets.vercel.com/image/upload/front/favicon/vercel/180x180.png',
  'linear.app': 'https://unavatar.io/linear.app',
  'airbnb.com': 'https://a0.muscache.com/airbnb/static/icons/apple-touch-icon-180x180-2.png',
};

export const getLogoCandidates = (url) => {
  const domain = extractCleanDomain(url);
  if (!domain) return [];

  const candidates = [];

  // 1. Direct verified brand map
  if (KNOWN_BRAND_LOGOS[domain]) {
    candidates.push(KNOWN_BRAND_LOGOS[domain]);
  }

  // 2. Unavatar service (aggregates Twitter, Clearbit, GitHub, Devicon, Google)
  candidates.push(`https://unavatar.io/${domain}`);

  // 3. Google High-Res S2 Favicon (128x128)
  candidates.push(`https://www.google.com/s2/favicons?domain=${domain}&sz=128`);

  // 4. DuckDuckGo Icon service
  candidates.push(`https://icons.duckduckgo.com/ip3/${domain}.ico`);

  // Remove duplicates
  return Array.from(new Set(candidates));
};

export const getScreenshotUrl = (url, width = 1280, height = 800) => {
  if (!url) return '';
  let clean = url.trim();
  if (!/^https?:\/\//i.test(clean)) {
    clean = `https://${clean}`;
  }
  return `https://s0.wp.com/mshots/v1/${encodeURIComponent(clean)}?w=${width}&h=${height}`;
};

export const getFaviconVariants = (url) => {
  const domain = extractCleanDomain(url);
  if (!domain) return [];

  return [
    { size: '128px', url: `https://www.google.com/s2/favicons?domain=${domain}&sz=128`, label: 'HD 128px' },
    { size: '64px', url: `https://www.google.com/s2/favicons?domain=${domain}&sz=64`, label: 'Icon 64px' },
    { size: '32px', url: `https://www.google.com/s2/favicons?domain=${domain}&sz=32`, label: 'Favicon 32px' },
    { size: '16px', url: `https://www.google.com/s2/favicons?domain=${domain}&sz=16`, label: 'Tab 16px' },
  ];
};
