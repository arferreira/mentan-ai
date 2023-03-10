import dynamic from 'next/dynamic';
import { useTranslation } from 'next-i18next';

import { useAuth } from 'reactfire';
import { Transition } from '@headlessui/react';

import { ArrowRightIcon } from '@heroicons/react/24/outline';
import { useUserSession } from '~/core/hooks/use-user-session';

import Logo from '~/core/ui/Logo';
import Container from '~/core/ui/Container';
import If from '~/core/ui/If';
import Button from '~/core/ui/Button';

import SiteNavigation from './SiteNavigation';
import ProfileDropdown from './ProfileDropdown';

const DarkModeToggle = dynamic(() => import('~/components/DarkModeToggle'), {
  ssr: false,
});

import configuration from '~/configuration';
import LanguageSwitcherFlag from './LanguageSwitcherFlag';

const fixedClassName = `FixedHeader`;

const SiteHeader: React.FCC<{
  fixed?: boolean;
}> = ({ fixed }) => {
  const auth = useAuth();
  const userSession = useUserSession();
  const { t } = useTranslation();

  const signOutRequested = () => auth.signOut();

  return (
    <div className={`w-full py-4 px-1 lg:px-6 ${fixed ? fixedClassName : ''}`}>
      <Container>
        <div className="flex flex-row items-center">
          <div className={'flex items-center space-x-4 lg:space-x-8'}>
            <Logo />

            <SiteNavigation />
          </div>

          <div className={'flex flex-1 items-center justify-end space-x-4'}>
            {/* <LanguageSwitcherFlag /> */}
            <If
              condition={
                configuration.enableThemeSwitcher && !userSession?.auth
              }
            >
              <div className={'flex items-center'}>
                <DarkModeToggle />
              </div>
            </If>
            {!userSession?.auth && <LanguageSwitcherFlag />}

            <Transition
              appear
              show
              enter="transition-opacity duration-500"
              enterFrom="opacity-50"
              enterTo="opacity-100"
            >
              <If condition={userSession?.auth} fallback={<AuthButtons />}>
                {(user) => (
                  <ProfileDropdown
                    user={user}
                    signOutRequested={signOutRequested}
                  />
                )}
              </If>
            </Transition>
          </div>
        </div>
      </Container>
    </div>
  );
};

function AuthButtons() {
  const { t } = useTranslation();
  return (
    <div className={'hidden space-x-2 lg:flex'}>
      <Button round color={'transparent'} href={configuration.paths.signIn}>
        <span>{t(`auth:signIn`)}</span>
      </Button>

      <Button round color={'secondary'} href={configuration.paths.signUp}>
        <span className={'flex items-center space-x-2'}>
          <span>{t(`auth:signUp`)}</span>
          <ArrowRightIcon className={'h-4'} />
        </span>
      </Button>
    </div>
  );
}

export default SiteHeader;
