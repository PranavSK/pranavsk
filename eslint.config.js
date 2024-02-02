import { defineConfig } from '@pranavsk/eslint-config';
import unocss from '@unocss/eslint-config/flat';

const config = defineConfig(
  {
    astro: true,
    react: true,
    formatter: {
      html: true,
      css: true,
      json: true,
      markdown: true,
      yaml: true
    }
  },
  unocss
);

export default config;
