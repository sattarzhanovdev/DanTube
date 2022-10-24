import React from 'react'
import { API } from '../../API'
import cls from './Cards.module.scss'
import { Link, useParams } from 'react-router-dom';

const Cards = () => {
  const [ base, setBase ] = React.useState(null)
  const [ searched, setSearched ] = React.useState(null)

  const title_inp = localStorage.getItem('title')

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

        const filt = result.filter(item => {
          return item.title.toLowerCase().includes(title_inp.toLowerCase())
        })
      
        setBase(filt)
      })
  }, [title_inp, searched]) 

  return (
    <div className={cls.cards}>
      <div className={cls.videos}>
        {
          base && base?.map(({id, title, video}, i) => (
            <Link 
              to={`/video/${id}`}
              key={i}
            >
              <video src={video}>
                <source src={video} />
              </video>
              <p>
                {title}
              </p>
            </Link>
          )) 
        }
      </div>
    </div>
  )
}

export default Cards