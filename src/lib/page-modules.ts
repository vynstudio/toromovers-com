export const pageLoaders = import.meta.glob("../app/**/page.tsx");

export type PageModule = {
  default: (props: Record<string, unknown>) => unknown;
  metadata?: unknown;
  generateMetadata?: (args: {
    params: Promise<Record<string, string>>;
  }) => Promise<unknown>;
};
