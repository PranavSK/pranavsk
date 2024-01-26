import { defineConfig } from "@soybeanjs/eslint-config";
import unocss from "@unocss/eslint-config/flat";

export default defineConfig(
  {
    astro: true,
    react: true,
    formatter: {
      markdown: true,
      yaml: true,
    },
  },
  unocss
);
