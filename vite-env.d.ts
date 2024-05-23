/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SERVER_HOST: string;
  readonly VITE_MICROSOFT_AUTHORITY: string;
  readonly VITE_MICROSOFT_WEB_CLIENT_ID: string;
  readonly VITE_AUTH_REDIRECT_URI: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
