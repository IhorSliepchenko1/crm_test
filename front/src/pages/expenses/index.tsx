import { useState } from "react"
import { useGetAllExpensesQuery } from "../../app/services/ExpensesApi"
import { useGetAllTypeQuery } from "../../app/services/typeApi"
import { Button } from "../../app/components/button"
import { MdAdd } from "react-icons/md";
import { TableExpenses } from "../../app/components/table-expenses";

export const Expenses = () => {

     const [page, setPage] = useState<number>(1)
     const [limit] = useState<number>(20)
     // const { isOpen, onOpen, onOpenChange } = useDisclosure();

     const { data: types } = useGetAllTypeQuery()
     const { data: expenses, isLoading } = useGetAllExpensesQuery({ page, limit })

     console.log(expenses, types);


     return (
          <>
               <Button
                    icon={<MdAdd />}
                    type={`button`}
                    color={`danger`}
                    variant={"flat"}
                    // onPress={onOpen}
                    className="mb-5"
               >Добавить расход</Button>

               <TableExpenses data={expenses} limit={limit} isLoading={isLoading} page={page} setPage={setPage} />
               {/* <Modal isOpen={isOpen} onOpenChange={onOpenChange} page={page} limit={limit} /> */}
          </>
     )
}


// const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//      if (e.target.files !== null) {
//           setSelectedFile(e.target.files[0])
//      }
// }

// const onSubmit = async (data: User) => {
//      if (id) {
//           try {
//                const formData = new FormData()
//                data.name && formData.append(`name`, data.name)
//                data.email &&
//                     data.email !== user?.email &&
//                     formData.append(`email`, data.email)
//                data.dateOfBirth &&
//                     formData.append(
//                          `dateOfBirth`,
//                          new Date(data.dateOfBirth).toISOString(),
//                     )
//                data.bio && formData.append(`bio`, data.bio)
//                data.location && formData.append(`location`, data.location)
//                selectedFile && formData.append(`avatar`, selectedFile)

//                await upDateUser({ userData: formData, id }).unwrap()
//                onClose()
//           } catch (error) {
//                if (hasErrorField(error)) {
//                     setError(error.data.error)
//                }
//           }
//      }
// }