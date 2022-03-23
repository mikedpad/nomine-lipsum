import pkg from './package.json';
import typescript from 'rollup-plugin-typescript2';
import { terser } from 'rollup-plugin-terser';
import babel from '@rollup/plugin-babel';
import json from '@rollup/plugin-json';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: pkg.exports,
      format: 'es',
    },
    {
      file: pkg.main,
      format: 'umd',
      name: 'nomineLipsum',
      indent: false,
    },
  ],
  plugins: [
    typescript(),
    json({ compact: true, preferConst: true }),
    babel({ extensions: ['.ts'], babelHelpers: 'bundled', exclude: 'node_modules/**' }),
    terser(),
  ],
};
