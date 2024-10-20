import { MdAdd } from "react-icons/md";
import { Table } from "../../app/components/table-cash-register";
import { useGetAllCashRegisterQuery } from "../../app/services/cashRegisterApi"
import { useState } from "react";
import { Button } from "../../app/components/button";
import { useDisclosure } from "@nextui-org/react";
import { Modal } from "../../app/components/modal-cash-register";

export const CashRegister = () => {
     const [page, setPage] = useState<number>(1)
     const [limit] = useState<number>(20)
     const { data, isLoading } = useGetAllCashRegisterQuery({ page, limit })
     const { isOpen, onOpen, onOpenChange } = useDisclosure();


     return (

          <>
               <Button
                    icon={<MdAdd />}
                    type={`button`}
                    color={`success`}
                    variant={"flat"}
                    onPress={onOpen}
                    className="mb-5"
               >Внести кассу</Button>
               <Table data={data} limit={limit} isLoading={isLoading} page={page} setPage={setPage} />
               <Modal isOpen={isOpen} onOpenChange={onOpenChange} page={page} limit={limit} />
          </>
     )
}
