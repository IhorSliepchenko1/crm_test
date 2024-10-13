import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from 'react'
import style from './password.module.scss'

const Password = ({ handleChange, name }) => {
  const [type, setType] = useState(`password`)

  const changeTypePass = () => {
    setType(type === `password` ? `text` : `password`)
  }
  return (
    <div className={style.container}>
      <input name={name} type={type} onChange={handleChange} placeholder='Пароль' className={style.inputPasswrod} maxLength={20} />

      <span onClick={changeTypePass}>
        {type === `password` ? < FaEyeSlash /> : < FaEye />}
      </span>

    </div>
  )
}

export default Password