import React from 'react'
import cls from './NavBar.module.scss'
import { FiSearch } from 'react-icons/fi'
import { nav_list } from '../../Utils'
import { Link } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'
import Sidebar from '../Sidebar'
import { API } from '../../API'

const NavBar = () => {
  const [ active, setActive ] = React.useState(false)
  const [ title_inp, setTitle_inp ] = React.useState('')
  const [ base, setBase ] = React.useState(null)

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

  localStorage.setItem('title', title_inp)

  return (
    <div className={cls.navBar}>
      <ul className={cls.logo}>
        <Link to={'/'}>
          <img
            src="/img/logo.svg"
            alt="logo"
          />
        </Link>
      </ul>
      <ul className={cls.search}>
        <input 
          type="text" 
          placeholder='Search'
          onChange={e => setTitle_inp(e.target.value)}
        />
        <button>
          <FiSearch />
        </button>
      </ul>
      <ul className={cls.list}>
        {
          nav_list.map(({id, icon, path}) => (
            <li 
              key={id} 
            >
              <Link to={path}>
                {icon}
              </Link>
            </li>
          ))
        }
      </ul>
      <ul className={cls.bars}>
        <li onClick={() => setActive(true)}>
          <BiMenu />
        </li>
      </ul>
      <Sidebar 
        active={active} 
        setActive={setActive} 
      />
    </div>
  )
}

export default NavBar