import { MdAdd } from "react-icons/md";
import { Table } from "../../app/components/table-cash-register";
import { useGetAllCashRegisterQuery } from "../../app/services/cashRegisterApi"
import { useState } from "react";
import { Button } from "../../app/components/button";
import { useDisclosure } from "@nextui-org/react";
import { CashRegisterDeposit } from "../../app/components/cash-register-deposit";
import { Balance } from "../../app/components/balance";

export const CashRegister = () => {
     const [page, setPage] = useState<number>(1)
     const [limit] = useState<number>(20)
     const { data, isLoading } = useGetAllCashRegisterQuery({ page, limit })
     const { isOpen, onOpen, onOpenChange } = useDisclosure();


     return (

          <>
               <div className="flex justify-between" style={{ marginBottom: 10 }}>

                    <Button
                         icon={<MdAdd />}
                         type={`button`}
                         color={`success`}
                         variant={"flat"}
                         onPress={onOpen}
                         className="mb-5"
                    >Внести кассу</Button>
                    <Balance />
               </div>
               <Table data={data} limit={limit} isLoading={isLoading} page={page} setPage={setPage} />
               <CashRegisterDeposit isOpen={isOpen} onOpenChange={onOpenChange} page={page} limit={limit} />
          </>
     )
}
