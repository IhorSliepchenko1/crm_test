import { useGetBalanceQuery } from "../../services/apiBalance";
import { Card, CardBody, Divider } from "@nextui-org/react";

export const Balance = () => {
     const { data } = useGetBalanceQuery()

     return (
          <div className="flex justify-start cash-register-card">
               <Card >
                    <CardBody>
                         <p className="p-2 flex justify-between gap-4"><span>Кассы:</span><span>{data?.totalCash.toFixed(2)} грн.</span></p>
                         <Divider />
                         <p className="p-2 flex justify-between gap-4"><span>Расходы:</span><span>{data?.totalExpenses.toFixed(2)} грн.</span></p>
                         <Divider />
                         <p className="p-2 flex justify-between gap-4"><span>Остаток:</span><span>{data?.balance.toFixed(2)} грн.</span></p>
                         <Divider />
                    </CardBody>
               </Card>
          </div>
     )
}
