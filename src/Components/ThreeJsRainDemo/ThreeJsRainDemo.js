import React, { useRef } from 'react'
import { Canvas, extend } from 'react-three-fiber'
import meshline from 'threejs-meshline'
import { useRainRing, useRainRings, } from './use-rain-ring'
import { useRain, useRaindrop, } from './use-rain'
import { setMap } from '../../Helper/common'

export const SKY_COLOR = '#1677b3'

extend(meshline)

export const Raindrop = (props) => {
  const raindrop = useRef()
  const mat = useRef()
  useRaindrop(raindrop, mat, { value: props.value })
  return (
    <>
      <mesh ref={raindrop}>
        <meshLine attach="geometry" vertices={props.value.vertices} />
        <meshLineMaterial
          attach="material"
          ref={mat}
          transparent={true}
          depthTest={false}
          sizeAttenuation={true}
          lineWidth={0.01}
          opacity={0}
          color={props.value.color}
        />
      </mesh>
    </>
  )
}

const Rain = (props) => {
  const { lines } = useRain(props)
  return (
    <>
      {lines.map((raindrop, index) => {
        return <Raindrop key={index} value={raindrop} />
      })}
    </>
  )
}

const RainRing = ({ value }) => {
  const mesh = useRef()
  useRainRing(mesh)
  return (
    <mesh ref={mesh} scale={[0, 0, 0]} position={value.startpoint}>
      <circleGeometry attach="geometry" args={[value.radius, 128]} />
      <meshBasicMaterial attach="material" opacity={0.2} transparent={true} color="white" />
    </mesh>
  )
}

const RainRings = (props) => {
  const { rings } = useRainRings(props)
  return (
    <>
      {rings.map((ring, index) => {
        return <RainRing key={index} value={ring} />
      })}
    </>
  )
}

const RainDemo = () => {

    return (
          <Canvas
            pixelRatio={window.devicePixelRatio}
            camera={{fov: 75, near: 2, far: 1000, position: [1, -1, -1] }}
          >
            <Rain angle={45} count={500}/>
            <RainRings />
          </Canvas>
    )
  }

export default RainDemo