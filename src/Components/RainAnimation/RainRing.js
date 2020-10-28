import React from 'react'
import { useRainRing } from './use-rain-ring'

export default function RainRing({ value }){
    const mesh = React.useRef()
    useRainRing(mesh)
    return (
      <mesh ref={mesh} scale={[0, 0, 0]} position={value.startpoint}>
        <circleGeometry attach="geometry" args={[value.radius, 128]} />
        <meshBasicMaterial attach="material" opacity={0.2} transparent={true} color="white" />
      </mesh>
    )
  }
