import { pluginPrint } from 'rsbuild-plugin-print';
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

// import { pluginPrint } from '../src/index';

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginPrint({
      info: [
        '> hello world 1',
        {
          text: '> hello world 2',
          url: 'https://www.baidu.com',
        },
        {
          text: 'https://www.baidu.com',
          title: 'hello world 3',
          padding: 1,
          margin: 1,
          borderStyle: 'round',
        },
        ({ bold, cyan, green }) => {
          return {
            text: `${green('➜')} ${bold('Font Icon:')} ${bold(
              cyan('http://localhost:4005/public/t4font/index.html'),
            )}`,
          };
        },
      ],
    }),
  ],
});
