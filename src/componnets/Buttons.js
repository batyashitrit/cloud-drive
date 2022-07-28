import React from 'react'
import plus from "../assets/plus.png";
import { useState, useEffect } from "react";
import InsideFolder from './InsideFolder';


export default function Buttons(props) {
 
  return (
    <div  className='buttons'>
         <button className="addBtn" onClick={props.togglePopup}>
        תיקייה חדשה<img src={plus}></img>
      </button>
      <button className="addBtn" onClick={props.handleClick}>
        העלאת קובץ חדש<img src={plus}></img>
      </button>
    </div>

  )
}
