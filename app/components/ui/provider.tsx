'use client';

import { ChakraProvider, defaultSystem } from "@chakra-ui/react";
import { ThemeProvider as NextThemeProvider } from "next-themes";
import { ReactNode } from "react";

export function Provider({ children }: { children: ReactNode }) {
  return (
    <NextThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ChakraProvider value={defaultSystem}>
        {children}
      </ChakraProvider>
    </NextThemeProvider>
  );
}
