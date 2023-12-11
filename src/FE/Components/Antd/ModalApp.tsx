import React, { CSSProperties, useState } from 'react';
import { Button, Modal } from 'antd';


const ModalApp = ({state,setState,children,title,classname,mask,styles,closeicon}:{state:boolean,setState: React.Dispatch<React.SetStateAction<boolean>>,children?:React.ReactNode,title?:string,classname?:string,mask?:boolean,styles?:any,closeicon?:boolean}) => {

  return (
    <>
   
      <Modal
      okButtonProps={{hidden:true}}
      cancelButtonProps={{hidden:true}}
        title={title}
        centered
        mask={mask}
      closeIcon={closeicon}
        maskClosable={mask}
        styles={styles}
        open={state}
        onOk={() => setState(false)}
        onCancel={() => setState(false)}
        className={classname}
      >
        {children}
      </Modal>
    </>
  );
};

export default ModalApp;