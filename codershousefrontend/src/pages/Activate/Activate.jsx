import React from 'react'
import Name from "../Steps/Name/Name"
import Avatar from '../Steps/Avtar/Avtar'
import { useState } from 'react'


const steps = {
  1: Name,
  2: Avatar

}
const Activate = () => {
  const [step, setStep] = useState(1);
  const onNext = () => {
    setStep(step + 1);
  }  
  const Step = steps[step];
  return (

    <Step onNext={onNext}></Step>
  )
}

export default Activate
