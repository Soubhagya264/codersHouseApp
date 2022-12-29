import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useWebRTC } from '../../hooks/useWebRTC'
import { useParams, useNavigate } from 'react-router-dom';
import { getRoom } from '../../http';
import { useRef } from 'react';
import styles from './Room.module.css'

  const Room = () => {
  const navigate = useNavigate();
  const { id: roomId } = useParams();
  const user = useSelector(state => state.auth.user);
  
  const { clients, provideRef,handleMute } = useWebRTC(roomId, user);

  


  
  const [room, setRoom] = useState(null);
  const [isMute,setMute]=useState(true);


  useEffect(() => {
 
    handleMute(isMute,user.id)
    
  },[isMute])

  
  const handleManualLeave = () => {
    navigate("/rooms");
  }


  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) {
        return;
    }
    setMute((prev) => !prev);
};
  useEffect(() => {
    const fetchRoom = async () => {
      const {data} = await getRoom(roomId);
     
      setRoom((prev) => data);
    };
    fetchRoom();
  }, [roomId]);
  return (
    <>
      <div className="container">
        <button onClick={handleManualLeave} className={styles.goBack}>
          <img src="/images/arrow-left.png" alt=""></img>
          <span>{room?.topic}</span>
        </button>
      </div>
      <h1>All connected clients </h1>
      <div className={styles.clientWrap}>
        <div className={styles.header}>
          <h2 className={styles.topic}>Topics</h2>
          <div className={styles.actions}>
            <button className={styles.actionBtn}>
              <img src="/images/palm.png" />
            </button>
            <button
              onClick={handleManualLeave}
              className={styles.actionBtn}>
              <img src="/images/win.png" />
              <span>Leave</span>
            </button>
          </div>
        </div>
        <div className={styles.clientList}>
         {clients.map((client) => {
            var img_url=client.avtar;
            img_url=img_url.split("//");
            img_url[1]="//"
            img_url=img_url.join("");
            return (
              <div className={styles.client} key={client.id}>
                <div className={styles.userHead}>
                  <audio autoPlay
                    ref={(instance) => provideRef(instance, client.id)}
                  ></audio>
                  
                  <img className={styles.useAvatar} src={img_url} />
                  <button onClick={()=>handleMuteClick(client.id)} className={styles.micBtn}>
                    
                   {
                   
                    client.muted?<img src="/images/mic-mute.png" height="25px" width="30px" />:<img src="/images/mic.png" height="25px" width="30px" />
                   }
                    
                    
                  </button>
                </div>
                <h4>{client.name}</h4>
              </div>
            );
          })}
        </div>
      </div>
    </>
  )
}

export default Room


