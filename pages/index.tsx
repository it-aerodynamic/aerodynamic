import { getClient } from "../utils/sanity";
import { map, head, isEmpty } from 'lodash/fp';
import BlockContent from '@sanity/block-content-to-react';
import Fade from 'react-reveal/Fade';
import Head from 'next/head';

import { homeQuery } from '../queries';
import ImageCarousel from '../components/carousel';
import Service from '../components/service';
import styles from '../styles/home.module.css';

const HomePage = ({ homeData }) => {
  if (isEmpty(homeData)){
    return null;
  }
  const { description, hero: { slides }, services, title } = homeData;
  return (
    <>
      <Head>
        <title>Aerodynamic</title>
        <meta name="description" content="This is the page description" />
      </Head>
      <div className={styles.pageWrapper}>
        <ImageCarousel slides={slides}/>
        <div className={styles.homeContainer}>
          <div className={styles.leftPanel}>
            <Fade duration={2000}>
              <h2>{title}</h2>
              <BlockContent blocks={description} />
            </Fade>
          </div>
          <div className={styles.servicesContainer}>
            {
              map(({ title, description }) => {
                return <Service key={title} title={title} description={description} />
              })(services)
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;

export const getServerSideProps = async () => {
  const result = await getClient(false).fetch(homeQuery);
  const homeData = head(result);
  return {
    props: {
      homeData    
    },
  }
}