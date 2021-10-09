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
        <title>Aerodynamic</title>
        <meta name="description" content="This is the page description" />
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
          <form action="/success" className={styles.form} data-netlify="true" method="POST" name="contact">
            <input type="hidden" name="form-name" value="contact" />
            <input type="text" id="name" name="name" />
            <button className={styles.submit} type="submit">Send</button>
          </form>
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
