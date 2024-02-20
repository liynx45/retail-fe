import React, { useState } from 'react';
import { axiosPrivate } from '../../libs/axios';



const Payment: React.FC = () => {


  const hanlderTesting = async() => {
    const req = await axiosPrivate.get("/api/users/iqbal045/code")
    if (req.status === 200) {
      console.log("result code :", req.data)
    }
  }

  return (
    <div>
          <span>Payment</span>
          <button onClick={hanlderTesting}>Click me</button>
    </div>
    );
};

export default Payment;