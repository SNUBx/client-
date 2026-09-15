/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_ENABLE_ONLINE_PAYMENTS?: string;
  readonly [key: string]: any;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
