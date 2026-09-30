import {
  lazy,
  Suspense,
  useEffect,
  useState,
  type ComponentType,
  type ReactNode,
} from "react";

type Loader<P> = () => Promise<
  ComponentType<P> | { default: ComponentType<P> }
>;

type Options = {
  ssr?: boolean;
  loading?: () => ReactNode;
};

/**
 * next/dynamic stand-in.
 * ssr:false matches Next: render `loading` (or null) on the server and on the
 * first client paint, then mount the real component after hydration.
 */
export default function dynamic<P extends object>(
  loader: Loader<P>,
  options?: Options,
) {
  const Lazy = lazy(async () => {
    const mod = await loader();
    if (typeof mod === "function") return { default: mod as ComponentType<P> };
    return { default: mod.default };
  });

  return function DynamicComponent(props: P) {
    const ssrOff = options?.ssr === false;
    const [ready, setReady] = useState(!ssrOff);
    useEffect(() => {
      if (ssrOff) setReady(true);
    }, [ssrOff]);

    if (!ready) {
      const Loading = options?.loading;
      return Loading ? <Loading /> : null;
    }

    const fallback = options?.loading ? options.loading() : null;
    return (
      <Suspense fallback={fallback}>
        <Lazy {...props} />
      </Suspense>
    );
  };
}
