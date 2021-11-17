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
  if (isEmpty(homeData)) {
    return null;
  }
  const { description, hero: { slides }, services, title } = homeData;
  return (
    <>
      <Head>
        <title>Safety in the sky, starts from the ground - Aerodynamic</title>
        <meta name="description" content="Aerodynamic is an avionics equipment service provider focused on providing solutions for commercial and business jet operators, MRO’s and military customers" />
      </Head>
      <div className={styles.pageWrapper}>
        <ImageCarousel slides={slides} />
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
  try {
    const result = await getClient(false).fetch(homeQuery);
    const homeData = !isEmpty(result) ? head(result) : null;
    return { props: { homeData: homeData } };
  } catch (err) {
    console.log(err);
  }
}
