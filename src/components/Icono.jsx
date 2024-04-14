import React from 'react'

const Icono = ({icon}) => {
  return (
    <img src={`${icon}.png`} alt={`${icon}`} className=""/>
  )
}

export default Icono