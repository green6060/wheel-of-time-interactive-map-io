import React from 'react'
import RainRing from './RainRing'
import { useRainRings } from './use-rain-ring'

export default function RainRings(props){
    const { rings } = useRainRings(props)
    return (
      <>
        {rings.map((ring, index) => {
          return <RainRing key={index} value={ring} />
        })}
      </>
    )
  }
