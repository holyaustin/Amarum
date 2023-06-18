import React from 'react';
import { ThemeProvider } from 'theme-ui';
import theme from '../theme';
import SEO from '../components/seo';
import Layout from '../components/layout3';
import Mintfile from '../components/MintfileDAO';

export default function PublishNews() {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <SEO
          title="Add new file"
          description="add a new file"
        />
        <Mintfile />

      </Layout>
    </ThemeProvider>
  );
}