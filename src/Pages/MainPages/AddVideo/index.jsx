import React from 'react'
import {getStorage, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import { storage } from '../../../App.js' ;
import { API } from '../../../API';
import cls from './AddVideo.module.scss'

const AddVideo = () => {
  const [ active, setActive ] = React.useState(false)

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
					API.postVideos({video: downloadURL})
				});
			})
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

      <label 
        htmlFor="upload"
      >
        <div>
          Upload  
        </div>
      </label>

      <button
        onClick={() => {
          setActive(true)
        }}
      >
        Send
      </button>
    </div>
  )
}

export default AddVideo