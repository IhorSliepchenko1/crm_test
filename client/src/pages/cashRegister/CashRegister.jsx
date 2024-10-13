import { useState, useMemo, useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCashRegisterSlice } from '../../features/cashRegisterSlice/cashRegisterSlice';
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure, Checkbox, Input, Link } from "@nextui-org/react";


const CashRegister = () => {
     const dispatch = useDispatch();
     const state = useSelector((state) => state.cashRegister);
     const [page, setPage] = useState(1);
     const { isOpen, onOpen, onOpenChange } = useDisclosure();

     useEffect(() => {
          dispatch(fetchCashRegisterSlice({ page: page }));

     }, [dispatch, page]);

     const pages = Math.ceil(state.data.count / 20);
     const items = useMemo(() => state.data.rows || [], [state.data.rows]);


     return (
          <div>

               <div className='flex flex-col btn'>
                    <Button color="success" onPress={onOpen}>
                         Внести кассу
                    </Button>

               </div>
               {state.status === `loading` ? <Spinner /> : <Table
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
                                        <AiFillEdit className='cursor-pointer' />
                                        <FaRegTrashAlt className='cursor-pointer' />
                                   </TableCell>
                              </TableRow>
                         ))}
                    </TableBody>
               </Table>}


               <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    placement="top-center"
               >
                    <ModalContent>
                         {(onClose) => (
                              <>
                                   <ModalHeader className="flex flex-col gap-1">Log in</ModalHeader>
                                   <ModalBody>
                                        <Input
                                             autoFocus

                                             label="Email"
                                             placeholder="Enter your email"
                                             variant="bordered"
                                        />
                                        <Input

                                             label="Password"
                                             placeholder="Enter your password"
                                             type="password"
                                             variant="bordered"
                                        />
                                        <div className="flex py-2 px-1 justify-between">
                                             <Checkbox
                                                  classNames={{
                                                       label: "text-small",
                                                  }}
                                             >
                                                  Remember me
                                             </Checkbox>
                                             <Link color="primary" href="#" size="sm">
                                                  Forgot password?
                                             </Link>
                                        </div>
                                   </ModalBody>
                                   <ModalFooter>
                                        <Button color="danger" variant="flat" onPress={onClose}>
                                             Close
                                        </Button>
                                        <Button color="primary" onPress={onClose}>
                                             Sign in
                                        </Button>
                                   </ModalFooter>
                              </>
                         )}
                    </ModalContent>
               </Modal>
          </div>


     );
}


export default CashRegister