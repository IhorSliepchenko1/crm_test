// import TextField from '@mui/material/TextField';
// import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
// import { useForm } from "react-hook-form"
// import { fetchLogin } from '../features/login/loginSlice';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import Select from '@mui/material/Select';
// import { useEffect, useState } from 'react';
// import { fetchRegister } from '../features/user/register';
import { fetchAuth } from '../features/user/authSlice';

// import { useDeleteOrPut } from '../hooks/useDeleteOrPut'
// import { fetchDelete } from '../features/deleteSlice';
// import { fetchUpdate } from '../features/updateSlice';
// import { useRef, useState } from 'react';
import { fetchCreateNewItem } from '../features/createNewItemSlice';
import AppRouter from '../http/routes';

const Login = () => {
     // const [file, setFile] = useState(null);
     // const fileInputRef = useRef();
     //      const [role, setRole] = useState('');

     //      const handleChange = (event) => {
     //           setRole(event.target.value);
     //      };

     //      const { register, handleSubmit } = useForm({
     //           defaultValues: {
     //                login: '',
     //                password: '',
     //                role: 'USER'
     //           }
     //      })
     const { token } = useSelector((state) => state.token)

     console.log(token);

     const dispatch = useDispatch()
     // const onSubmit = (data) => {
     //      console.log(data);

     //      dispatch(fetchRegister(data))
     // }

     dispatch(fetchAuth(token))



     // const test = useDeleteOrPut(`cash`, 11, token)

     // console.log(test);
     // const handleFileChange = (e) => {
     //      setFile(e.target.files[0]);
     // };

     const onSubmit = () => {

          // name, date, sum, typesExpenseId
          try {
               // const data = new FormData();
               // data.append("name", `Расходик`);
               // data.append("date", `11.10.2024`);
               // data.append("sum", 5500);
               // data.append("typesExpenseId", 3);

               // if (file) {
               //      data.append("img", file);
               // }

               // console.log(data.get(`name`));

               const data = {
                    name: `fgklfgjhklG`
               }


               dispatch(fetchCreateNewItem({ url: AppRouter.typeExpenses, data, token }));

               // setFile(null);
               // if (fileInputRef.current) {
               //      fileInputRef.current.value = "";
               // }
          } catch (error) {
               console.error(error);
          }
     };

     return (

          <>

               {/* <form onSubmit={handleSubmit(onSubmit)} className='form-section'>

                    <div className='input-slot'>
                         <TextField label="Логин" variant="standard" type="text" {...register("login")} />
                         <TextField label="Пароль" variant="standard" type="password" {...register("password")} />

                         <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Роль</InputLabel>
                              <Select
                                   {...register("role")}
                                   value={role}
                                   label="Role"
                                   onChange={handleChange}
                              >
                                   <MenuItem value={`ADMIN`}>Admin</MenuItem>
                                   <MenuItem value={`USER`}>User</MenuItem>
                              </Select>
                         </FormControl>

                    </div>
                    <div className='btn-submit'> <Button variant="contained" type="submit" style={{ outline: `none` }}>Войти</Button></div>

               </form> */}
               {/* <input
                    type="file"
                    name="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
               /> */}


               <button onClick={() => onSubmit()}>fgkj</button>
          </>
     )
}

export default Login