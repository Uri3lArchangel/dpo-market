import { Input } from 'antd'
import React from 'react'
import login from '../../../../../../styles/auth/login.module.css'

const Passowrd = () => {
  return (
    <Input.Password id='pass' placeholder='*******' bordered={false} className={login.passwordInput}  />
  )
}

export default Passowrd