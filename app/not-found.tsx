'use client'
import React, { Suspense } from 'react';
import { Button, Result } from 'antd';

const App: React.FC = () => (
    <section className='selectedScroll py-10' id='not-found'>
        <Suspense fallback="loading....">
  <Result
    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="primary" className='bg-green-500' onClick={()=>{window.history.back()}}>Go Back</Button>}
  />
  </Suspense>
  </section>
);

export default App;