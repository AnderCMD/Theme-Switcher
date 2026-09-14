import type { ThemeSwitchVariant } from './core/types';

/**
 * Metadata + static decorative markup for one of the 10 built-in toggle
 * designs. `markup` is trusted, hand-authored, static HTML (no user input
 * is ever interpolated into it) rendered as the sibling of the real
 * `<input type="checkbox">` element, matching the CSS selector pattern
 * `.theme-switch__checkbox:checked + .theme-switch__visual …` used by
 * every variant's stylesheet.
 */
export interface VariantDefinition {
  id: ThemeSwitchVariant;
  /** Human-readable name shown in docs/demos. */
  name: string;
  /** One-line description of the visual style. */
  description: string;
  /** File name of the matching stylesheet under `dist/styles/variants/`. */
  cssFile: string;
  /** Static decorative markup rendered next to the checkbox input. */
  markup: string;
}

const SUN_ICON = `
  <svg class="theme-switch__icon theme-switch__icon--sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="5" fill="currentColor" />
    <g stroke="currentColor" stroke-width="2" stroke-linecap="round">
      <path d="M12 1v3M12 20v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M1 12h3M20 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
    </g>
  </svg>
`;

const MOON_ICON = `
  <svg class="theme-switch__icon theme-switch__icon--moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z"
      fill="currentColor"
    />
  </svg>
`;

const SUN_MOON_ICONS = `${SUN_ICON}${MOON_ICON}`;

const PIXEL_SUN = `
  <svg class="theme-switch__icon theme-switch__icon--sun" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">
    <rect x="3" y="0" width="2" height="1" fill="currentColor" />
    <rect x="3" y="7" width="2" height="1" fill="currentColor" />
    <rect x="0" y="3" width="1" height="2" fill="currentColor" />
    <rect x="7" y="3" width="1" height="2" fill="currentColor" />
    <rect x="2" y="2" width="4" height="4" fill="currentColor" />
  </svg>
`;

const PIXEL_MOON = `
  <svg class="theme-switch__icon theme-switch__icon--moon" viewBox="0 0 8 8" shape-rendering="crispEdges" aria-hidden="true">
    <rect x="3" y="1" width="3" height="1" fill="currentColor" />
    <rect x="2" y="2" width="4" height="1" fill="currentColor" />
    <rect x="2" y="3" width="4" height="2" fill="currentColor" />
    <rect x="2" y="5" width="4" height="1" fill="currentColor" />
    <rect x="3" y="6" width="3" height="1" fill="currentColor" />
  </svg>
`;

const STAR_DOTS = `
  <svg class="theme-switch__stars" viewBox="0 0 60 24" fill="none" aria-hidden="true">
    <g class="theme-switch__star-dots" fill="currentColor">
      <circle cx="6" cy="7" r="1.3" />
      <circle cx="16" cy="15" r="1.1" />
      <circle cx="26" cy="6" r="1.4" />
      <circle cx="35" cy="16" r="1" />
      <circle cx="45" cy="8" r="1.3" />
      <circle cx="54" cy="14" r="1.1" />
    </g>
    <path
      class="theme-switch__constellation-lines"
      d="M6 7 16 15 26 6 35 16 45 8 54 14"
      stroke="currentColor"
      stroke-width="0.6"
      stroke-linecap="round"
    />
  </svg>
`;

