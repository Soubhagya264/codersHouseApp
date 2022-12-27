import React from 'react'
import Card from '../../../../Components/shared/Card/Card'
import Button from '../../../../Components/shared/Button/Button'
import TextInput from '../../../../Components/shared/TextInput/TextInput'
import styles from "../../PhoneEmail/PhoneEmail.module.css"
import  axios  from 'axios'
import { useState } from 'react'
import { sendOtp } from '../../../../http'
import {useDispatch} from "react-redux";
import { setOtp } from '../../../../store/authSlice'
const Phone = ({onNext}) => {
  const [phoneNumber,setPhoneNumber] = useState('');
  const dispatch=useDispatch();
    async function submit(){
    const {data}=await sendOtp({"phone":phoneNumber});
    console.log(data);


    dispatch(setOtp({
      phone:data.phone,hash:data.hash
    }));

    
    console.log(data);
    onNext();
  }
  return (
   
    <Card title="Enter phone number !" icon="phone">
    <TextInput value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)} type="phone"/>
        <div>
          <div className={styles.actionButtonwrap}>
          <Button text="Next" onClick={submit}></Button>
          </div>
          <p className={styles.buttoomPara}>
            By entering your phone number, you're agreeing to our terms of service and privacy Policy.
          </p>
        </div>     
      </Card>

  )
}

export default Phone
