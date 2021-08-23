import { AppProps } from 'next/app';
import { getClient } from "../utils/sanity";
import { head } from 'lodash/fp';

import '../styles/variables.css';
import '../styles/global.css';

import 'bootstrap/dist/css/bootstrap.css';
import Layout from '../components/layout'
import { SanitySiteProps } from '../interfaces';
import { websiteConfigQuery } from '../queries';

interface LayoutProps extends AppProps {
  sanitySiteProps: SanitySiteProps;
}

const App = ({ Component, pageProps, sanitySiteProps }: LayoutProps) => (
  <Layout sanitySiteProps={sanitySiteProps}>
    <Component {...pageProps} />
  </Layout>
);


App.getInitialProps = async () => {
  const sanitySiteData = await getClient(false).fetch(websiteConfigQuery);
  const sanitySiteProps = head(sanitySiteData);
  return { sanitySiteProps };
}

export default App;
