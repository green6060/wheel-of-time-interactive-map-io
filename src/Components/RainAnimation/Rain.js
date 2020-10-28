import React from 'react'
import Raindrop from './Raindrop'
import { useRain } from './use-rain'

export default function Rain(props){
    const { lines } = useRain(props)
    return (
      <>
        {lines.map((raindrop, index) => {
          return <Raindrop key={index} value={raindrop} />
        })}
      </>
    )
  }
  
