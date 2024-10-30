
import React from 'react';
import { Empty } from 'antd';
import './PageNotFound.css'
const PageNotFound = () => {
  return (
    <div className='page'>
       <div className='page_not_found'>
       <h1>404</h1>
       <p>Page Not Found</p>
       </div>
     
      <Empty/>
    </div>
  );
};

export default PageNotFound;
