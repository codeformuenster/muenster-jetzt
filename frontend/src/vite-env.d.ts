/// <reference types="vite/client" />
/// <reference types="vitest/globals" />

interface ImportMetaEnv {
  readonly REACT_APP_BACKEND_BASE_PATH?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
