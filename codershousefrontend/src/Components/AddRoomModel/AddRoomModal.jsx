import React, { useState } from 'react'
import styles from "./AddRoomModal.module.css";
import TextInput from "../shared/TextInput/TextInput"
import { createRoom as create } from '../../http';
import { useNavigate } from 'react-router-dom';
const AddRoomModal = ({ onClose }) => {
  const navigate=useNavigate();
  const createRoom=async ()=>{
    try{ 
      if (!topic){
        return;
      }
        const {data}=await create({topic,roomType});
        navigate(`/room/${data.id} `);
    }catch(err){
      console.log(err.message);
    }

  };

  const [roomType, setRoomType] = useState('open');
  const [topic, setTopic] = useState('');
  return (
    <div className={`${styles.modalMask} modal`}>
    
      <div className={`${styles.modalBody} modal-content`}>
        <button onClick={onClose} className={styles.closeButton}>
          <img src="/images/close.png" />
        </button>
        <div className={styles.modalHeader}>
          <h3 className={styles.heading}>Enter the topic to be disscussed</h3>
          <TextInput fullwidth="true" value={topic} onChange={(e) => setTopic(e.target.value)} />
          <h3 className={styles.Subheading}>Room Types</h3>
          <div className={styles.roomTypes}>
            <div
              onClick={() => setRoomType("open")}
              className={`${styles.typeBox} ${roomType === "open" ? styles.active : ''} `}   >
              <img src="/images/globe.png" style={{ height: "45px", width: "45px" }} alt="globe" />
              <span>Open</span>
            </div>
            <div
              onClick={() => setRoomType("social")}
              className={`${styles.typeBox} ${roomType === "social" ? styles.active : ''} `}>
              <img src="/images/social.png" style={{ height: "50px", width: "50px" }} alt="globe" />
              <span>Social</span>
            </div>
            <div
              onClick={() => setRoomType("private")}
              className={`${styles.typeBox} ${roomType === "private" ? styles.active : ''} `}>
              <img src="/images/lock.png" style={{ height: "50px", width: "50px" }} alt="globe" />
              <span>Private</span>
            </div>
          </div>
        </div>
        <div className={styles.modalFooter}>
          <h3>Start a room,open to everyone</h3>
          <button
          onClick={createRoom}
           className={styles.modalBtn} >Let's go</button>
        </div>
      </div>
    </div>
  )
}

export default AddRoomModal
