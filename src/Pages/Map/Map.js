import React from 'react'
import L from 'leaflet'

import Background from '../../Helper/assets/wheelOfTimeMap.png'

export default function MapContainer() {
    
    React.useEffect(() => {
        const map = L.map('mapid', {
            crs: L.CRS.Simple,
            minZoom: 0.5,
            maxZoom: 2.5,
        });
        const bounds = [[0,0], [1000,1000]];
        L.imageOverlay(Background, bounds).addTo(map);
        map.setMaxBounds(bounds);
        map.on('drag', function() {
            map.panInsideBounds(bounds, { animate: false });
        });
        map.fitBounds(bounds);
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
                }}
                id="mapid"
            >
                {/* This is where the interactive map will go */}
            </div>
        </div>
        
    )
}
