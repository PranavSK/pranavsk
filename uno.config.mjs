import { defineConfig, presetUno } from "unocss";

const defaultSans = presetUno().theme?.fontFamily?.sans ?? "";
export default defineConfig({
  presets: [presetUno()],
  theme: {
    fontFamily: {
      sans: `Varela Round,${defaultSans}`,
    },
  },
});
