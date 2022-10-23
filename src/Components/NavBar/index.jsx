import React from 'react'
import cls from './NavBar.module.scss'
import { FiSearch } from 'react-icons/fi'
import { nav_list } from '../../Utils'
import { Link } from 'react-router-dom'
import { BiMenu } from 'react-icons/bi'

const NavBar = () => {
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
        <li>
          <BiMenu />
        </li>
      </ul>
    </div>
  )
}

export default NavBar