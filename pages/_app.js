import "@/styles/globals.css";

import AuthProvider from "@/contexts/AuthContext";
import ErrorProvider from "@/contexts/ErrorContext";
import PageProvider from "@/contexts/PageContext";
import PromptProvider from "@/contexts/PromptContext";

import Layout from "@/components/Layout";


export default function App({ Component, pageProps }) {

  return <>
          <ErrorProvider>
            <AuthProvider>
              <PageProvider>
                <PromptProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </PromptProvider>
              </PageProvider>
            </AuthProvider>;
          </ErrorProvider>
        </>
};