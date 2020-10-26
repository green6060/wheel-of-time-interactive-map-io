import React from 'react'
import RainDemo from '../../Components/ThreeJsRainDemo/ThreeJsRainDemo';
import { setMap } from '../../Helper/common';
import Background from '../../Helper/assets/wheelOfTimeMap.png'

export default function MapContainer() {
    
    React.useEffect(() => {
        /* Initialize Map */
        // setMap()
    }, [])

    

    return (
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <div 
                style={{
                    width: '100%',
                    height: '100vh',
                    position: 'absolute', 
                    left: '0px', 
                    top: '0px', 
                    zIndex: '1',
                    // backgroundColor: '#1677b3'
                    backgroundImage: "url(" + Background + ")"
                }}
                id="mapid"
            >
                <RainDemo />
                {/* This is where the interactive map will go */}
            </div>
        </div>
        
    )
}
