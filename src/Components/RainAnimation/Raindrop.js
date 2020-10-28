import React from 'react'
import meshline from 'threejs-meshline'
import { extend } from 'react-three-fiber'

import { useRaindrop } from './use-rain'


extend(meshline)

export default function Raindrop(props) {
    const raindrop = React.useRef()
    const mat = React.useRef()
    useRaindrop(raindrop, mat, { value: props.value })
    return (
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
    )
}
