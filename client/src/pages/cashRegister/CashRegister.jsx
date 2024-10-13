import './CashRegister.scss'
// import Pagination from '@mui/material/Pagination';

import { useEffect, useState } from 'react'
import { useHandleChange } from '../../hooks/useHandleChange'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCashRegisterSlice } from '../../features/cashRegisterSlice/cashRegisterSlice';


const CashRegister = () => {

     const [data, setData] = useState({ page: 1, from: '', to: '' });
     const { handleChange } = useHandleChange(data, setData);


     const dispatch = useDispatch();
     const state = useSelector((state) => state.cashRegister);

     const get = async (page, from, to) => {
          try {
               dispatch(fetchCashRegisterSlice({ page, from, to }));
          } catch (err) {
               console.error("Ошибка:", err);
          }
     }

     useEffect(() => {
          get(data.page, data.from, data.to);
     }, [data.page, data.to]);



     return (

          <div className='cash-wrapper'>
               <div className='date'>
                    <div>
                         От: <input type="date" name="from" onChange={handleChange} />
                    </div>
                    <div>
                         До: <input type="date" name="to" onChange={handleChange} />
                    </div>
               </div>

               <table>
                    <thead>
                         <tr>
                              <th>
                                   Дата
                              </th>
                              <th>
                                   Наличные
                              </th>
                              <th>
                                   Безналичные
                              </th>
                              <th>
                                   Сумма
                              </th>
                         </tr>
                    </thead>

                    <tbody>
                         {state.data.rows && state.data.rows.map(item => (
                              <tr key={item.id} className="cash-register-item">
                                   {/* <td>{item.id}</td> */}
                                   <td>{new Date(item.date).toISOString().split('T')[0]}</td>
                                   <td>{item.cash}</td>
                                   <td>{item.cashless}</td>
                                   <td>{item.totalCash}</td>
                              </tr>
                         ))}
                    </tbody>

               </table>

               {/* <div className='pagination'>
                    <Pagination
                         count={Math.ceil(state.data.count / 20)}
                         page={data.page}
                         onChange={handleChange}
                         showFirstButton
                         showLastButton
                    />
               </div> */}
          </div>

     )
}

export default CashRegister