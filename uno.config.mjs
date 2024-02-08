import { defineConfig, presetIcons, presetUno, transformerVariantGroup } from 'unocss';
import { gold, goldDark, sand, sandDark } from '@radix-ui/colors';

const themeKeys = [
  'base',
  'bgSubtle',
  'bg',
  'bgHover',
  'bgActive',
  'line',
  'border',
  'borderHover',
  'solid',
  'solidHover',
  'textSubtle',
  'text'
];

/**
 * Convert to relevant unocss theme object.
 *
 * @param {Record<`${string}${int}`, string>} color Radix color object
 * @returns {Record<string, string>} Unocss theme object
 */
function extractRadixColors(color) {
  const tag = Object.keys(color)[0].match(/^\D+/)[0];
  const theme = {};

  themeKeys.forEach((key, index) => {
    theme[key] = color[`${tag}${index + 1}`];
  });

  return theme;
}

const defaultSans = presetUno().theme?.fontFamily?.sans ?? '';
const defaultMono = presetUno().theme?.fontFamily?.mono ?? '';
export default defineConfig({
  content: {
    pipeline: {
      include: [/\.(vue|svelte|[jt]sx|mdx?|astro|elm|php|phtml|html)($|\?)/, 'src/lib/icon-map.ts']
    }
  },
  extendTheme: [
    theme => ({
      ...theme,
      fontFamily: {
        sans: `"Varela Round",${defaultSans}`,
        mono: `"Mononoki",${defaultMono}`
      }
    })
  ],
  presets: [
    presetUno(),
    presetIcons({
      extraProperties: {
        display: 'inline-block',
        'vertical-align': 'middle'
      }
    })
  ],
  theme: {
    colors: {
      primary: extractRadixColors(sand),
      accent: extractRadixColors(gold),
      primaryDark: extractRadixColors(sandDark),
      accentDark: extractRadixColors(goldDark)
    }
  },
  shortcuts: [
    {
      base: 'bg-primary-base border-primary-border text-primary-text dark:(bg-primaryDark-base border-primaryDark-border text-primaryDark-text)',
      'text-accent': 'text-accent-solid dark:text-accentDark-solid',
      'text-muted': 'text-primary-textSubtle dark:text-primaryDark-textSubtle',
      badge:
        'inline-flex items-center gap-1 rounded-xl text-xs py-0.5 px-1.5 bg-primary-bg dark:bg-primaryDark-bg text-primary-textSubtle dark:text-primaryDark-textSubtle',
      'animated-underline':
        'relative before:(content-[""] absolute block w-full h-1px -bottom-4px left-0 scale-0 bg-primary-line transform-origin-top-left transition-transform-300 dark:bg-primaryDark-line hover:scale-100)'
    }
  ],
  transformers: [transformerVariantGroup()]
});
