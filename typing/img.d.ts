declare module '*.svg' {
  const value: any
  export = value
}

declare module '*/index.ts' {
  import { Component } from '../src/core'
  const value: { [key: string]: { default: typeof Component } }
  export = value
}
