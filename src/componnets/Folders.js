import React from 'react'
import folder from "../assets/folder.png";
import { useNavigate } from "react-router-dom";
import axios from 'axios';


export default function Folders(props) {
    const navigata = useNavigate();

    const del = (e) =>{
      console.log(e);
      axios
      .delete(`http://localhost:5000/cloud-drive/${e.target.innerText}`)
      .then((response) => {
        console.log("result", response.data);
        // setPresentFolder([...presentFolder, newFolderName]);
      })
      .catch((err) => {
        console.log(err);
        alert(err.response.data.msg);
      });
    }
const nav = (e) => {
    navigata("/insideFolder", { state: { folderName: e.target.innerText} });
  }
  return (
    <div>
            <p className="filesAndFoldeTitle">תיקיות</p>
      <div className="wrapFolders">
        {props.presentFolder.map((folderName) => (
          <div className="folders" onDoubleClick={nav}>
            {folderName}
            <img className="folderImg" src={folder}></img>
          </div>
        ))}
      </div>
    </div>
  )
}
