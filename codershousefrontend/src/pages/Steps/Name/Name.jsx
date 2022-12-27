import React from 'react';
import Card from '../../../Components/shared/Card/Card';
import TextInput from '../../../Components/shared/TextInput/TextInput';
import Button from '../../../Components/shared/Button/Button';
import styles from './Name.module.css';
import { useState } from 'react';
import { useDispatch,useSelector } from 'react-redux';
import { setName } from '../../../store/activateSlice';


const Name = ({onNext}) => {
  const {name}=useSelector((state)=>state.activate);
  const dispatch=useDispatch();
  const [fullname,setfullname]=useState(name);
  const submit =() => {
    if (!fullname){
      return;
    }
    dispatch(setName(fullname));
    onNext();

  };
  return (
    <>
    <div className={styles.cardWrapper}>
      <Card title="What is your full name" icon="name">
        <TextInput value={fullname} onChange={(e)=>setfullname(e.target.value)} type="text"/>
        <div>
                <p className={styles.buttoomPara}>
                      Please use your real name
                </p>
              <div className={styles.actionButtonwrap}>
              <Button text="Next" onClick={submit}></Button>
              </div>
            </div>        
      </Card>
      </div>
    </>
  );
}

export default Name;
