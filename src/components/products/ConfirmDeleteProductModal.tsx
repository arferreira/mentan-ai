import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

import { useTranslation } from 'next-i18next';

const ConfirmDeleteProductModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: string;
  onConfirm: () => void;
}> = ({ isOpen, setIsOpen, onConfirm, product }) => {
  const { t } = useTranslation();
  return (
    <Modal
      heading={`${t('common:deletingProductTitle')}`}
      isOpen={isOpen}
      setIsOpen={setIsOpen}
    >
      <div className={'flex flex-col space-y-4'}>
        <p>
          {t('common:deletingProduct')} <b>{product}</b>
        </p>

        <p>{t('common:continueDeletingProduct')}</p>

        <Button block color={'danger'} onClick={onConfirm}>
          {t('common:confirmDeletingProduct')}
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteProductModal;
