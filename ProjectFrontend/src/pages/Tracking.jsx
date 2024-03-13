import { Link } from "react-router-dom"
import { useState, useEffect } from "react";

import trackingServices from "../services/tracking.service";
import AddTrack from "../components/AddTracker"
import Edit from "../components/Edit"

function Tracking () {
    const [tracker, setTracker] = useState([]);
    

    useEffect(() => {
        const fetchData = async() => {
            try {
                const response = await trackingServices.getAllTrackers();
                console.log(response.data);
                setTracker(response.data);
            } catch (error) {
                console.log("Error fetching data", error);
            }
        };
        fetchData();
    }, []);
    
    return (
        <div>
            <aside>
                <div>
                    <Link to="/profile"><p>My Profile</p></Link>
                </div>
                <div>
                    <Link to="/myplan"><p>My Plan</p></Link>
                </div>
                <div>
                    <Link to="/tracking"><p>Tracking</p></Link>
                </div>
            </aside>
            
            {tracker.map((track) => {
                return (
                <div key={track._id}>
                    <p>Bodyweight: {track.bodyWeight}</p>
                    <p>Steps: {track.steps}</p>
                    <p>Duration: {track.duration}</p>
                    <p>Kcals: {track.kcals}</p>
                    <Link to={`/trackingdetails/${track._id}`}></Link>
                        <p>Details</p>
                </div>)
            })}
            <AddTrack tracker={tracker} setTracker={setTracker}/>
        </div>
    )
}

export default Tracking;