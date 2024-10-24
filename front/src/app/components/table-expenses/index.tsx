import { Table as TableNext, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, useDisclosure } from "@nextui-org/react";
import { formatToClientDate } from "../../../utils/format-to-client-date";
import { DecodeToken, ExpensesData } from "../../types";
import { useMemo, useState } from "react";
import { FaFileImage } from "react-icons/fa";
import { PiEmptyBold } from "react-icons/pi";
import { ExpensesUpdate } from "../expenses-update";
import { useCalendarInputDate } from "../../hooks/useCalendarInputDate";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { ModalDownloadFile } from "../base-modals/modal-download-file";
import { useAppSelector } from "../../hooks";
import { jwtDecode } from "jwt-decode";
import { ModalDelete } from "../base-modals/modal-delete";
import { useDeleteExpensesMutation, useLazyGetAllExpensesQuery } from "../../services/expensesApi";
import { useLazyGetBalanceQuery } from "../../services/apiBalance";

type Props = {
     data: ExpensesData
     isLoading: boolean
     limit: number
     page: number
     setPage: (page: number) => void
}


export const TableExpenses = ({ data, limit, isLoading, page, setPage }: Props) => {

     const [deleteExpenses] = useDeleteExpensesMutation()
     const [triggerGetAllExpenses] = useLazyGetAllExpensesQuery()
     const [triggerGetAllBalance] = useLazyGetBalanceQuery()

     const [dataOpenImage, setDataOpenImage] = useState({ path: '', name: '' })
     const [isModalOpen, setIsModalOpen] = useState(false);
     const [idCash, setIdCash] = useState(0)
     const [deleteDay, setDeleteDay] = useState(``)
     const { calendarDate } = useCalendarInputDate()

     const [dataUpdate, setDataUpdate] = useState({
          name: '',
          sum: 0,
          date: calendarDate(new Date(Date.now())),
          id: 0,
     })

     const [modalVariant, setModalVariant] = useState(0)

     const pages = useMemo(() => {
          return data?.count ? Math.ceil(data.count / limit) : 0;
     }, [data?.count, limit]);

     const loadingState = isLoading || data?.rows.length === 0 ? "loading" : "idle";

     const { isOpen, onOpen, onOpenChange } = useDisclosure();


     const { token } = useAppSelector((state) => state.auth)

     const decoded: DecodeToken = useMemo(() => {
          if (typeof token === `string`) {
               return jwtDecode(token);
          } else {
               return {
                    exp: 0,
                    iat: 0,
                    id: 0,
                    login: '',
                    role: '',
               }
          }
     }, [token])

     const deleteCashRegisterHandler = async (id: number) => {
          await deleteExpenses(id).unwrap()
          await triggerGetAllExpenses({ page, limit }).unwrap()
          await triggerGetAllBalance().unwrap()
     }

     const showModal = () => {
          setIsModalOpen(true);
     };

     const handleOk = (id: number) => {
          setIsModalOpen(false);
          deleteCashRegisterHandler(id)
     };

     const handleCancel = () => {
          setIsModalOpen(false);
     };


     return (

          <>
               {data?.rows.length === 0 ? <p>Список расходов пуст</p> : <TableNext
                    aria-label="Example table with client async pagination"
                    bottomContent={
                         pages > 0 ? (
                              <div className="flex w-full justify-center">
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
                         <TableColumn key="name">Наименование</TableColumn>
                         <TableColumn key="sum">Сумма</TableColumn>
                         <TableColumn key="typeName">Тип</TableColumn>
                         <TableColumn key="userName">Вносил</TableColumn>
                         <TableColumn key="check">Вложения</TableColumn>
                    </TableHeader>
                    <TableBody
                         items={data?.rows ?? []}
                         loadingContent={<Spinner />}
                         loadingState={loadingState}
                    >
                         {(item) => (
                              <TableRow key={item?.id}>
                                   {(columnKey) => <TableCell>
                                        {
                                             columnKey === `check` ?

                                                  <div className="flex justify-center items-center gap-4">
                                                       <button
                                                            className="cursor-pointer"
                                                            color={item.img !== null ? `primary` : `warning`}
                                                            onClick={() => {
                                                                 setModalVariant(1)
                                                                 setDataOpenImage(prev => ({ ...prev, path: item.img, name: item.name }))
                                                                 onOpen()
                                                            }}

                                                            disabled={item.img === null}
                                                       >
                                                            {item.img !== null ? <FaFileImage />
                                                                 : <PiEmptyBold />
                                                            }
                                                       </button>
                                                       <div
                                                            className="cursor-pointer flex flex-col gap-2"
                                                       >
                                                            <button onClick={() => {
                                                                 setModalVariant(2)
                                                                 setDataUpdate((prev) => (
                                                                      {
                                                                           ...prev,
                                                                           name: item.name,
                                                                           sum: +item.sum,
                                                                           date: calendarDate(item.date),
                                                                           id: item.id ?? 0
                                                                      }))
                                                                 onOpen()
                                                            }}>
                                                                 <MdModeEditOutline />
                                                            </button>

                                                            {decoded.role === `ADMIN` ?

                                                                 <button className="cursor-pointer" onClick={() => {
                                                                      setIdCash(item?.id ?? 0)
                                                                      showModal()
                                                                      setDeleteDay(formatToClientDate(item.date))
                                                                      setModalVariant(3)
                                                                 }}>
                                                                      <MdDelete
                                                                      />
                                                                 </button>


                                                                 :
                                                                 <></>
                                                            }

                                                       </div>
                                                  </div>

                                                  : columnKey === `date` ? formatToClientDate(item.date) : getKeyValue(item, columnKey)}
                                   </TableCell>}
                              </TableRow>
                         )}
                    </TableBody>

               </TableNext>}

               {

                    modalVariant === 3 ?
                         <ModalDelete
                              id={idCash}
                              handleOk={handleOk}
                              handleCancel={handleCancel}
                              isModalOpen={isModalOpen}
                              date={deleteDay}
                         /> :
                         modalVariant === 1
                              ? <ModalDownloadFile
                                   dataOpenImage={dataOpenImage}
                                   isOpen={isOpen}
                                   onOpenChange={onOpenChange}
                              /> :
                              <ExpensesUpdate
                                   page={page}
                                   limit={limit}
                                   isOpen={isOpen}
                                   onOpenChange={onOpenChange}
                                   name={dataUpdate.name}
                                   sum={dataUpdate.sum}
                                   date={dataUpdate.date}
                                   id={dataUpdate.id}
                              />}

          </>

     )
}

