import React from 'react'
import { MapInteractionCSS } from 'react-map-interaction';

import RainAnimation from '../../Components/RainAnimation/RainAnimation';
import { setMap } from '../../Helper/common';
import Background from '../../Helper/assets/wheelOfTimeMap.png'

export default function MapContainer() {
    const [mapState, setMapState] = React.useState({
        value: {
            scale: 1,
            translation: { x: 0, y: 0 }
        }
    })

    return (
        <MapInteractionCSS
            style={{
                width: '100%',
                height: '100vh',
            }}
            translationBounds={{xMin: -1000, xMax: 0, yMin: -1000, yMax: 0}}
        >
            <img 
                alt={'westlands map'} 
                src={Background} 
            />
            <div style={{display: 'flex', justifyContent: 'center'}}>
                <div
                    id="mapid"
                    style={{
                        width: '100%',
                        height: '100vh',
                        position: 'absolute', 
                        left: '0', 
                        top: '0', 
                        zIndex: '1',
                        // backgroundColor: '#1677b3'
                    }}
                    
                >
                    <RainAnimation />
                </div>
            </div>
        </MapInteractionCSS>

        // <div style={{display: 'flex', justifyContent: 'center'}}>
        //     <div 
        //         style={{
        //             width: '100%',
        //             height: '100vh',
        //             position: 'absolute', 
        //             left: '0px', 
        //             top: '0px', 
        //             zIndex: '1',
        //             // backgroundColor: '#1677b3'
        //             backgroundImage: "url(" + Background + ")"
        //         }}
        //         id="mapid"
        //     >
        //         <RainAnimation />
        //     </div>
        // </div>
        
    )
}
