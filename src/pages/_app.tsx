import { useState, useEffect } from 'react';
import type { AppProps } from 'next/app';
import Head from 'next/head';

/**
 * This component is used to prevent the server from rendering the page before the client has a chance to render it.
 * This is useful for components that rely on the window object, such as the antd ConfigProvider.
 * Next.js 13 will give you an error if you try to render the ConfigProvider or other client-only components on the server.
 * You could also create a custom hook to check if the window object exists, but this is a simpler solution.
 */
const ClientOnly = (props: React.PropsWithChildren<unknown>) => {
  const [hydration, setHydration] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setHydration(true);
    }
  }, []);

  return hydration ? <>{props.children ?? null}</> : null;
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Next.js 13 + LESS starter template</title>
      </Head>
      <main>
        <ClientOnly>
          <Component {...pageProps} />
        </ClientOnly>
      </main>
    </>
  );
}
