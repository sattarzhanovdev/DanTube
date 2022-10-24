import React from 'react'
import {getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage } from '../../../App.js' ;
import { API } from '../../../API';
import cls from './AddVideo.module.scss'
import ProgressWindow from '../../../Components/ProgressWindow/index.jsx';
import { useNavigate } from 'react-router-dom';

const AddVideo = () => {
  const [ active, setActive ] = React.useState(false)
  const [ title, setTitle ] = React.useState('')
  const [ url, setUrl ] = React.useState('')
  const [ file, setFile ] = React.useState(null)

  const Navigate = useNavigate()

  const uploading = () => {	
    console.log(file.type);
    const storageRef = ref(storage, `videos/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
    (snapshot) => {
      const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref)
        .then((downloadURL) => {
          setUrl(downloadURL)
          API.postVideos({title: title, video: downloadURL})
        });
    })
    
    setActive(true)
    setTimeout(() => {
      setActive(false)
      Navigate('/')
    }, [50000])
    
	}

  const openFile = (e) => {
    let reader = new FileReader();
    reader.onload = () => {
      let dataURL = reader.result;
      setUrl(dataURL)
    };
    reader.readAsDataURL(e);
  };

  console.log(url && url);
  

  return (
    <div className={cls.upload}>
      <input 
        type="file" 
        id="upload"
        onChange={e => {
          openFile(e.target.files[0])
          setFile(e.target.files[0])
        }}
      />

      <input 
        type="text"
        placeholder='Title of video'
        onChange={e => setTitle(e.target.value)}
      />

      <div className={cls.upload__btn}>
        <label 
          htmlFor="upload"
        >
          <div>
            Upload video
          </div>
        </label>
        <div className={cls.preview}>
          <p>*preview</p>
          <video
            src={url && url}
            controls
            autoPlay
          >
            <source src={url && url}/>
          </video>
        </div>
      </div>
    

      <div className={cls.publish}>
        <button onClick={() => uploading()}>
          Publish
        </button>
      </div>

      {active ? <ProgressWindow /> : ''}
    </div>
  )
}

export default AddVideo