import Image from 'next/image';
import type { GetStaticPropsContext } from 'next';

import {
  BanknotesIcon,
  FireIcon,
  SparklesIcon,
  CubeIcon,
  PaintBrushIcon,
  DocumentIcon,
  ChevronRightIcon,
  IdentificationIcon,
} from '@heroicons/react/24/outline';

import { withTranslationProps } from '~/lib/props/with-translation-props';

import Layout from '~/core/ui/Layout';
import Container from '~/core/ui/Container';
import Footer from '~/components/Footer';
import SiteHeader from '~/components/SiteHeader';
import SubHeading from '~/core/ui/SubHeading';
import Button from '~/core/ui/Button';
import Heading from '~/core/ui/Heading';
import Hero from '~/core/ui/Hero';
import Divider from '~/core/ui/Divider';
import SlideUpTransition from '~/core/ui/SlideUpTransition';
import { useTranslation } from 'next-i18next';

const Index = () => {
  const { t } = useTranslation();
  return (
    <Layout>
      <SiteHeader />

      <Container>
        <SlideUpTransition>
          <div
            className={
              'my-12 flex flex-col items-center md:flex-row lg:my-24' +
              ' mx-auto flex-1 justify-center'
            }
          >
            <div
              className={'flex w-full flex-1 flex-col items-center space-y-10'}
            >
              <HeroTitle>
                <span key={'home:headLine'}>{t(`auth:headLine`)}</span>

                <span
                  className={
                    'bg-gradient-to-br bg-clip-text text-transparent' +
                    ' from-purple-900 to-purple-900' +
                    ' to-purple-900 leading-[1.2]'
                  }
                >
                  {t(`auth:subHeadLine`)}
                </span>
              </HeroTitle>

              <div
                className={
                  'text-center text-gray-500 dark:text-gray-400' +
                  ' flex max-w-lg flex-col space-y-1 font-heading md:w-full'
                }
              >
                <span>{t(`auth:description`)}</span>
              </div>

              <div className={'flex items-center space-x-4'}>
                <Button href={'/auth/sign-up'}>
                  <span className={'flex items-center space-x-2'}>
                    <span>{t(`auth:getStarted`)}</span>
                    <ChevronRightIcon className={'h-3'} />
                  </span>
                </Button>
              </div>
            </div>
          </div>

          <div className={'flex justify-center py-12'}>
            <Image
              priority
              className={
                'hero-image-shadow rounded-2xl' +
                ' shadow-purple-900/40 dark:shadow-purple-900/30'
              }
              width={2688}
              height={1824}
              src={`https://wallpapers.com/images/hd/blank-white-landscape-7sn5o1woonmklx1h.jpg`}
              alt={`mentan-ai`}
            />
          </div>
        </SlideUpTransition>
      </Container>

      <Divider />

      {/* <Container>
        <div
          className={
            'flex flex-col items-center justify-center space-y-24 py-12'
          }
        >
          <div
            className={
              'flex max-w-3xl flex-col items-center space-y-4 text-center'
            }
          >
            <div className={'flex flex-col items-center space-y-2'}>
              <div>
                <FireIcon className={'h-6 text-purple-900'} />
              </div>

              <b className={'text-purple-900'}>{t(`auth:features`)}</b>
            </div>

            <Hero>{t(`auth:featuresH1`)}</Hero>

            <SubHeading>{t(`auth:featuresH2`)}</SubHeading>
          </div>

          <div>
            <div className={'grid gap-12 lg:grid-cols-3'}>
              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <IdentificationIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>{t(`auth:describe`)}</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  {t(`auth:subdescribe`)}
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <SparklesIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>{t(`auth:creation`)}</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  {t(`auth:subcreation`)}
                </div>
              </div>

              <div className={'flex flex-col space-y-3 text-center'}>
                <FeatureIcon>
                  <BanknotesIcon className={'h-6'} />
                </FeatureIcon>

                <Heading type={3}>{t(`auth:sell`)}</Heading>

                <div className={'text-gray-500 dark:text-gray-400'}>
                  {t(`auth:subsell`)}
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container> */}

      <Divider />

      <Footer />
    </Layout>
  );
};

export default Index;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  const { props } = await withTranslationProps({ locale });

  return {
    props,
  };
}

function HeroTitle({ children }: React.PropsWithChildren) {
  return (
    <h1
      className={
        'text-center text-4xl text-black-500 dark:text-white md:text-5xl' +
        ' flex flex-col space-y-1 font-heading font-medium xl:text-7xl'
      }
    >
      {children}
    </h1>
  );
}

function FeatureIcon(props: React.PropsWithChildren) {
  return (
    <div className={'flex justify-center'}>
      <div
        className={'rounded-xl bg-primary-500/10 p-4 dark:bg-primary-500/10'}
      >
        {props.children}
      </div>
    </div>
  );
}
