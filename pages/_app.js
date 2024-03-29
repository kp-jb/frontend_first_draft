import "@/styles/globals.css";
import Modal from "react-modal";
import React from "react";
import Head from "next/head";

import AuthProvider from "@/contexts/AuthContext";
import ContentProvider from "@/contexts/ContentContext";
import ErrorProvider from "@/contexts/ErrorContext";
import PromptProvider from "@/contexts/PromptContext";

import Layout from "@/components/Layout";

export default function App({ Component, pageProps }) {

  // set modal app element on load
  React.useEffect(() => {
    Modal.setAppElement('#__next'); 
  }, []);

  return <>
          <ErrorProvider>
            <AuthProvider>
                <PromptProvider>
                  <ContentProvider>
                    <Head>
                      <title>First Draft</title>
                    </Head>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </ContentProvider>
                </PromptProvider>
            </AuthProvider>
          </ErrorProvider>
        </>
};