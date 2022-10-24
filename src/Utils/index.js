import { RiVideoAddLine } from 'react-icons/ri'
import { BiBell, BiUser } from 'react-icons/bi'

export const nav_list = [
  {id: 1, title: 'Publish', icon: <RiVideoAddLine />, path: '/upload'},
  {id: 2, title: 'Notifications', icon: <BiBell />, path: '/notifications'},
  {id: 3, title: 'Account', icon: <BiUser />, path: '/user'},
]