import React, { useState } from "react";
import { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Center, useToast } from "@chakra-ui/react";

export default function EditTracker({ trackerId, bodyWeight, steps, duration, kcals, onUpdate }) {
    const [updatedBodyWeight, setUpdatedBodyWeight] = useState(bodyWeight);
    const [updatedSteps, setUpdatedSteps] = useState(steps);
    const [updatedDuration, setUpdatedDuration] = useState(duration);
    const [updatedKcals, setUpdatedKcals] = useState(kcals);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast();

    function handleSubmit(e) {
        e.preventDefault();
        const updatedTracker = { bodyWeight: updatedBodyWeight, steps: updatedSteps, duration: updatedDuration, kcals: updatedKcals };
        onUpdate(trackerId, updatedTracker);
        setIsModalOpen(false);
        showNotification();
    }

    const showNotification = () => {
        toast({
            title: "Tracker updated successfully!",
            status: "success",
            position: "bottom",
            duration: 2000,
            isClosable: true,
            colorScheme: "orange",
        });
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)} colorScheme="orange" style={{ backgroundColor: '#FBD38D', color: 'white' }} mt={10}>Update Tracker</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="40px" fontWeight="bold" color="orange" mb={10}>
                        Edit Tracker
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Stack spacing={10} mb={5}>
                                <Input type="text" name="bodyWeight" placeholder="Bodyweight in Kg" value={updatedBodyWeight} onChange={(e) => setUpdatedBodyWeight(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                                <Input type="text" name="steps" placeholder="Steps" value={updatedSteps} onChange={(e) => setUpdatedSteps(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                                <Input type="text" name="duration" placeholder="Duration in minutes" value={updatedDuration} onChange={(e) => setUpdatedDuration(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                                <Input type="text" name="kcals" placeholder="Kcals" value={updatedKcals} onChange={(e) => setUpdatedKcals(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                            </Stack>
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="orange" mr={3} onClick={(e) => handleSubmit(e)} style={{ backgroundColor: '#FBD38D' }}>Update</Button>
                        <Button onClick={() => setIsModalOpen(false)} colorScheme="orange">Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
}








