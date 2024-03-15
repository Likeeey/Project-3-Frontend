import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
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
        <Box position="relative">
            <Button
                position="absolute"
                bottom="0"
                right="0"
                colorScheme="red"
                variant="ghost"
                fontSize={"30px"}
                onClick={handleDelete}
                aria-label="Delete"
                mr={-640}
            >
                <CloseIcon />
            </Button>
        </Box>
    );
}