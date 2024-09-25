# Base Tailwind CSS Configuration

This package the base configuration for Tailwind CSS to be used by other packages in the monorepo with some custom classes and plugins included. To use it, just install this package and include it in the `presets` field of the Tailwind CSS configuration.

```shell
pnpm install @repo/tailwindcss-config --filter <package-to-install-to>
```

```typescript
// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  // ...
  presets: [require("@repo/tailwindcss-config")],
};

export default config;
```

## Fonts

There are two custom classes for font families in this configuration.

|    Class     | Description                                                                                                                  |    Variable    |
| :----------: | :--------------------------------------------------------------------------------------------------------------------------- | :------------: |
| `font-title` | Used for headings.                                                                                                           | `--font-title` |
| `font-body`  | The default font family to be used. Add the class to the `<body>` tag so that all text will use this font family by default. | `--font-body`  |

Include the required font in the variable. For example, it can be done in Next.js by following these [instructions](https://nextjs.org/docs/app/building-your-application/optimizing/fonts#with-tailwind-css).
