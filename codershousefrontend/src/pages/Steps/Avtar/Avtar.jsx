import React, { useEffect } from 'react';
import Card from '../../../Components/shared/Card/Card';
import Button from '../../../Components/shared/Button/Button';
import styles from './Avtar.module.css';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAvtar } from '../../../store/activateSlice';
import { activate } from '../../../http';
import { setAuth } from '../../../store/authSlice';
import Loader from '../../../Components/shared/Loader/Loader';

const Name = ({ onNext }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('/images/profile1.jpg');
  const { name, avtar } = useSelector((state) => state.activate);
  // const [UnMounted, setUnMounted] = useState(false);

  function captureImage(e) {

    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      setImage(reader.result);
      dispatch(setAvtar(reader.result));
    };
    
  }

  async function submit() {
    setLoading(true);
    try {

      const { data } = await activate({ name, avtar });
      if (data.auth) {
        
        dispatch(setAuth(data));
      
      }
      
      console.log(data);
    } catch (err) {
      console.log(err);
    }
    finally{
      setLoading(false);
    }
  }

//  useEffect(() => {
//   return ()=>{
//     setUnMounted(true);
//   }
//  })

  if (loading)return <Loader message="Activation in progress"></Loader>
  return (
    <>
      <div className={styles.cardWrapper}>
        <Card title={`Hey ! ${name} `} icon="avtar">
          <p className={styles.subheading}>
            How's this photo ?
          </p>

          <div className={styles.avtarWrapper}>
            <img src={image} alt="avtar" className={styles.image} />
          </div>

          <div>
            <input
              onChange={captureImage}
              type="file" id="avatarImage" className={styles.avtarInput} />
            <label htmlFor="avatarImage" className={styles.avtarLabel}>
              choose a different image
            </label>
          </div>

          <div className={styles.actionButtonwrap}>
            <Button text="Next" onClick={submit}></Button>
          </div>

        </Card>
      </div>
    </>
  );
}

export default Name;
