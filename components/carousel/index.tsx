import { Carousel } from 'react-bootstrap';
import { map } from 'lodash/fp';

import { ImageObj } from '../../interfaces';
import styles from './styles.module.css';

interface Slide {
  description?: string;
  imageObject: ImageObj;
  title?: string;
};

interface ImageCarouselProps {
  slides: Slide[];
};

const ImageCarousel = ({ slides }:ImageCarouselProps ) => (
  <div className={styles.carouselWrapper}>
    <Carousel indicators={false}>
      {map(({ imageObject, subTitle, title  }) => {
        return (
          <Carousel.Item key={imageObject.src}>
            <div className={styles.textWrapper}>
              {title && <h2>{title}</h2>}
              {subTitle && <h3>{subTitle}</h3>}
            </div>
            <div className={styles.imageWrapper}/>
            <img className="d-block w-100" src={imageObject.src} />
          </Carousel.Item>
        )
      })(slides)}
    </Carousel>
  </div>
);

export default ImageCarousel;

