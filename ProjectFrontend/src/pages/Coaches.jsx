import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import coachService from "../services/coach.service";

export default function MyPlan() {
    const [coaches, setCoaches] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await coachService.getAllCoaches(id);
                setCoaches(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]); // Dependency on id to re-fetch data when id changes

    return (
        <div>
            {coaches.map((coach) => (
                <div key={coach._id}>
                    <p>Name: {coach.name}</p>
                    <p>Gender: {coach.gender}</p>
                    <p>Speciality: {coach.speciality}</p>
                    <p>Nationality: {coach.nationality}</p>
                    <p>Language: {coach.languages}</p>
                    <p>Description: {coach.description}</p>
                    {coach.gender === "Male"}
                    <img>{coach.img1}</img>
                </div>
            ))}
        </div>
    );
}
