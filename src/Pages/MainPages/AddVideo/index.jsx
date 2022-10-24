import React from 'react'
import {getStorage, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage } from '../../../App.js' ;
import { API } from '../../../API';
import cls from './AddVideo.module.scss'
import ProgressWindow from '../../../Components/ProgressWindow/index.jsx';
import { useNavigate } from 'react-router-dom';

const AddVideo = () => {
  const [ active, setActive ] = React.useState(false)
  const [ title, setTitle ] = React.useState('')

  const Navigate = useNavigate()

  const uploading = (file) => {	
    console.log(file.type);
    if(file.type === 'video/mp4' || file.type === 'video/quicktime') {
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
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					API.postVideos({title: title, video: downloadURL})
				});
			})
      
      setActive(true)
      setTimeout(() => {
        setActive(false)
        Navigate('/')
      }, [50000])

    }else{
      alert(`format ${file.type} failed`)
    }
	}
  
  return (
    <div className={cls.upload}>
      <input 
        type="file" 
        id="upload"
        onChange={e => {
          uploading(e.target.files[0])
        }}
      />

      <input 
        type="text"
        placeholder='Title of video'
        onChange={e => setTitle(e.target.value)}
      />

      <label 
        htmlFor="upload"
      >
        <div>
          Upload video
        </div>
      </label>

      {active ? <ProgressWindow /> : ''}
    </div>
  )
}

export default AddVideo