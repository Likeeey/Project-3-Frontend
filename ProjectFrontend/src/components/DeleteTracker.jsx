import React from "react";
import { Button, Box } from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import trackerServices from "../services/tracking.service";

export default function DeleteTracker({ trackingId, onDelete }) {
    const handleDelete = (e) => {
        e.preventDefault();
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
