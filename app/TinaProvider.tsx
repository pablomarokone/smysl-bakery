"use client";

import { TinaCMS, TinaProvider as TinaCMSProvider } from 'tinacms';
import tinaConfig from '../tina.config';

export function TinaProvider({ children }: { children: React.ReactNode }) {
  const cms = new TinaCMS({
    enabled: true,
    ...tinaConfig,
  });
  return (
    <TinaCMSProvider cms={cms}>
      {children}
    </TinaCMSProvider>
  );
}