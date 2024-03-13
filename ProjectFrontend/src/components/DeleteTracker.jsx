import React from "react";
import trackerServices from "../services/tracking.service"

export default function DeleteTracker({ trackingId, onDelete }) {
    const handleDelete = () => {
        console.log("Deleting tracker with ID:", trackingId);
        trackerServices
            .deleteTracker(trackingId)
            .then(() => {
                console.log("Tracker deleted successfully.");
                onDelete(trackingId);
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
