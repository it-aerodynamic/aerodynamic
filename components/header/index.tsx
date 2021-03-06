import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ImageObj } from '../../interfaces';
import { useEffect, useState } from 'react';
import classNames from 'classnames';
import Image from 'next/image';

import Clickable from '../clickable';
import styles from './styles.module.css';
import { SanitySiteProps } from '../../interfaces';

interface HeaderProps {
  sanitySiteProps: SanitySiteProps;
};

const Header = ({ sanitySiteProps }: HeaderProps) => {
  const [show, setShow] = useState(false);
  const [hamburgerClicked, setHamburgerClicked] = useState(false);

  const { caption, src } = sanitySiteProps?.imageObject || {};

  const menuClickedHandler = () => {
    setHamburgerClicked(!hamburgerClicked);
  };

  const controlNavbar = () => {
    const isHidden = window.scrollY > 100 ? true : false;
    setShow(isHidden);
  };

  useEffect(() => {
    window.addEventListener('scroll', controlNavbar);
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, []);

  const menuIcon = hamburgerClicked ? faTimes : faBars;

  return (
    <div className={classNames({ [styles.hidden]: show }, styles.navWrapper)}>
      <nav className={styles.navbarItems}>
        {src && caption && <a href="/"><div className={styles.navbarLogo}><Image alt={caption} height="61" src={src} width="203" /></div></a>}
        <div className={styles.menuIcon} onClick={menuClickedHandler}>
          <FontAwesomeIcon icon={menuIcon} />
        </div>
        <div className={styles.rightContent}>          
          <Clickable className={styles.contactButton} to="/contact" type="largeBordered">Contact</Clickable>
        </div>
          <ul className={classNames(styles.navMenu, { [styles.menuActive]: hamburgerClicked },)}>
            <li className={styles.listItem}><a className={styles.navLinks} href="/contact">Contact</a></li>
          </ul>
      </nav>
    </div>
  );
};

export default Header;
