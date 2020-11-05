import Axios from 'axios';
import React from 'react'

export const UserContext = React.createContext()

export const FilterFormContext = React.createContext();

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

export const axiosLogin = async (attemptedEmail, attemptedPassword) => {
    return Axios({
        method: 'get',
        url: 'http://localhost:3001/api/user',
        data: {
          email: attemptedEmail,
          password: attemptedPassword,
        }
    });
}

export const axiosCreateUser = async (attemptedEmail, attemptedPassword) => {
    return Axios({
        method: 'post',
        url: 'http://localhost:3001/api/user',
        data: {
          email: attemptedEmail,
          password: attemptedPassword,
        }
    })
}