import Image from 'next/image';

import styles from './styles.module.css';
import Clickable from '../clickable';
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; 
import { faFacebookSquare, faInstagram } from "@fortawesome/free-brands-svg-icons";

const Footer = () => (
  <footer className={styles.footer} id="sticky-footer">
    <div className={styles.footerWrapper}>
      <div className={styles.leftPanel}>
        <Image width="203" height="61" src="/logo.png" alt="logo" />
      </div>
      <div className={styles.rightPanel}>
        <p className={styles.copyright}>&copy; Copyright AERODYNAMIC PTY LTD</p>
      </div>
    </div>
  </footer>
);

export default Footer;
