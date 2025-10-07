import alias from '@rollup/plugin-alias'
import nodeResolve from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import ts from 'rollup-plugin-typescript2'
import { dts } from 'rollup-plugin-dts'
import { string } from 'rollup-plugin-string'
import babel from '@rollup/plugin-babel'
import terser from '@rollup/plugin-terser'
import path from 'node:path'

const dirname = path.resolve()

function createAliasPlugin() {
  return alias({
    entries: [
      { find: '@', replacement: path.resolve(dirname, 'src') },
    ],
  })
}

export default [
  {
    input: 'src/index.ts',
    output: [
      {
        file: 'dist/fauxy.umd.js',
        format: 'cjs',
        sourcemap: false,
      },
      {
        file: 'dist/fauxy.es.js',
        format: 'es',
        sourcemap: false,
      },
    ],
    plugins: [
      createAliasPlugin(),
      nodeResolve(),
      commonjs(),
      ts({
        tsconfig: path.resolve(dirname, 'tsconfig.json'),
      }),
      string({
        include: '**/*.svg',
        exclude: 'node_modules/**',
      }),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions: ['.js', '.ts']
      }),
      terser(),
    ],
  },
  {
    input: 'src/declare-types/index.d.ts',
    output: [
      {
        file: 'dist/index.d.ts',
        format: 'es',
      },
    ],
    plugins: [
      createAliasPlugin(),
      dts(),
    ],
  },
]