export const VARIANTS: Record<ThemeSwitchVariant, VariantDefinition> = {
  'classic-sky': {
    id: 'classic-sky',
    name: 'Classic Sky',
    description:
      'Animated day/night sky with drifting clouds, twinkling stars, and a spotted moon.',
    cssFile: 'classic-sky.css',
    markup: `
      <div class="theme-switch__container">
        <div class="theme-switch__clouds"></div>
        <div class="theme-switch__stars-container">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 144 55" fill="none" aria-hidden="true">
            <path
              fill-rule="evenodd"
              clip-rule="evenodd"
              d="M135.831 3.00688C135.055 3.85027 134.111 4.29946 133 4.35447C134.111 4.40947 135.055 4.85867 135.831 5.71123C136.607 6.55462 136.996 7.56303 136.996 8.72727C136.996 7.95722 137.172 7.25134 137.525 6.59129C137.886 5.93124 138.372 5.39954 138.98 5.00535C139.598 4.60199 140.268 4.39114 141 4.35447C139.88 4.2903 138.936 3.85027 138.16 3.00688C137.384 2.16348 136.996 1.16425 136.996 0C136.996 1.16425 136.607 2.16348 135.831 3.00688ZM31 23.3545C32.1114 23.2995 33.0551 22.8503 33.8313 22.0069C34.6075 21.1635 34.9956 20.1642 34.9956 19C34.9956 20.1642 35.3837 21.1635 36.1599 22.0069C36.9361 22.8503 37.8798 23.2903 39 23.3545C38.2679 23.3911 37.5976 23.602 36.9802 24.0053C36.3716 24.3995 35.8864 24.9312 35.5248 25.5913C35.172 26.2513 34.9956 26.9572 34.9956 27.7273C34.9956 26.563 34.6075 25.5546 33.8313 24.7112C33.0551 23.8587 32.1114 23.4095 31 23.3545ZM0 36.3545C1.11136 36.2995 2.05513 35.8503 2.83131 35.0069C3.6075 34.1635 3.99559 33.1642 3.99559 32C3.99559 33.1642 4.38368 34.1635 5.15987 35.0069C5.93605 35.8503 6.87982 36.2903 8 36.3545C7.26792 36.3911 6.59757 36.602 5.98015 37.0053C5.37155 37.3995 4.88644 37.9312 4.52481 38.5913C4.172 39.2513 3.99559 39.9572 3.99559 40.7273C3.99559 39.563 3.6075 38.5546 2.83131 37.7112C2.05513 36.8587 1.11136 36.4095 0 36.3545ZM56.8313 24.0069C56.0551 24.8503 55.1114 25.2995 54 25.3545C55.1114 25.4095 56.0551 25.8587 56.8313 26.7112C57.6075 27.5546 57.9956 28.563 57.9956 29.7273C57.9956 28.9572 58.172 28.2513 58.5248 27.5913C58.8864 26.9312 59.3716 26.3995 59.9802 26.0053C60.5976 25.602 61.2679 25.3911 62 25.3545C60.8798 25.2903 59.9361 24.8503 59.1599 24.0069C58.3837 23.1635 57.9956 22.1642 57.9956 21C57.9956 22.1642 57.6075 23.1635 56.8313 24.0069ZM81 25.3545C82.1114 25.2995 83.0551 24.8503 83.8313 24.0069C84.6075 23.1635 84.9956 22.1642 84.9956 21C84.9956 22.1642 85.3837 23.1635 86.1599 24.0069C86.9361 24.8503 87.8798 25.2903 89 25.3545C88.2679 25.3911 87.5976 25.602 86.9802 26.0053C86.3716 26.3995 85.8864 26.9312 85.5248 27.5913C85.172 28.2513 84.9956 28.9572 84.9956 29.7273C84.9956 28.563 84.6075 27.5546 83.8313 26.7112C83.0551 25.8587 82.1114 25.4095 81 25.3545ZM136 36.3545C137.111 36.2995 138.055 35.8503 138.831 35.0069C139.607 34.1635 139.996 33.1642 139.996 32C139.996 33.1642 140.384 34.1635 141.16 35.0069C141.936 35.8503 142.88 36.2903 144 36.3545C143.268 36.3911 142.598 36.602 141.98 37.0053C141.372 37.3995 140.886 37.9312 140.525 38.5913C140.172 39.2513 139.996 39.9572 139.996 40.7273C139.996 39.563 139.607 38.5546 138.831 37.7112C138.055 36.8587 137.111 36.4095 136 36.3545ZM101.831 49.0069C101.055 49.8503 100.111 50.2995 99 50.3545C100.111 50.4095 101.055 50.8587 101.831 51.7112C102.607 52.5546 102.996 53.563 102.996 54.7273C102.996 53.9572 103.172 53.2513 103.525 52.5913C103.886 51.9312 104.372 51.3995 104.98 51.0053C105.598 50.602 106.268 50.3911 107 50.3545C105.88 50.2903 104.936 49.8503 104.16 49.0069C103.384 48.1635 102.996 47.1642 102.996 46C102.996 47.1642 102.607 48.1635 101.831 49.0069Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <div class="theme-switch__circle-container">
          <div class="theme-switch__sun-moon-container">
            <div class="theme-switch__moon">
              <div class="theme-switch__spot"></div>
              <div class="theme-switch__spot"></div>
              <div class="theme-switch__spot"></div>
            </div>
          </div>
        </div>
      </div>
    `,
  },
  'minimal-pill': {
    id: 'minimal-pill',
    name: 'Minimal Pill',
    description: 'Clean rounded pill track with a sliding thumb and cross-fading sun/moon icons.',
    cssFile: 'minimal-pill.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  macos: {
    id: 'macos',
    name: 'macOS',
    description: 'A faithful recreation of the macOS System Settings toggle switch.',
    cssFile: 'macos.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  neumorphic: {
    id: 'neumorphic',
    name: 'Neumorphic',
    description: 'Soft-UI switch with inset/raised shadows and a subtle embossed feel.',
    cssFile: 'neumorphic.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  glassmorphism: {
    id: 'glassmorphism',
    name: 'Glassmorphism',
    description: 'Frosted-glass track with backdrop blur and a glowing translucent thumb.',
    cssFile: 'glassmorphism.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  'retro-led': {
    id: 'retro-led',
    name: 'Retro LED',
    description: 'Chunky 8-bit inspired switch with hard steps and neon LED-style labels.',
    cssFile: 'retro-led.css',
    markup: `
      <div class="theme-switch__track">
        <span class="theme-switch__label theme-switch__label--on">ON</span>
        <span class="theme-switch__label theme-switch__label--off">OFF</span>
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  'gradient-orb': {
    id: 'gradient-orb',
    name: 'Gradient Orb',
    description: 'Dark track with a glowing gradient orb thumb that shifts hue on toggle.',
    cssFile: 'gradient-orb.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  'icon-button': {
    id: 'icon-button',
    name: 'Icon Button',
    description: 'A single circular button that rotates and swaps between a sun and moon icon.',
    cssFile: 'icon-button.css',
    markup: `
      <div class="theme-switch__button">${SUN_MOON_ICONS}</div>
    `,
  },
  terminal: {
    id: 'terminal',
    name: 'Terminal',
    description: 'Cyberpunk terminal look: neon green monospace brackets on a black background.',
    cssFile: 'terminal.css',
    markup: `
      <div class="theme-switch__track">
        <span class="theme-switch__bracket theme-switch__bracket--left">[</span>
        <span class="theme-switch__text theme-switch__text--dark">DARK</span>
        <span class="theme-switch__text theme-switch__text--light">LIGHT</span>
        <span class="theme-switch__bracket theme-switch__bracket--right">]</span>
        <span class="theme-switch__cursor"></span>
      </div>
    `,
  },
  line: {
    id: 'line',
    name: 'Line',
    description: 'Ultra-minimal single-line track with a small dot gliding between sun and moon.',
    cssFile: 'line.css',
    markup: `
      <div class="theme-switch__track">
        <svg class="theme-switch__end-icon theme-switch__end-icon--sun" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <circle cx="12" cy="12" r="5" fill="currentColor" />
        </svg>
        <div class="theme-switch__line"></div>
        <svg class="theme-switch__end-icon theme-switch__end-icon--moon" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79Z" fill="currentColor" />
        </svg>
        <div class="theme-switch__dot"></div>
      </div>
    `,
  },
  rocker: {
    id: 'rocker',
    name: 'Rocker',
    description: 'A physical wall light-switch rocker, complete with a mounting plate and screws.',
    cssFile: 'rocker.css',
    markup: `
      <div class="theme-switch__plate">
        <span class="theme-switch__screw theme-switch__screw--tl"></span>
        <span class="theme-switch__screw theme-switch__screw--br"></span>
        <div class="theme-switch__rocker">
          <span class="theme-switch__rocker-label theme-switch__rocker-label--on">I</span>
          <span class="theme-switch__rocker-label theme-switch__rocker-label--off">O</span>
        </div>
      </div>
    `,
  },
  eclipse: {
    id: 'eclipse',
    name: 'Eclipse',
    description: 'A sun and moon disc that slide into total eclipse as the theme changes.',
    cssFile: 'eclipse.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__corona"></div>
        <div class="theme-switch__sun-disc"></div>
        <div class="theme-switch__moon-disc"></div>
      </div>
    `,
  },
  papercut: {
    id: 'papercut',
    name: 'Papercut',
    description: 'Layered paper-craft circles with soft drop shadows, like a die-cut card.',
    cssFile: 'papercut.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__layer theme-switch__layer--back"></div>
        <div class="theme-switch__layer theme-switch__layer--mid"></div>
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  'neon-tube': {
    id: 'neon-tube',
    name: 'Neon Tube',
    description: 'A glowing glass-tube outline switch that flickers on with a soft neon hum.',
    cssFile: 'neon-tube.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  pixel: {
    id: 'pixel',
    name: 'Pixel',
    description: 'A crisp 8-bit sprite sun and moon on a blocky arcade-cabinet track.',
    cssFile: 'pixel.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb">${PIXEL_SUN}${PIXEL_MOON}</div>
      </div>
    `,
  },
  'flip-card': {
    id: 'flip-card',
    name: 'Flip Card',
    description: 'A two-sided card that flips end over end between its sun and moon faces.',
    cssFile: 'flip-card.css',
    markup: `
      <div class="theme-switch__scene">
        <div class="theme-switch__card">
          <div class="theme-switch__face theme-switch__face--front">${SUN_ICON}</div>
          <div class="theme-switch__face theme-switch__face--back">${MOON_ICON}</div>
        </div>
      </div>
    `,
  },
  droplet: {
    id: 'droplet',
    name: 'Droplet',
    description: 'A soft liquid blob that stretches and squashes as it slides across the track.',
    cssFile: 'droplet.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  'brass-lever': {
    id: 'brass-lever',
    name: 'Brass Lever',
    description: 'A steampunk brass lever on a riveted plate, with a small ticking gear.',
    cssFile: 'brass-lever.css',
    markup: `
      <div class="theme-switch__plate">
        <span class="theme-switch__rivet theme-switch__rivet--tl"></span>
        <span class="theme-switch__rivet theme-switch__rivet--tr"></span>
        <span class="theme-switch__rivet theme-switch__rivet--bl"></span>
        <span class="theme-switch__rivet theme-switch__rivet--br"></span>
        <div class="theme-switch__gear"></div>
        <div class="theme-switch__slot">
          <div class="theme-switch__lever"></div>
        </div>
      </div>
    `,
  },
  origami: {
    id: 'origami',
    name: 'Origami',
    description: 'Folded-paper triangles that rearrange from a sun shape into a crescent moon.',
    cssFile: 'origami.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__fold theme-switch__fold--1"></div>
        <div class="theme-switch__fold theme-switch__fold--2"></div>
        <div class="theme-switch__fold theme-switch__fold--3"></div>
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  aurora: {
    id: 'aurora',
    name: 'Aurora',
    description: 'A shifting aurora-borealis gradient track behind a frosted sliding thumb.',
    cssFile: 'aurora.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  brutalist: {
    id: 'brutalist',
    name: 'Brutalist',
    description: 'Raw neo-brutalist switch: thick black borders, hard offset shadow, no curves.',
    cssFile: 'brutalist.css',
    markup: `
      <div class="theme-switch__track">
        <span class="theme-switch__label theme-switch__label--on">ON</span>
        <span class="theme-switch__label theme-switch__label--off">OFF</span>
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  candy: {
    id: 'candy',
    name: 'Candy',
    description: 'A glossy jelly-bean pill with a bright specular highlight, like hard candy.',
    cssFile: 'candy.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  wood: {
    id: 'wood',
    name: 'Wood',
    description: 'A varnished wooden switch plate with visible grain and brass screws.',
    cssFile: 'wood.css',
    markup: `
      <div class="theme-switch__panel">
        <span class="theme-switch__screw theme-switch__screw--tl"></span>
        <span class="theme-switch__screw theme-switch__screw--tr"></span>
        <span class="theme-switch__screw theme-switch__screw--bl"></span>
        <span class="theme-switch__screw theme-switch__screw--br"></span>
        <div class="theme-switch__track">
          <div class="theme-switch__knob"></div>
        </div>
      </div>
    `,
  },
  holographic: {
    id: 'holographic',
    name: 'Holographic',
    description: 'An iridescent foil-gradient switch that shifts hue as it slides.',
    cssFile: 'holographic.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  matrix: {
    id: 'matrix',
    name: 'Matrix',
    description: 'Falling green digits on a black track, straight out of a hacker terminal.',
    cssFile: 'matrix.css',
    markup: `
      <div class="theme-switch__track">
        <span class="theme-switch__rain theme-switch__rain--1">1</span>
        <span class="theme-switch__rain theme-switch__rain--2">0</span>
        <span class="theme-switch__rain theme-switch__rain--3">1</span>
        <span class="theme-switch__rain theme-switch__rain--4">0</span>
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  lava: {
    id: 'lava',
    name: 'Lava',
    description: 'Warm gradient blobs that merge and separate like a slow-motion lava lamp.',
    cssFile: 'lava.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__blob theme-switch__blob--1"></div>
        <div class="theme-switch__blob theme-switch__blob--2"></div>
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  crystal: {
    id: 'crystal',
    name: 'Crystal',
    description: 'A faceted gemstone thumb that catches the light as it slides across the track.',
    cssFile: 'crystal.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
  vinyl: {
    id: 'vinyl',
    name: 'Vinyl',
    description: 'A miniature spinning record that slows to a stop when you change the theme.',
    cssFile: 'vinyl.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__disc">
          <div class="theme-switch__label-center"></div>
        </div>
      </div>
    `,
  },
  constellation: {
    id: 'constellation',
    name: 'Constellation',
    description: 'Hand-drawn stars connect into constellation lines behind a sliding thumb.',
    cssFile: 'constellation.css',
    markup: `
      <div class="theme-switch__track">
        ${STAR_DOTS}
        <div class="theme-switch__thumb">${SUN_MOON_ICONS}</div>
      </div>
    `,
  },
  sunrise: {
    id: 'sunrise',
    name: 'Sunrise',
    description: 'A sun that rises and sets behind a horizon line as the track fills with color.',
    cssFile: 'sunrise.css',
    markup: `
      <div class="theme-switch__track">
        <div class="theme-switch__sky"></div>
        <div class="theme-switch__horizon"></div>
        <div class="theme-switch__thumb"></div>
      </div>
    `,
  },
};

export const VARIANT_IDS = Object.keys(VARIANTS) as ThemeSwitchVariant[];
