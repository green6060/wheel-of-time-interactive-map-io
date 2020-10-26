import { useFrame, useThree } from 'react-three-fiber'
import React, { useMemo } from 'react'

import vertority from './utils/vertority'

export const useRainRing = (rainring) => {
  const { camera } = useThree()
  useFrame(() => {
    if (!rainring.current || !rainring.current.material) {
      return
    }
    const mat = rainring.current.material
    if (camera.rotation.z >= 0 || camera.rotation.y <= 0) {
      mat.opacity = 0
      return
    }
    mat.opacity -= 0.01
    rainring.current.scale.x += 0.1
    rainring.current.scale.y += 0.1
    if ((rainring.current.material).opacity <= 0) {
      const vertor = vertority.random()
      rainring.current.position.set(vertor.x, vertor.y, vertor.z)
      mat.opacity = 0.2
      rainring.current.scale.x = 0
      rainring.current.scale.y = 0
    }
    rainring.current.rotation.x = camera.rotation.x
    rainring.current.rotation.y = camera.rotation.y
    rainring.current.rotation.z = camera.rotation.z
  })
}

export const useRainRings = ({ count = 50 }) => {
  const rings = useMemo(() => {
    return new Array(count).fill(0).map(() => {
      return {
        radius: Math.random() * 0.1,
        startpoint: vertority.random(),
      }
    })
  }, [count])
  return {
    rings,
  }
}