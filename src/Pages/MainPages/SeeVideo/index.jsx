import React from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../../../API'
import cls from './SeeVideo.module.scss'

const SeeVideo = () => {
  const [ base, setBase ] = React.useState('')

  const {id} = useParams()

  React.useEffect(() => {
    API.getVideo(id)
      .then(res => {
        setBase(res.data)
        console.log(res.data);
      })
  }, [])

  return (
    <div>
      {
        base ?
        <video
          style={{
            width: '400px',
            height: '100%',
            objectFit: 'cover'
          }}
          controls
          autoPlay
        >
          <source src={base && base.video} />
        </video>
        :
        ''
      }
    </div>
  )
}

export default SeeVideo