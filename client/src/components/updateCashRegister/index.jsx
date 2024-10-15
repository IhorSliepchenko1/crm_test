import Modals from "../modals"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { fetchCashRegisterSlice } from "../../features/cashRegisterSlice/cashRegisterSlice";
import AppRouter from "../../http/routes";
import { fetchUpdate } from "../../features/updateSlice";
import { useEffect } from "react";

const UpdateCashRegister = ({ page, isOpen, onOpenChange, cash, cashless, date, id, data }) => {
     const {
          handleSubmit,
          control,
          formState: { errors },
          reset
     } = useForm({
          mode: "onChange",
          reValidateMode: "onBlur",
          defaultValues: {
               cash: cash,
               cashless: cashless,
               date: date
          },
     })


     useEffect(() => {
          reset({
               cash: data.cash,
               cashless: data.cashless,
               date: data.date,
          });
     }, [data, reset]);

     const dispatch = useDispatch();
     const state = useSelector((state) => state);

     const onSubmit = async (data) => {

          try {
               const reqData = { cash: +data.cash, cashless: +data.cashless, date: data.date }

               await dispatch(fetchUpdate(
                    {
                         url: AppRouter.cashRegister,
                         id, name: "cash",
                         data: reqData,
                         token: state.auth.token
                    })).unwrap();
               
               dispatch(fetchCashRegisterSlice({ page: page }));
               reset();
               onOpenChange();

          } catch (err) {
               console.error("Ошибка:", err);
          }
     };

     return (
          <Modals
               isOpen={isOpen}
               onOpenChange={onOpenChange}
               onSubmit={onSubmit}
               handleSubmit={handleSubmit}
               control={control}
               errors={errors}
               reset={reset}
               title={`Редактировать`}
               data={data}
          />
     )
}

export default UpdateCashRegister