import React from 'react';
import styles from "./RoomCard.module.css";
import {useNavigate} from "react-router-dom";
const RoomCard = ({room}) => {
  const Navigate=useNavigate();
  return (
    
    <div
      onClick={()=>{
        Navigate(`/room/${room.id}`);
      }

      }
     className={`${styles.card} card border-warning mb-3`}>
      <h4 className={styles.topic}>{room.topic}</h4>
      <div className={`${styles.speakers} ${room.speakers.length===1?styles.singleSpeaker:''} `}>
        <div className={styles.avatars}>
         {room.speakers.map(speaker=>(
          
            
            <img src={speaker.avtar} key={speaker.id} alt="speaker-avtar"/>
         ))}
        </div>
        <div className={styles.name}>
        {room.speakers.map(speaker=>(
             <div key={speaker.id} className={styles.nameWrapper}>
                <span>{speaker.name}</span>
             </div>
         ))}
        </div>
      </div>

      <div className={styles.peopleCount}>
        <span>{room.totalPeople}</span>
        <img src="/images/group.png" alt="user-icon" />
      </div>
    </div>
    
    
    
  );
}

export default RoomCard;
