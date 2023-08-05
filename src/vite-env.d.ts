/// <reference types="vite/client" />

interface ImportMetaEnv {
	readonly VITE_THE_MOVIEDB_BASE_URL: string
	readonly VITE_THE_MOVIEDB_API_KEY: string
}

interface ImportMeta {
	readonly env: ImportMetaEnv
}
