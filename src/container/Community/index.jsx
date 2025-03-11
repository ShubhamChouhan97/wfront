import React from 'react'
import styles from './styles.module.css'
import logo from '../../assets/multiple-users-silhouette.png'
import comm from '../../assets/community.png'
function Community() {
  return (
    <div className={styles.communitydiv}>
      <div className={styles.top}>
        <p className={styles.p1}>Communities</p>
        <dic className={styles.addcomm}>
            <div className={styles.imgdiv}>
            <img src={logo} alt="" />
            </div>
           <p className={styles.p2}>New community</p>
        </dic>
      </div>

     <div className={styles.bottomcontainer}>
        <img src={comm} alt="community" />
        
        </div> 
    </div>
  )
}

export default Community
