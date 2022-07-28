import React from 'react'
import pdf from "../assets/pdf.png";
import jpg from "../assets/jpg.png";
import txt from "../assets/txt.png";
import axios from 'axios';
import { useState } from 'react';

export default function Files(props) {

    function isValidExtantions(fileName) {
        console.log(fileName);
        let ext = fileName ? fileName.slice(fileName.lastIndexOf(".") + 1) : "";
        return ["pdf", "txt", "jpg"].find((char) => ext == char) ? ext : false;
      }

      const del = (e) =>{
        console.log(e.nativeEvent.path[1].innerText.slice(0,1));
        axios
        .delete(`http://localhost:5000/cloud-drive/${e.nativeEvent.path[1].innerText.slice(1)}`)
        // ${props.folderName}
        .then((response) => {
          console.log("result", [...props.presentFile]);
          let allFiles =[...props.presentFile]
          let delFile = allFiles.splice(allFiles.indexOf(e.nativeEvent.path[1].innerText),1)
          props.setPresentFile(allFiles)

        })
        .catch((err) => {
          console.log(err);
          alert(err.response.data.msg);
        });
      }
  return (
    <div>
<p className="filesAndFoldeTitle">קבצים</p>
<div className="wrapFiles">
  {props.presentFile.map((fileName) => (
    <div className="files"> <button className='delete' onClick={del}>x</button>
      {fileName}
      {isValidExtantions(fileName) == "pdf" ? (
        <img className="folderImg" src={pdf}></img>
      ) : (
        <div></div>
      )}
      {isValidExtantions(fileName) == "jpg" ? (
        <img className="folderImg" src={jpg}></img>
      ) : (
        <div></div>
      )}
      {isValidExtantions(fileName) == "txt" ? (
        <img className="folderImg" src={txt}></img>
      ) : (
        <div></div>
      )}
    </div>
  ))}
</div>
    </div>
  )
}
