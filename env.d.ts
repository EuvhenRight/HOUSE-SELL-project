/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_MAX_FILE_SIZE: number
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
