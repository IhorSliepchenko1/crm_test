import { Modal, ModalContent, ModalHeader, ModalFooter, Button } from "@nextui-org/react";
import { fetchDelete } from '../../features/deleteSlice';
import { useDispatch, useSelector } from "react-redux";
import { fetchCashRegisterSlice } from "../../features/cashRegisterSlice/cashRegisterSlice";

const DeleteCashRegister = ({ isOpen, onOpenChange, page, id }) => {
     const dispatch = useDispatch();
     const state = useSelector((state) => state);

     const fetchDel = async () => {
          try {
               await dispatch(fetchDelete({ name: `cash`, id, token: state.auth.token })).unwrap();
               dispatch(fetchCashRegisterSlice({ page: page }));
               onOpenChange();

          } catch (err) {
               console.error("Ошибка:", err);
          }
     }

     return (
          <Modal isOpen={isOpen} onOpenChange={onOpenChange}  >
               <ModalContent>
                    {(onClose) => (
                         <>
                              <ModalHeader className="flex justify-center">Уверены что хотите удалить?</ModalHeader>
                              <ModalFooter className="flex justify-between">
                                   <Button color="primary" onPress={fetchDel}>
                                        Удалить
                                   </Button>
                                   <Button color="danger" variant="light" onPress={onClose}>
                                        Отмена
                                   </Button>
                              </ModalFooter>
                         </>
                    )}
               </ModalContent>
          </Modal>
     )
}

export default DeleteCashRegister