import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import Head from "next/head";
import SEO from '../components/seo';
import Layout from '../components/layout3';
import CreateDeal from '../components/createdeal';

// Page for new storage deals More work to be done here
export default function NewDeal() {
  return (
    <ThemeProvider theme={theme}>
    <Head>
      <link rel="shortcut icon" href="/images/logo.png" />
    </Head>
      <Layout>
        <SEO
          title="Add new file"
          description="Deal for  file"
        />
        <CreateDeal/>

      </Layout>
    </ThemeProvider>
  );
}