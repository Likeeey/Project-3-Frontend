import React from "react";
import trainingServices from "../services/training.service";

export default function DeleteTraining({ trainingId, onDelete }) {
    const handleDelete = () => {
        console.log("Deleting training with ID:", trainingId);
        trainingServices
            .deleteTraining(trainingId)
            .then(() => {
                console.log("Training deleted successfully.");
                onDelete(trainingId);
            })
            .catch((error) => {
                console.log("Error deleting training:", error);
            });
    };
    

    return (
        <div>
            <button onClick={handleDelete}>Delete Training</button>
        </div>
    );
}