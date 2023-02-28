import { useTranslation } from 'next-i18next';

import ConvertkitSignupForm from '~/components/newsletter/ConvertkitSignupForm';
import configuration from '~/configuration';
import Heading from '~/core/ui/Heading';

function NewsletterSignup() {
  const { t } = useTranslation();
  return (
    <div className={'flex flex-col space-y-4'}>
      <div>
        <Heading type={6}>{t(`auth:subscribeNewsletter`)}</Heading>

        <div className={'text-sm text-gray-500 dark:text-gray-400'}>
          {t(`auth:getLatestUpdates`)}
        </div>
      </div>

      <div>
        <ConvertkitSignupForm formId={configuration.site.convertKitFormId}>
          {t(`auth:subscribeNewsletterButton`)}
        </ConvertkitSignupForm>
      </div>
    </div>
  );
}

export default NewsletterSignup;
