import Modal from '~/core/ui/Modal';
import Button from '~/core/ui/Button';

const ConfirmDeleteProductModal: React.FC<{
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  product: string;
  onConfirm: () => void;
}> = ({ isOpen, setIsOpen, onConfirm, product }) => {
  return (
    <Modal heading={`Deleting Product`} isOpen={isOpen} setIsOpen={setIsOpen}>
      <div className={'flex flex-col space-y-4'}>
        <p>
          You are about to delete the product <b>{product}</b>
        </p>

        <p>Do you want to continue?</p>

        <Button block color={'danger'} onClick={onConfirm}>
          Yep, delete product
        </Button>
      </div>
    </Modal>
  );
};

export default ConfirmDeleteProductModal;
