import "@/styles/globals.css";

import AuthProvider from "@/contexts/AuthContext";
import ErrorProvider from "@/contexts/ErrorContext";
import PageProvider from "@/contexts/PageContext";
import PromptProvider from "@/contexts/PromptContext";


export default function App({ Component, pageProps }) {

  return <>
          <ErrorProvider>
            <AuthProvider>
              <PageProvider>
                <PromptProvider>
                  <Component {...pageProps} />
                </PromptProvider>
              </PageProvider>
            </AuthProvider>;
          </ErrorProvider>
        </>
};