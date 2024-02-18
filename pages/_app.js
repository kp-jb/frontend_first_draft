import "@/styles/globals.css";

import AuthProvider from "@/contexts/AuthContext";
import ContentProvider from "@/contexts/ContentContext";
import ErrorProvider from "@/contexts/ErrorContext";
import PromptProvider from "@/contexts/PromptContext";

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {

  return <>
          <ErrorProvider>
            <AuthProvider>
                <PromptProvider>
                  <ContentProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ContentProvider>
                </PromptProvider>
            </AuthProvider>;
          </ErrorProvider>
        </>
};