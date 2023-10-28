import React from 'react';
import { Skeleton } from 'antd';

const SkeletonApp= ({width,rows,paragraph}:{width:string,rows:number,paragraph:boolean}) =>{ return (<Skeleton  paragraph={{rows:rows,width:width} || paragraph}  />)};

export default SkeletonApp;
