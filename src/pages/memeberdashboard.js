import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout3';
import ViewFiles from '../components/ViewFileDAO';

export default function Explore() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new file"
          description="add a new file"
        />
        <ViewFiles/>

      </Layout>
    </ThemeProvider>
  );
}