import React from "react";
import trackerServices from "../services/tracking.service"

export default function DeleteTracker({ trackerId, onDelete }) {
    const handleDelete = () => {
        console.log("Deleting tracker with ID:", trackerId);
        trackerServices
            .deleteTracker(trackerId)
            .then(() => {
                console.log("Tracker deleted successfully.");
                onDelete(trackerId);
            })
            .catch((error) => {
                console.log("Error deleting tracker:", error);
            });
    };

    return (
        <div>
            <button onClick={handleDelete}>Delete Tracker</button>
        </div>
    );
}
