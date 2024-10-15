import Modals from "../modals/index"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux";
import { fetchCashRegisterSlice } from "../../features/cashRegisterSlice/cashRegisterSlice";
import AppRouter from "../../http/routes";
import { fetchCreateNewItem } from "../../features/createNewItemSlice";
import { useDate } from "../../hooks/useDate";
import { useState } from "react";

const DepositCashRegister = ({ page, isOpen, onOpenChange }) => {
     const { validDate } = useDate()
     const [error, setError] = useState('')

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
               date: validDate(new Date(Date.now())).calendar
          },
     })

     const dispatch = useDispatch();
     const state = useSelector((state) => state);

     const onSubmit = async (data) => {

          try {
               const reqData = { cash: +data.cash, cashless: +data.cashless, date: data.date }

               await dispatch(fetchCreateNewItem({ url: AppRouter.cashRegisterDeposit, name: "cash", data: reqData, token: state.auth.token })).unwrap();
               dispatch(fetchCashRegisterSlice({ page: page }));
               reset();
               onOpenChange();

          } catch (err) {
               setError(err.error)
               console.error("Ошибка:", err);
          }
     };

     return (
          <Modals isOpen={isOpen} onOpenChange={onOpenChange} onSubmit={onSubmit} handleSubmit={handleSubmit} control={control} errors={errors} reset={reset} title={`Внести кассу`} error={error} setError={setError} />
     )
}

export default DepositCashRegister