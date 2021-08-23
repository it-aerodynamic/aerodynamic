
import { SanitySiteProps } from '../../interfaces';
import Footer from '../footer';
import Header from '../header';
import styles from './styles.module.css';

interface LayoutProps {
  children: JSX.Element;
  sanitySiteProps: SanitySiteProps;
}

const Layout: React.FC<LayoutProps> = ({ children, sanitySiteProps }: LayoutProps) => (
  <>
    <Header sanitySiteProps={sanitySiteProps} />
    <main className={styles.main}>{children}</main>
    <Footer />
  </>
);

export default Layout;
