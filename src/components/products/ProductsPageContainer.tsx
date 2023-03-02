import React from 'react';
import RouteShell from '~/components/RouteShell';
import NavigationMenu from '~/core/ui/Navigation/NavigationMenu';
import NavigationItem from '~/core/ui/Navigation/NavigationItem';

const links = [
  {
    path: '/settings/profile',
    i18n: 'common:profileSettingsTabLabel',
  },
  {
    path: '/settings/organization',
    i18n: 'common:organizationSettingsTabLabel',
  },
  {
    path: '/settings/subscription',
    i18n: 'common:subscriptionSettingsTabLabel',
  },
];

const ProductsPageContainer: React.FCC<{
  title: string;
}> = ({ children, title }) => {
  return (
    <RouteShell title={title}>
      <div className={``}>{children}</div>
    </RouteShell>
  );
};

export default ProductsPageContainer;
