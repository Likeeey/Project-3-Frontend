import React, { useState } from "react";
import { Input, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Stack, Select, Center, useToast } from "@chakra-ui/react";

export default function EditTraining({ trainingId, name, type, muscle, sets, reps, instructions, onUpdate, exerciseTypes, muscleGroups }) {
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedType, setUpdatedType] = useState(type);
    const [updatedMuscle, setUpdatedMuscle] = useState(muscle);
    const [updatedSets, setUpdatedSets] = useState(sets);
    const [updatedReps, setUpdatedReps] = useState(reps);
    const [updatedInstructions, setUpdatedInstructions] = useState(instructions);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const toast = useToast(); // Import useToast hook

    const exerciseTypess = ["Cardio", "Weightlifting", "Plyometrics", "Stretching"];
    const muscleGroupss = [
        "Abdominals",
        "Abductors",
        "Adductors",
        "Biceps",
        "Calves",
        "Chest",
        "Forearms",
        "Glutes",
        "Hamstrings",
        "Lats",
        "Lower back",
        "Middle back",
        "Neck",
        "Quadriceps",
        "Traps",
        "Triceps",
    ];

    function handleSubmit(e) {
        e.preventDefault();
        const updatedTraining = { name: updatedName, type: updatedType, muscle: updatedMuscle, sets: updatedSets, reps: updatedReps, instructions: updatedInstructions };
        onUpdate(trainingId, updatedTraining);
        setIsModalOpen(false);
        showNotification();
    }

    const showNotification = () => {
        toast({
            title: "Training updated successfully!",
            status: "success",
            position: "bottom",
            duration: 2000,
            isClosable: true,
            colorScheme: "orange",
        });
    };

    return (
        <>
            <Button onClick={() => setIsModalOpen(true)} colorScheme="orange" style={{ backgroundColor: '#FBD38D', color: 'white' }} mt={10}>Update Training</Button>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontSize="40px" fontWeight="bold" color="orange" mb={10}>
                        Edit Workout
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <Stack spacing={10} mb={5}>
                                <Input type="text" name="name" placeholder="Name of the exercise" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                                <Select placeholder="Type of exercise" value={updatedType} onChange={(e) => setUpdatedType(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }}>
                                    {exerciseTypess.map((exerciseType) => (
                                        <option key={exerciseType} value={exerciseType}>
                                            {exerciseType}
                                        </option>
                                    ))}
                                </Select>
                                <Select placeholder="Muscle targeted" value={updatedMuscle} onChange={(e) => setUpdatedMuscle(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }}>
                                    {muscleGroupss.map((muscleGroup) => (
                                        <option key={muscleGroup} value={muscleGroup}>
                                            {muscleGroup}
                                        </option>
                                    ))}
                                </Select>
                                <Input type="number" name="sets" placeholder="Number of sets" value={updatedSets} onChange={(e) => setUpdatedSets(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                                <Input type="number" name="reps" placeholder="Number of reps" value={updatedReps} onChange={(e) => setUpdatedReps(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
                                <Input type="text" name="instructions" placeholder="Instructions/Notes" value={updatedInstructions} onChange={(e) => setUpdatedInstructions(e.target.value)} style={{ backgroundColor: '#FBD38D', height: "35px", borderRadius: "5px" }} />
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