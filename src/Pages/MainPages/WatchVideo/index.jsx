import React from 'react'
import { useParams } from 'react-router-dom'
import { API } from '../../../API'
import cls from './SeeVideo.module.scss'

const WatchVideo = () => {
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
    <div className={cls.watch}>
      {
        base ?
        <div>
          <video
            src={base && base.video}
            controls
            autoPlay
          >
            <source src={base && base.video} />
          </video>
          <div className={cls.title}>
            <h2>{base.title}</h2>
          </div>
        </div>
        :
        ''
      }

    </div>
  )
}

export default WatchVideo