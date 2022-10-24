import React from 'react'
import { Link } from 'react-router-dom'
import { nav_list } from '../../Utils'
import cls from './Sidebar.module.scss'
import {AiOutlineClose} from 'react-icons/ai'

const Sidebar = ({active, setActive}) => {
  return (
    <div className={active ? cls.sidebar : cls.sidebar_none}>
      <ul className={cls.close}>
        <li onClick={() => setActive(false)}>
          <AiOutlineClose />
        </li>
      </ul>
      <ul className={cls.list}>
        {
          nav_list.map(({id, title, icon, path}) => (
            <li 
              key={id}
              onClick={() => setActive(false)}
            >
              <Link to={path}>
                 {title} <span>{icon}</span>
              </Link>
            </li>
          ))
        }
      </ul>
    </div>
  )
}

export default Sidebar