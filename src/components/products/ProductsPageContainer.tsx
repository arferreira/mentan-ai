import React from 'react';
import RouteShell from '~/components/RouteShell';

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
