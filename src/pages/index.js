import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout';
import Banner from '../sections/banner';
import Services from '../sections/services';
import UltimateFeatures from '../sections/ultimate-feature';
import Faq from '../sections/faq';

export default function IndexPage() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title=" A Paywall Video Dataset Marketplace  with a DAO"
          description="Amarum is a web3 video project with the aim of helping creators publish exciting video datasets and share them easily while getting paid for that."
        />
        <Banner />
        <Services />
        <UltimateFeatures />
        <Faq />
      </Layout>
    </ThemeProvider>
  );
}
