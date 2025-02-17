import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import { pluginLess } from '@rsbuild/plugin-less'
import { pluginTypedCSSModules } from '@rsbuild/plugin-typed-css-modules'

export default defineConfig({
  html: {
    title: 'Loading...',
    favicon: '',
  },
  output: {
    cssModules: {
      localIdentName: '[name]__[local]--[hash:base64:5]',
    },
  },
  plugins: [pluginReact(), pluginLess(), pluginTypedCSSModules()],
})
