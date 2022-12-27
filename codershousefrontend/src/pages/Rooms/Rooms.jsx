import React, { useEffect } from 'react'
import RoomCard from '../../Components/RoomCard/RoomCard';
import styles from './Rooms.module.css'
import { useState } from 'react';
import AddRoomModal from '../../Components/AddRoomModel/AddRoomModal';
import { getAllRooms } from '../../http';

const Rooms = () => {
  const [rooms,setRooms]=useState([]);

  useEffect(()=>{
    const fetchRoom=async()=>{
      const {data}=await getAllRooms();
      setRooms(data);
      
    }

    fetchRoom();
  },[])
  const [showModal,setShowModal]=useState(false);
  const openModal=()=>{
    setShowModal(true);
  }
  return (
    <>
      <div className="container">
        <div className={styles.roomsHeader}>
          <div className={styles.left}>
            <span className={styles.heading}>
              All voice rooms
            </span>
            <div className={styles.searchBox}>
              <img src="/images/search-icon.png" alt="Search"></img>
              <input type="text" className={styles.searchInput} />
            </div>
          </div>
          <div className={styles.right}>
            <button onClick={openModal} className={styles.startRoomButton}>
              <span>ADD ROOM</span>
            </button>
          </div>
        </div>

        <div className={styles.roomList}>
        {rooms.map((room) => (
                        <RoomCard key={room.id} room={room} />
                    ))}
        
        </div>
      </div>

      {showModal && <AddRoomModal onClose={()=>setShowModal(false)}></AddRoomModal>}
    </>
  )
}

export default Rooms