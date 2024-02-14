import "@/styles/globals.css";

import AuthProvider from "@/contexts/AuthContext";
import ErrorProvider from "@/contexts/ErrorContext";
import PromptProvider from "@/contexts/PromptContext";

import Layout from "@/components/Layout";


export default function App({ Component, pageProps }) {

  return <>
          <ErrorProvider>
            <AuthProvider>
                <PromptProvider>
                  <Layout>
                    <Component {...pageProps} />
                  </Layout>
                </PromptProvider>
            </AuthProvider>;
          </ErrorProvider>
        </>
};