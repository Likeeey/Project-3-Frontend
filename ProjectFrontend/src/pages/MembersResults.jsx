import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import memberService from "../services/member-result.service";

export default function MembersResults() {
    const [data, setData] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await memberService.getAllMembers(id);
                setData(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]); // Dependency on id to re-fetch data when id changes

    return (
        <div>
            {data.map((members) => (
                <div key={members._id}>
                    <p>Name: {members.name}</p>
                    <p>Description: {members.description}</p>
                </div>
            ))}
        </div>
    );
}
