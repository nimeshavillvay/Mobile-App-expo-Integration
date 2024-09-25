# Web UI components

This package contains base components with minimal styling that can be imported and used across other projects in the monorepo.

## Usage

Include the path of the components of this package from the project they are being used in. Exclude the Storybook Stories to make sure the classes used in the stories are not included.

```typescript
import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "../../packages/web-ui/src/**/*.{ts,tsx}",
    "!../../packages/web-ui/src/**/*.stories.{ts,tsx}",
  ],
  presets: [require("@repo/tailwindcss-config")],
};

export default config;
```

Also add the TypeScript absolute path to the project that is importing this package

```json
{
  "compilerOptions": {
    "paths": {
      // ...
      "~/*": ["../../packages/web-ui/src/*"]
    }
  }
}
```

## Shared dependencies

These packages that are shared between the project such as `react` and `clsx` should be installed in this package with the `--save-peer` flag.

```shell
pnpm install react --save-peer
```
