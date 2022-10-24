import React from 'react'
import { API } from '../../API'
import cls from './Cards.module.scss'
import { Link, useParams } from 'react-router-dom';

const Cards = () => {
  const [ base, setBase ] = React.useState(null)

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
  
  return (
    <div>
      <div className={cls.videos}>
        {
          base && base.map(({id, video}, i) => (
            <Link 
              to={`/video/${id}`}
              key={i}
            >
              <video>
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