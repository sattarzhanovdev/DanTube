import React from 'react'
import { API } from '../../API'
import {getStorage, getDownloadURL, ref, uploadBytesResumable} from "firebase/storage";
import cls from './Cards.module.scss'
import { storage } from '../../App';
import { Link, useParams } from 'react-router-dom';

const Cards = () => {
  const [ base, setBase ] = React.useState(null)
  const [ ID, setID ] = React.useState('')

  const {id} = useParams()


  React.useEffect(() => {
    API.getVideos()
      .then(res => {
        const result = Object.entries(res.data)
          .map(([id, item]) => {
            return {
              id: id,
              ...item
            }
          }).reverse()

        setBase(result)
      })
  }, [])

  const uploading = (file) => {	
		const storageRef = ref(storage, `videos/${file.name}`);
		const uploadTask = uploadBytesResumable(storageRef, file);
		
		uploadTask.on("state_changed",
			(snapshot) => {
				const progress =
					Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			},
			(error) => {
				alert(error);
			},
			() => {
				getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
					API.postVideos({video: downloadURL})
				});
			}
		);
	}
  return (
    <div>
      <input 
        type="file" 
        onChange={e => {
          uploading(e.target.files[0])
        }}
      />

      <div className={cls.videos}>
        {
          base && base.map(({id, video}, i) => (
            <Link 
              to={`/video/${id}`}
              key={i}
            >
              <video
                style={{
                  width: '400px',
                  height: '300px',
                  objectFit: 'cover'
                }}
              >
                <source src={video} />
              </video>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Cards