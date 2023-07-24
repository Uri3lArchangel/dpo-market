'use client'
import React from 'react';
import { Button, Result } from 'antd';

const App = ({reset,errorName,errorCause}:any) => {
    return(
         <Result
         
    status={"500"}
    title={errorName}
    subTitle={errorCause}
    extra={<Button type="primary" className='bg-red-500' onClick={()=>{reset()}}>Retry</Button>}
  />
    )
 
};

export default App;