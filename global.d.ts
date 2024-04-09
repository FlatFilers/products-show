// globals.d.ts
namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_FLATFILE_PUBLISHABLE_KEY: string;
    NEXT_PUBLIC_FLATFILE_ENVIRONMENT_ID: string;
    FLATFILE_NAMESPACE: string;
    FLATFILE_SERVICES_NAMESPACE: string;
  }
}
