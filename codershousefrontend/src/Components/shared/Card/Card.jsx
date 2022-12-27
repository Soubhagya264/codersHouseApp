import React from 'react';
import styles from  "./Card.module.css"
const Card = ({title,icon,children}) => {
  return (
    <div className={`${styles.card} card border-warning mb-3` }>
      <div className={ `${styles.headingWrapper} card body`}>
      <div class="card-title">
       {icon && <img src={`/images/${icon}.png`} alt="logo" />}
        {title && <h2 className={styles.heading}>{title}</h2>}  
      </div>
      </div>
      <p class="card-text">{children}</p>
    </div>
  );
}
export default Card;
