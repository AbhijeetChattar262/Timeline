/**
 * Mahabharat era — the first concrete "skin" for the era engine.
 * Direction: an aged palm-leaf/parchment scroll, not a night sky — warm
 * tan-and-ochre paper, sepia ink, and a reddish-orange/vermillion accent
 * (sacred fire, sindoor, turmeric). Dark mode is firelight on old leather,
 * deliberately kept out of blue entirely — indigo reads too modern for this
 * era. Every future era gets its own file like this one; no component or
 * route should hardcode these values.
 */
export const mahabharatTheme = {
  eraSlug: "mahabharat",
  palette: {
    dark: {
      bg: "#241507",
      bgRaised: "#301d0d",
      ink: "#f0dfae",
      muted: "#b08e5a",
      accent: "#e0723a",
      rule: "rgba(240, 223, 174, 0.18)",
    },
    light: {
      bg: "#e8d9ab",
      bgRaised: "#f6ecc9",
      ink: "#2e1f0f",
      muted: "#7a5f3d",
      accent: "#b8451f",
      rule: "rgba(46, 31, 15, 0.22)",
    },
  },
  typography: {
    display: '"Iowan Old Style", "Palatino Linotype", Palatino, Georgia, serif',
    body: 'Georgia, "Times New Roman", serif',
    utility: 'ui-monospace, "Cascadia Code", "SF Mono", monospace',
  },
  motif: {
    texture: "radial-gradient(ellipse at top, rgba(184, 69, 31, 0.12), transparent 60%)",
    dividerStyle: "carved",
    paperLight: "/assets/textures/parchment-light.jpg",
    paperDark: "/assets/textures/parchment-dark.jpg",
    cover: "/assets/textures/nautical-map.webp",
  },
  navMetaphor: "turning a palm-leaf manuscript folio, chapter by chapter",
  heroTreatment:
    "Kurukshetra's field at dusk, an old scroll unrolled to the moment Krishna's chariot takes the center",
};
