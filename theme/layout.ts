/**
 * ============================================================
 *  🎨 Layout System — Pearl FM Mobile App
 * ------------------------------------------------------------
 *  Defines global spacing, radii, card sizes, and elevation
 *  for consistent UI rhythm across all screens.
 * ============================================================
 */

export const LAYOUT = {
  //
  // 🔲 Global horizontal padding
  //
  H_PADDING: 24, // Safe, readable side padding for screens and sections

  //
  // 🧱 Vertical spacing scale (typographic rhythm)
  //
  V_SPACING: {
    xxs: 4,
    xs: 8,
    sm: 12,
    md: 18,
    lg: 24,
    xl: 32,
    xxl: 48, // hero sections or banners
    xxxl: 64, // splash, onboarding, or topmost hero
  },

  //
  // 🧩 Gaps between stacked sections
  //
  SECTION_GAP: 16, // ideal for balanced breathing space

  //
  // 🟠 Border radius system (unified app curvature)
  //
  RADIUS: {
    xs: 4,
    sm: 6,
    md: 10,
    lg: 16,
    xl: 20,
    card: 12, // default for most cards
    button: 24, // pill-like feel for CTA buttons
    image: 14, // smoother rounded image corners
    pill: 50, // full round (avatars, badges)
  },

  //
  // 🃏 Card height presets (used in carousels, programs, etc.)
  //
  CARD: {
    tiny: 100,
    small: 140,
    medium: 180,
    large: 220,
    xlarge: 280, // hero / live stream highlight
  },

  //
  // ⚙️ Elevation presets (consistent shadows)
  //
  ELEVATION: {
    low: {
      shadowColor: "#00000020",
      shadowOpacity: 0.08,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 1,
    },
    medium: {
      shadowColor: "#00000030",
      shadowOpacity: 0.12,
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 4,
      elevation: 3,
    },
    high: {
      shadowColor: "#00000040",
      shadowOpacity: 0.2,
      shadowOffset: { width: 0, height: 6 },
      shadowRadius: 6,
      elevation: 6,
    },
  },

  //
  // 📱 Responsive breakpoints (future-ready)
  //
  BREAKPOINT: {
    mobile: 480,
    tablet: 768,
    desktop: 1024,
  },

  //
  // 💬 Typography rhythm guide
  //
  TYPO: {
    heading: 22,
    subheading: 18,
    body: 15,
    caption: 12,
  },
};
