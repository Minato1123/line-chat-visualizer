// uno.config.ts
import { defineConfig, presetIcons } from 'unocss'
import presetWind from '@unocss/preset-wind'

export default defineConfig({
  presets: [
    presetWind(),
    presetIcons(),
  ],
})
