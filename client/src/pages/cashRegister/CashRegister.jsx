import { useState, useMemo, useEffect } from 'react'
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Button, useDisclosure } from "@nextui-org/react";
import { Spinner } from "@nextui-org/spinner";
import { useDispatch, useSelector } from 'react-redux'
import { fetchCashRegisterSlice } from '../../features/cashRegisterSlice/cashRegisterSlice';
import { AiFillEdit } from "react-icons/ai";
import { FaRegTrashAlt } from "react-icons/fa";
import DepositCashRegister from '../../components/depositCashRegister/index';
import UpdateCashRegister from '../../components/updateCashRegister/index';
import { useDate } from '../../hooks/useDate';
import DeleteCashRegister from '../../components/deleteCashRegister';


const CashRegister = () => {
     const dispatch = useDispatch();
     const state = useSelector((state) => state);

     const [page, setPage] = useState(1);
     const { validDate } = useDate()
     const [modalVariant, setModalVariant] = useState(0)
     const [selectedData, setSelectedData] = useState({
          id: 0,
          cash: 0,
          cashless: 0,
          date: new Date(Date.now()),
     });

     const { onOpen, isOpen, onOpenChange } = useDisclosure()

     useEffect(() => {
          dispatch(fetchCashRegisterSlice({ page: page }));
     }, [dispatch, page]);

     const pages = Math.ceil(state.cashRegister.data.count / 20);
     const items = useMemo(() => state.cashRegister.data.rows || [], [state.cashRegister.data.rows]);


     const openDeposit = () => {
          setModalVariant(0)
          setModalVariant(1)
          onOpen()
     }
     const openUpdate = () => {
          setModalVariant(0)
          setModalVariant(2)
          onOpen()
     }
     const openDelete = () => {
          setModalVariant(0)
          setModalVariant(3)
          onOpen()
     }


     return (
          <div>
               <div className='table-container'>
                    <div className='flex flex-col btn'>
                         <Button color="success" onPress={openDeposit}>
                              Внести кассу
                         </Button>
                    </div>

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

                         <TableBody
                              loadingContent={<Spinner label="Loading..." color="warning" />}
                              loadingState={state.cashRegister.status === "loading" ? "loading" : "idle"}
                         >
                              {items.map((item) => (
                                   <TableRow key={item.id}>
                                        <TableCell>{validDate(item.date).defaultDate}</TableCell>
                                        <TableCell>{item.cash}</TableCell>
                                        <TableCell>{item.cashless}</TableCell>
                                        <TableCell>{item.totalCash}</TableCell>
                                        <TableCell className='btn-container'>

                                             <div onClick={() => {
                                                  setSelectedData((prev) => ({ ...prev, cashless: +item.cashless, cash: +item.cash, date: validDate(item.date).calendar, id: item.id }))
                                                  openUpdate()
                                             }}>
                                                  <AiFillEdit className='cursor-pointer' />
                                             </div>

                                             <div onClick={() => {
                                                  setSelectedData((prev) => ({ ...prev, id: item.id }))
                                                  openDelete()
                                             }}>
                                                  <FaRegTrashAlt className='cursor-pointer' />
                                             </div>


                                        </TableCell>
                                   </TableRow>
                              ))}
                         </TableBody>
                    </Table>
               </div>

               {

                    modalVariant === 3 ? <DeleteCashRegister isOpen={isOpen} onOpenChange={onOpenChange} page={page} id={selectedData.id} /> :
                         modalVariant === 1
                              ? <DepositCashRegister isOpen={isOpen} page={page} onOpenChange={onOpenChange} data={selectedData} />
                              : <UpdateCashRegister isOpen={isOpen} page={page} onOpenChange={onOpenChange} id={selectedData.id} data={selectedData} />
               }



          </div>


     );
}


export default CashRegister