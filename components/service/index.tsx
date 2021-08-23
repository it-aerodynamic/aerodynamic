import Image from 'next/image'
import Fade from 'react-reveal/Fade';
import BlockContent from '@sanity/block-content-to-react';

import styles from './styles.module.css';

interface PortableTextMarkDefs {
  _key: string;
  to: string;
}

interface PortableTextChildren {
  text: string;
  marks?: string[];
}

interface PortableText {
  _type?: string;
  _key: string;
  text: string;
  children: PortableTextChildren[];
  markDefs: PortableTextMarkDefs[];
}

interface ServiceProps {
  title: string,
  description: PortableText[]  
}

const Service = ({title, description}:ServiceProps) => {
  return (
    <Fade>
      <section className={styles.service}>
        <div className={styles.typeWrapper}>
          <div className={styles.iconWrapper}>
            <Image className={styles.icon} width="38" height="46" src="/circular-arrows.svg" alt="logo" />
          </div>
          <h1>{title}</h1>
        </div>
        <Fade cascade left>
        <div className={styles.body}>
          <BlockContent blocks={description} />
        </div>
        </Fade>
      </section>
    </Fade>
  )
};

export default Service;