import React from 'react'
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import RainAnimation from '../../Components/RainAnimation/RainAnimation';
import Background from '../../Helper/assets/wheeloftimemap_1920x1358.png'

export default function MapContainer() {
    
    return (
        <TransformWrapper
            defaultScale={1.5}
            defaultPositionX={-800}
            defaultPositionY={-400}
            options={{
                limitToBounds: true,
                transformEnabled: true,
                disabled: false,
                limitToWrapper: true,
            }}
            pan={{
                panningEnabled: true, 
                lockAxisX: false,
                lockAxisY: false,
                velocityEqualToMove: true,
                enableVelocity: true,
                limitsOnPan: true,
            }}
            pinch={{
                pinchEnabled: true,
            }}
            doubleClick={{
                dbClickEnabled: true,
                step: 200,
            }}
            wheel={{
                enableWheel: true,
                enableTouchPadPinch: true,
                limitsOnWheel: true,
                step: 200,
            }}
        >
            {({
                positionX,
                positionY,
                onPanning,
            }) => (
                <TransformComponent>
                    <img src={Background} alt={'westlands map'}/>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <div
                            style={{
                                width: '100%',
                                height: '100vh',
                                position: 'absolute', 
                                left: '0', 
                                top: '0', 
                                zIndex: '1',
                            }}
                        >
                            <RainAnimation />
                        </div>
                    </div>
                </TransformComponent>
            )}
        </TransformWrapper>
    )

}
