import React from 'react'
import Progress from '../Progress'
import cls from './Progress.module.scss'

const ProgressWindow = () => {
  return (
    <div className={cls.progress}>
      <Progress />
    </div>
  )
}

export default ProgressWindow