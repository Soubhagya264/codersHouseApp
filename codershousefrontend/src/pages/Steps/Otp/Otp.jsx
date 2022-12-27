import React, { useEffect } from 'react';
import Card from '../../../Components/shared/Card/Card';
import Button from '../../../Components/shared/Button/Button'
import TextInput from '../../../Components/shared/TextInput/TextInput'
import {useState} from "react";
import { verifyOtp,api } from '../../../http';
import { useSelector } from 'react-redux';
import {setAuth} from '../../../store/authSlice'
import { useDispatch } from 'react-redux';
import styles from './Otp.module.css';

const Otp = () => {
  const [otp,setOtp] = useState('');
  const {phone,hash}= useSelector((state) =>state.auth.otp);
  const dispatch = useDispatch();


  const submit=async () => {
   try{
    if(!otp || !phone){
      return;
    }
       const {data} =await verifyOtp({
        'otp':otp,'phone':phone,'hash':hash
       });
       
       
      dispatch(setAuth(data))
    
      
   }catch (err){
       console.log(err.stack);
   }
  };

 

  return (
    <>
      <div className={styles.cardWrapper}>
       <Card title="Enter Otp here" icon="lock">
        <TextInput value={otp} onChange={(e)=>setOtp(e.target.value)} type="text"/>
        <div>
              <div className={styles.actionButtonwrap}>
              <Button text="Next" onClick={submit}></Button>
              </div>
              <p className={styles.buttoomPara}>
                By entering your email, you're agreeing to our terms of service and privacy Policy.
              </p>
            </div>        
      </Card>
      </div>
    </>
  );
}

export default Otp;
