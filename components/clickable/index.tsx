import Link from 'next/link'
import React from "react";
import { get, isString, startsWith } from 'lodash/fp';
import classNames from 'classnames';

import styles from './styles.module.css';

interface ClickableProps {
  children: React.ReactNode,
  className?: string,
  to: string,
  type?: string,
};

const clickableVariants = {
  largeBordered: styles.largeBordered,
  default: styles.link,
};

const Clickable: React.FC<ClickableProps> = ({ children, className, to, type = 'default' }: ClickableProps) => {
  if (!isString(to)){
    return null;
  }

  const linkClasses = classNames(get(type)(clickableVariants), className);

  const isAnchorTag = startsWith(to, "http");
  if (isAnchorTag) {
    return (
      <a className={linkClasses} href={to}>
        {children}
      </a>
    );
  }
  return (
    <Link href={to}>
      <a className={linkClasses}>{children}</a>
    </Link>
  );
};

export default Clickable;
