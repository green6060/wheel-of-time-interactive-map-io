import React from 'react'
import L from 'leaflet'
import Background from '../Helper/assets/wheelOfTimeMap.png'

export const FilterContext = React.createContext();

export const BookNames = [
    'The Eye of the World',
    'The Great Hunt',
    'The Dragon Reborn',
    'The Shadow Rising',
    'The Fires of Heaven',
    'Lord of Chaos',
    'A Crown of Swords',
    'The Path of Daggers',
    "Winter's Heart",
    'Crossroads of Twilight',
    'Knife of Dreams',
    'The Gathering Storm',
    'Towers of Midnight',
    'A Memory of Light',
] 

export const setMap = () => {
    const map = L.map('mapid', {
        crs: L.CRS.Simple,
        minZoom: 0.5,
        maxZoom: 2.5,
    });
    const bounds = [[0,0], [1000,1000]];
    L.imageOverlay(Background, bounds).addTo(map);
    map.setMaxBounds(bounds);
    map.on('drag', () => {
        map.panInsideBounds(bounds, { animate: false });
    });
    map.fitBounds(bounds);
}