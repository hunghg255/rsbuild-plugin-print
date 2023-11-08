import type { RsbuildPlugin } from '@rsbuild/core';

import { renderUnicodeCompact } from 'hqr';
import * as korlorist from 'kolorist';
import boxen from 'boxen';
import { logger } from '@rsbuild/shared';

import type { IPluginOptions, MessageValue } from './types';
import { getIpv4Interfaces } from './utils';

export function printServerURLs(urls: Array<{ url: string; label: string }>) {
  const message = urls
    .map(
      ({ label, url }) => `  ${`${label.padEnd(10)}`} ${korlorist.cyan(url)}`,
    )
    .join('');

  logger.log(message);
}

function printQrcode(port: number) {
  const ipv4Interfaces = getIpv4Interfaces();
  const network: any = ipv4Interfaces.find((v) => !v.internal);

  const url = `http://${network.address}:${port}`;

  const r = renderUnicodeCompact(url, {
    ecc: 'L',
    border: 1,
  });

  printWithBoxen({
    text: `  ${r.replace(/\n/g, '\n  ')}`,
    title: korlorist.bold('Visit page on mobile'),
    padding: 1,
    margin: 1,
    borderStyle: 'round',
  });
}

function log(msg: string | void, url?: string) {
  if (!msg) return;

  printServerURLs([
    {
      url: url || '',
      label: msg,
    },
  ]);
}

async function printWithBoxen(res: MessageValue) {
  res.borderStyle = res.borderStyle || 'none';
  log(boxen(res.text, res), res?.url);
}

export async function print(info: IPluginOptions['info']) {
  if (!info) return;

  for (const message of info) {
    if (typeof message === 'function') {
      const res = await message(korlorist);
      if (typeof res === 'object') printWithBoxen(res);
      //@ts-ignore
      else log(res, res?.url);
    } else if (typeof message === 'object') {
      printWithBoxen(message);
    } else {
      log(message);
    }
  }
}

export const pluginPrint = ({
  info,
  hostQrcode = true,
}: IPluginOptions): RsbuildPlugin => ({
  name: 'plugin-rsbuild-print',
  setup(api) {
    api.onAfterStartDevServer(async ({ port }) => {
      if (info) await print(info);

      if (hostQrcode) {
        printQrcode(port);
      }
      console.log();
    });
    // api.modifyBundlerChain(async (chain, { CHAIN_ID, isProd }) => {
    //   console.log('chain id is ', chain);
    //   console.log('chain id is ', CHAIN_ID);
    // });
    // api.onBeforeCreateCompiler(({ bundlerConfigs }) => {
    //   console.dir(bundlerConfigs, { depth: 10 });
    // });
    // api.onAfterCreateCompiler(({ compiler }) => {
    //   console.log('the compiler is ', compiler);
    // });
    // api.modifyRspackConfig((config) => {
    //   console.dir(config.module.rules, { depth: 10 });

    //   // config.devtool = false;
    // });
  },
});
