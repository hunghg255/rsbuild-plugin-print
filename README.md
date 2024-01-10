<p align="center">
<a href="https://www.npmjs.com/package/rsbuild-plugin-print" target="_blank" rel="noopener noreferrer">
<img src="https://api.iconify.design/bi:plugin.svg?color=%23bbeea0" alt="logo" width='100'/></a>
</p>

<p align="center">
  A plugin print for <a href="https://rsbuild.dev/" target="_blank" rel="noopener noreferrer">Rsbuild</a>
</p>

<p align="center">
  <a href="https://www.npmjs.com/package/rsbuild-plugin-print" target="_blank" rel="noopener noreferrer"><img src="https://badge.fury.io/js/rsbuild-plugin-print.svg" alt="NPM Version" /></a>
  <a href="https://www.npmjs.com/package/rsbuild-plugin-print" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/npm/dt/rsbuild-plugin-print.svg?logo=npm" alt="NPM Downloads" /></a>
  <a href="https://bundlephobia.com/result?p=rsbuild-plugin-print" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/bundlephobia/minzip/rsbuild-plugin-print" alt="Minizip" /></a>
  <a href="https://github.com/hunghg255/rsbuild-plugin-print/graphs/contributors" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/all_contributors-1-orange.svg" alt="Contributors" /></a>
  <a href="https://github.com/hunghg255/rsbuild-plugin-print/blob/main/LICENSE" target="_blank" rel="noopener noreferrer"><img src="https://badgen.net/github/license/hunghg255/rsbuild-plugin-print" alt="License" /></a>
</p>

## Install

```bash
npm i rsbuild-plugin-print -D
```

<details>
<summary>Rsbuild</summary><br>

```ts
// rsbuild.config.ts
import { pluginPrint } from 'rsbuild-plugin-print';

export default defineConfig({
  plugins: [
    pluginPrint({
      /* options */
    }),
  ],
});
```

Example: [`playground/`](./playground/)

<br></details>

## Options

```ts
import type * as kolorist from 'kolorist';

import type { Options as BoxenOptions } from 'boxen';

type Kolorist = Omit<typeof kolorist, 'SupportLevel' | 'options'>;

export type MessageValue = Omit<BoxenOptions, 'borderStyle'> & {
  text: string;
  url?: string;
} & {
  borderStyle?: BoxenOptions['borderStyle'] | 'none';
};

type Message =
  | string
  | MessageValue
  | ((
      kolorist: Kolorist,
    ) => string | MessageValue | Promise<string | MessageValue | void>);

export interface IPluginOptions {
  info?: Message[];
  hostQrcode?: boolean;
}
```

## Demo

![demo](./assets/demo.png)
