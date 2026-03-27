/// <reference types="vite/client" />

declare module '*.svg?url&no-inline' {
  const src: string;
  export default src;
}
