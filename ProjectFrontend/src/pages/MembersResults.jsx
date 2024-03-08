import React from 'react'
import {useState, useEffect} from 'react'
import axios from 'axios';


export default function MembersResults () {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get("mongodb://localhost:27017/members")
        .then(data => setData(data.data))
        .catch(err => console.log(err))
    })

    return (
        <div>
            {
                data.map((data) => {
                    return ( 
                    <p>{data.name}</p>,
                    <p>{data.description}</p>,
                    <img src="" />
                    )

                })
            }
        </div>
    )
}