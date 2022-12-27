import React from 'react';
import PhoneEmail from '../Steps/PhoneEmail/PhoneEmail';
import Otp from '../Steps/Otp/Otp'
import {useState} from 'react'
const Authenticate = () => {
    const steps={
        1:PhoneEmail,
        2:Otp,
    }
    const [step,setStep] =useState(1);
    const Step= steps[step];
    const onNext = () => {
        setStep(step+1);
        console.log(step);
    }
  return (
    <div>
      <Step onNext={onNext}/>
    </div>
  );
}

export default Authenticate;
