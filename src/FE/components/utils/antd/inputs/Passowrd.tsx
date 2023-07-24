import { Input, InputRef } from 'antd'
import React from 'react'
import login from '../../../../../../styles/auth/login.module.css'

const Password = ({id,onChange}:{id?:string,onChange?: React.ChangeEventHandler<HTMLInputElement>}) => {
  return (
    <Input.Password id={id} minLength={8} onChange={onChange} required placeholder='*******' bordered={false} className={login.passwordInput}  />
  )
}

export default Password