import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter } from "@nextui-org/react";
import { CustomInput } from '../input'
import { Button } from "@nextui-org/react";
import ErrorMessage from "../error";

const Modals = ({ onOpenChange, isOpen, onSubmit, handleSubmit, control, reset, title, data, error, setError }) => {

  const handleClose = () => {
    reset();
    onOpenChange();
    setError(``)
  }

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={handleClose}
      placement="top-center"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <form onSubmit={handleSubmit(onSubmit)}>
              <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
              <ModalBody>

                <CustomInput name="cash"
                  label="Наличные"
                  type="number"
                  control={control}
                  required="Обязательное поле"
                  value={data?.cash}
                />

                <CustomInput name="cashless"
                  label="Безналичне"
                  type="number"
                  control={control}
                  required="Обязательное поле"
                  value={data?.cashless} />

                <CustomInput name="date"
                  label="Дата"
                  type="date"
                  control={control}
                  required="Обязательное поле"
                  value={data?.date} />

              </ModalBody>
              {error && <ErrorMessage error={error} />}
              <ModalFooter className='flex justify-between'>
                <Button color="primary" type='submit'>
                  Внести
                </Button>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Отмена
                </Button>
              </ModalFooter></form>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default Modals