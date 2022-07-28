import React from "react";
import Popup from "./Popup";
import { useState, useEffect } from "react";
import axios from "axios";
import Buttons from "./Buttons";
import Folders from "./Folders";
import Files from "./Files";
import InsideFolder from "./InsideFolder";
import { useNavigate } from "react-router-dom";
import Haeder from "./Haeder";


export default function Main() {
  const [newFolderName, setNewFolderName] = useState("");
  const [presentFolder, setPresentFolder] = useState([]);
  const [presentFile, setPresentFile] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const togglePopup = () => {
    setIsOpen(!isOpen);
  };

  const submitPopup = () => {
    console.log(newFolderName);
    setIsOpen(!isOpen);

    axios
      .post("http://localhost:5000/cloud-drive/addNew", {
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

  const hiddenFileInput = React.useRef(null);

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
 
  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    const formData = new FormData();
    formData.append("File", fileUploaded);
    fetch("http://localhost:5000/cloud-drive/upload", {
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

  useEffect(() => {
    axios
      .get("http://localhost:5000/cloud-drive/getAllFolders")
      .then((response) => {
        console.log("result", response.data);
        setPresentFolder(response.data);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/cloud-drive/getAllFiles/folders`)
      .then((response) => {
        console.log("result", response.data);
        setPresentFile(response.data);
      });
  }, []);

<InsideFolder ></InsideFolder>
  return (
    <div>
      <Haeder></Haeder>
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
  <Files presentFolder={presentFolder} presentFile = {presentFile} setPresentFile = {setPresentFile}></Files>
    </div>
  );
}
