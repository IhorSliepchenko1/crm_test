import { useState, useMemo, useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCashRegisterSlice } from '../../features/cashRegisterSlice/cashRegisterSlice';
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure } from "@nextui-org/react";
import { CustomInput } from '../../components/input'
import { useForm } from "react-hook-form"
// import { fetchCreateNewItem } from '../../features/createNewItemSlice';
// import AppRouter from '../../http/routes';
import { fetchDelete } from '../../features/deleteSlice';


const CashRegister = () => {

     const {
          handleSubmit,
          control,
          formState: { errors },
          reset
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               cash: null,
               cashless: null,
               date: new Date(Date.now()).toISOString().split('T')[0]
          },
     })

     const dispatch = useDispatch();
     const state = useSelector((state) => state);
     const [page, setPage] = useState(1);
     const { isOpen, onOpen, onOpenChange } = useDisclosure();

     // const onSubmit = async (data) => {
     //      console.log(data);

     //      try {
     //           const reqData = { cash: +data.cash, cashless: +data.cashless, date: data.date }

     //           await dispatch(fetchCreateNewItem({ url: AppRouter.cashRegisterDeposit, name: "cash", data: reqData, token: state.auth.token })).unwrap();
     //           dispatch(fetchCashRegisterSlice({ page: page }));
     //           reset();
     //           onOpenChange();

     //      } catch (err) {
     //           console.error("Ошибка:", err);
     //      }
     // };

     useEffect(() => {
          dispatch(fetchCashRegisterSlice({ page: page }));

     }, [dispatch, page, onOpen]);

     const pages = Math.ceil(state.cashRegister.data.count / 20);
     const items = useMemo(() => state.cashRegister.data.rows || [], [state.cashRegister.data.rows]);


     const fetchDel = async (id) => {
          try {
               await dispatch(fetchDelete({ name: `cash`, id, token: state.auth.token })).unwrap();
               dispatch(fetchCashRegisterSlice({ page: page }));

          } catch (err) {
               console.error("Ошибка:", err);
          }
     }

     const fetchUpdate = (data) => {

          async (id) => {
               try {
                    const reqData = { cash: +data.cash, cashless: +data.cashless, date: data.date }

                    await dispatch(fetchUpdate({ name: `cash`, id, data: reqData, token: state.auth.token })).unwrap();
                    dispatch(fetchCashRegisterSlice({ page: page }));
                    reset();
                    onOpenChange();
               }
               catch (err) {
                    console.error("Ошибка:", err);
               }
          }
     }



     return (
          <div>

               <div className='table-container'>
                    <div className='flex flex-col btn'>
                         <Button color="success" onPress={onOpen}>
                              Внести кассу
                         </Button>

                    </div>

                    {state.status === `loading` ? <Spinner /> :

                         <Table
                              bottomContent={
                                   pages > 0 ? (
                                        <div className="flex justify-center">
                                             <Pagination
                                                  isCompact
                                                  showControls
                                                  showShadow
                                                  color="primary"
                                                  page={page}
                                                  total={pages}
                                                  onChange={(page) => setPage(page)}
                                             />
                                        </div>
                                   ) : null
                              }
                         >
                              <TableHeader>
                                   <TableColumn key="date">Дата</TableColumn>
                                   <TableColumn key="cash">Наличные</TableColumn>
                                   <TableColumn key="cashless">Безналичные</TableColumn>
                                   <TableColumn key="totalCash">Сумма</TableColumn>
                                   <TableColumn >Изменить / Удалить</TableColumn>
                              </TableHeader>

                              <TableBody>
                                   {items.map((item) => (
                                        <TableRow key={item.id}>
                                             <TableCell>{item.date.split(`T`)[0].split(`-`).reverse().join(`.`)}</TableCell>
                                             <TableCell>{item.cash}</TableCell>
                                             <TableCell>{item.cashless}</TableCell>
                                             <TableCell>{item.totalCash}</TableCell>
                                             <TableCell className='btn-container'>

                                                  <Button onPress={onOpen}>
                                                       <AiFillEdit className='cursor-pointer' />
                                                  </Button>
                                                  <div onClick={() => fetchDel(item.id)}>
                                                       <FaRegTrashAlt className='cursor-pointer' />
                                                  </div>


                                             </TableCell>
                                        </TableRow>
                                   ))}
                              </TableBody>
                         </Table>}
               </div>
               <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
               >
                    <ModalContent>
                         {(onClose) => (
                              <>
                                   <form onSubmit={handleSubmit(fetchUpdate)}>
                                        <ModalHeader className="flex flex-col gap-1">Внести кассу</ModalHeader>
                                        <ModalBody>

                                             <CustomInput name="cash"
                                                  label="Наличные"
                                                  type="number"
                                                  control={control}
                                                  required="Обязательное поле" />

                                             <CustomInput name="cashless"
                                                  label="Безналичне"
                                                  type="number"
                                                  control={control}
                                                  required="Обязательное поле" />

                                             <CustomInput name="date"
                                                  label="Дата"
                                                  type="date"
                                                  control={control}
                                                  required="Обязательное поле" />

                                             {errors.exampleRequired && <span>Ошибка</span>}
                                        </ModalBody>
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
          </div >


     );
}


export default CashRegister