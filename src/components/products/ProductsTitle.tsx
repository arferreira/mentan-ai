import { Trans, useTranslation } from 'next-i18next';
import Heading from '~/core/ui/Heading';

export function ProductsTitle() {
  const { t } = useTranslation();
  return (
    <div>
      <Heading type={4}>{t('common:productTabLabel')}</Heading>

      <p className={'text-gray-500 dark:text-gray-400'}>
        <span>{t('common:productsHeadLine')}</span>
      </p>
    </div>
  );
}
