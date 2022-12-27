import React from 'react';
import Card from '../../../../Components/shared/Card/Card'
import Button from '../../../../Components/shared/Button/Button'
import TextInput from '../../../../Components/shared/TextInput/TextInput'
import styles from "../../PhoneEmail/PhoneEmail.module.css"
import { useState } from 'react'
const Email = ({onNext}) => {
  const [email,setEmail] = useState('');
  return (
    <Card title="Enter Email id !" icon="mail">
    <TextInput value={email} onChange={(e)=>setEmail(e.target.value)} type="email"/>
    <div>
          <div className={styles.actionButtonwrap}>
          <Button text="Next" onClick={onNext}></Button>
          </div>
          <p className={styles.buttoomPara}>
            By entering your email, you're agreeing to our terms of service and privacy Policy.
          </p>
        </div>        
      </Card>
  );
}

export default Email;
