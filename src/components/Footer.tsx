import Link from 'next/link';
import { Trans, useTranslation } from 'next-i18next';

import Container from '~/core/ui/Container';
import LogoImage from '~/core/ui/Logo/LogoImage';
import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';
import NewsletterSignup from '~/components/NewsletterSignup';

const YEAR = new Date().getFullYear();

function Footer() {
  const { t } = useTranslation();
  return (
    <footer className={'mb-14 justify-center '}>
      <div className="mx-auto mt-2 text-center">
        Made with <span className="mx-1 text-red-500">❤</span> in Florida &copy;{' '}
        {new Date().getFullYear()}
      </div>
    </footer>
  );
}

function FooterSectionList(props: React.PropsWithChildren) {
  return (
    <ul className={'flex flex-col space-y-4 text-gray-500 dark:text-gray-400'}>
      {props.children}
    </ul>
  );
}

function FooterLink(props: React.PropsWithChildren) {
  return (
    <li
      className={
        'text-sm [&>a]:transition-colors [&>a]:hover:text-gray-800' +
        ' dark:[&>a]:hover:text-white'
      }
    >
      {props.children}
    </li>
  );
}

export default Footer;
