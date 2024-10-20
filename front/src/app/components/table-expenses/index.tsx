import { Table as TableNext, TableHeader, TableColumn, TableBody, TableRow, TableCell, Pagination, Spinner, getKeyValue, Modal, ModalContent, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { formatToClientDate } from "../../../utils/format-to-client-date";
import { Expenses } from "../../types";
// import { MdDelete } from "react-icons/md";
// import { MdModeEditOutline } from "react-icons/md";
// import { Tooltip } from 'antd';
// import { ModalDelete } from "../modal-delete";
// import { ModalUpdate } from "../modal-cash-register-update";
import { useMemo, useState } from "react";
import { BASE_URL } from "../../../constants";
import { useDownloadImage } from "../../hooks/useDownloadImage";
// import { jwtDecode } from "jwt-decode";
// import { useAppSelector } from "../../hooks";
import { FaFileImage } from "react-icons/fa";
import { PiEmptyBold } from "react-icons/pi";
import { useTheme } from "../../../theme-provider";

type Props = {
     data: { rows: Expenses[], count: number } | null | undefined
     isLoading: boolean
     limit: number
     page: number
     setPage: (page: number) => void
}



export const TableExpenses = ({ data, limit, isLoading, page, setPage }: Props) => {
     // const { token } = useAppSelector((state) => state.auth)
     // const decoded: DecodeToken = jwtDecode(token as string);
     const { theme } = useTheme()
     // const [imageModal, setImageModal] = useState(false)
     const [dataOpenImage, setDataOpenImage] = useState({ path: '', name: '' })

     const pages = useMemo(() => {
          return data?.count ? Math.ceil(data.count / limit) : 0;
     }, [data?.count, limit]);

     const loadingState = isLoading || data?.rows.length === 0 ? "loading" : "idle";

     const { downloadFile } = useDownloadImage()
     const { isOpen, onOpen, onOpenChange } = useDisclosure();

     return (

          <>

               {
                    data?.rows.length === 0 ? <p>Список касс пуст</p> : <TableNext
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
                              <TableColumn key="userName">Пользователь</TableColumn>
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
                                                       <Button
                                                            className="cursor-pointer"
                                                            color={item.img !== null ? `primary` : `warning`}
                                                            isIconOnly
                                                            onClick={() => {
                                                                 setDataOpenImage(prev => ({ ...prev, path: item.img, name: item.name }))
                                                                 onOpen()
                                                            }}

                                                            disabled={item.img === null}
                                                       >
                                                            {item.img !== null ? <FaFileImage />
                                                                 : <PiEmptyBold />
                                                            }
                                                       </Button>
                                                       : columnKey === `date` ? formatToClientDate(item.date) : getKeyValue(item, columnKey)
                                             }



                                        </TableCell>}
                                   </TableRow>
                              )}
                         </TableBody>

                    </TableNext>
               }


               <Modal isOpen={isOpen} onOpenChange={onOpenChange}
                    className={`${theme} text-foreground-500`}
                    placement="top-center">
                    <ModalContent className="p-3">
                         {(onClose) => (
                              <>

                                   <div className="flex justify-center">
                                        <img src={`${BASE_URL}/${dataOpenImage.path}`} width={300} height={300} />
                                   </div>


                                   <ModalFooter className="flex justify-between">
                                        <Button color="primary" onPress={() => {
                                             downloadFile(`${BASE_URL}/${dataOpenImage.path}`, dataOpenImage.name)
                                             onClose()
                                        }}>
                                             Скачать
                                        </Button>
                                        <Button color="danger" onPress={onClose}>
                                             Закрыть
                                        </Button>

                                   </ModalFooter>
                              </>
                         )}
                    </ModalContent>
               </Modal>
          </>

     )
}
// data?.rows[0].img