import React from 'react'
import { useState, useEffect } from "react";
import axios from "axios"
import Main from './Main';
import {useLocation} from 'react-router-dom'
import Buttons from './Buttons';
import Popup from './Popup';
import Folders from './Folders';
import Files from './Files';
import Haeder from './Haeder';

export default function InsideFolder() {
    const { state } = useLocation();
const { folderName } = state;
    const [presentFolder,setPresentFolder] = useState([])
    const [isOpen, setIsOpen] = useState(false);
    const [newFolderName, setNewFolderName] = useState("");
    const [presentFile, setPresentFile] = useState([]);
console.log(`s${state.folderName}/${newFolderName}`);
    const togglePopup = () => {
      setIsOpen(!isOpen);
    };

    const submitPopup = () => {
        console.log(newFolderName);
        setIsOpen(!isOpen);
    
        axios
          .post(`http://localhost:5000/cloud-drive/addNew/${state.folderName}`,{
            folderName: newFolderName,
          })
          .then((response) => {
            console.log("result", response.data);
            setPresentFolder([...presentFolder, newFolderName]);
          })
          .catch((err) => {
            console.log(err);
            alert(err.response.data.msg);
          });
      };

      const handleChange = (event) => {
        const fileUploaded = event.target.files[0];
        const formData = new FormData();
        formData.append("File2", fileUploaded);
        fetch(`http://localhost:5000/cloud-drive/upload/inside/${state.folderName}`, {
          method: "POST",
          body: formData,
        })
          .then((result) => {
            console.log("sucsess", result.status);
            if (result.status == 410) alert("file size or extanction is not valid");
            else {
              setPresentFile([...presentFile, fileUploaded.name]);
            }
          })
    
          .catch((err) => {
            console.log(err.body);
            alert(err.response.data.msg);
          });
      };
   
    const hiddenFileInput = React.useRef(null);
   
     const handleClick = (event) => {
       hiddenFileInput.current.click();
     };
   
    useEffect (() =>{   
        axios.get(`http://localhost:5000/cloud-drive/getAllFolders/inside/${state.folderName}`)
        .then((response)=>{
            console.log("result", response.data);
            setPresentFolder(response.data)
        })
    },[])

    
  useEffect(() => {
    axios
      .get(`http://localhost:5000/cloud-drive/getAllFiles/inside/${state.folderName}`)
      .then((response) => {
        console.log("result", response.data);
        setPresentFile(response.data);
      });
  }, []);
    return (
        
        <div>
<Haeder folderName = {state.folderName}></Haeder>
        {console.log("state:" ,state)};
    <div className="main">
    <Buttons togglePopup={togglePopup} handleClick={handleClick} />
        {isOpen && (
          <Popup
            content={
              <div className="popupContent">
                <span className="popupTitle">תיקייה חדשה</span>
                <input
                  type="text"
                  onInput={(e) => {
                    setNewFolderName(e.target.value);
                  }}
                ></input>
                <button className="popupBtn" onClick={submitPopup}>
                  הוספה
                </button>
              </div>
            }
            handleClose={togglePopup}
          />
        )}
        <input
          type="file"
          style={{ display: "none" }}
          ref={hiddenFileInput}
          onChange={handleChange}
        ></input>
      </div>
      <Folders presentFolder={presentFolder}  togglePopup ={togglePopup} ></Folders>
  <Files presentFile = {presentFile}folderName = {state.folderName}></Files>
    </div>
  )
}
