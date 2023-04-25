import React from 'react'

const service = () => {
    const getData = async (message) => {
        const options = {
            method: 'GET',
            headers: {
                'X-RapidAPI-Key': '4ebb2a8ae0msh8a39e3791f7978ap1b7249jsn24de1c1d7e91',
                'X-RapidAPI-Host': 'travel-advisor.p.rapidapi.com'
            }
        };
        
        const res = await fetch(`https://travel-advisor.p.rapidapi.com/locations/search?query=${message}&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=RU`, options);
        return await res.json();
    }

    return {getData};
}

export default service;