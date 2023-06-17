import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout2';
import Banner from '../sections/dashboard';

export default function Explore() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="choose members"
          description="add a new file"
        />
        <Banner/>

      </Layout>
    </ThemeProvider>
  );
}