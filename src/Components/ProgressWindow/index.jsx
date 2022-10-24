import React from 'react'
import Progress from '../Progress'
import cls from './Progress.module.scss'

const ProgressWindow = () => {
  return (
    <div className={cls.progress}>
      <Progress />
      <p>
        Wait a moment, please don't reload page😉
      </p>
    </div>
  )
}

export default ProgressWindow