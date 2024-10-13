import style from './login.module.scss'

const Login = ({ handleChange, name }) => {
     return (
          <div className={style.container}>
               <input name={name} type="text" onChange={handleChange} placeholder='Логин' className={style.inputLogin} />
          </div>
     )
}

export default Login