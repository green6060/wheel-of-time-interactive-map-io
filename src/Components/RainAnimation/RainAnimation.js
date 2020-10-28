import React from 'react'
import { Canvas } from 'react-three-fiber'
import Rain from './Rain'
import RainRings from './RainRings'


export default function RainAnimation() {
    return (
        <Canvas
            pixelRatio={window.devicePixelRatio}
            camera={{fov: 155, near: 1, far: 2000, position: [1, -1, -1] }}
            style={{height: '1358px'}}
        >
            <Rain angle={45} count={2000}/>
            <RainRings />
        </Canvas>
    )
}
  