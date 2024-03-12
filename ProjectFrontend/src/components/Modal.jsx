import { useDisclosure, Button, Modal as ChakraModal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input, Select } from "@chakra-ui/react";
import React from "react";

function TrainingForm({ initialRef, onClose }) {
  const exerciseTypes = ["Cardio", "Weightlifting", "Plyometrics", "Stretching"];
  const muscleGroups = ["Abdominals", "Abductors", "Adductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes", "Hamstrings", "Lats", "Lower back", "Middle back", "Neck", "Quadriceps", "Traps", "Triceps"];

  return (
    <ModalContent>
      <ModalHeader>Add Your Training Session</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Name of the exercise</FormLabel>
          <Input ref={initialRef} placeholder='Exercise name' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Type</FormLabel>
          <Select placeholder="Select exercise type">
            {exerciseTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Targeting Muscle</FormLabel>
          <Select placeholder="Select muscle group">
            {muscleGroups.map((muscle, index) => (
              <option key={index} value={muscle}>
                {muscle}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Sets</FormLabel>
          <Input placeholder='Sets' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Repetitions</FormLabel>
          <Input placeholder='Reps' />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Instructions</FormLabel>
          <Input placeholder='Instructions' />
        </FormControl>

      </ModalBody>

      <ModalFooter>
        <Button colorScheme='blue' mr={3}>
          Save
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </ModalFooter>
    </ModalContent>
  );
}

function AddTrainingButton({ onOpen }) {
  return <Button onClick={onOpen}>Add Training</Button>;
}

function InitialFocus() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef(null);

  return (
    <>
      <AddTrainingButton onOpen={onOpen} />
      <ChakraModal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <TrainingForm initialRef={initialRef} onClose={onClose} />
      </ChakraModal>
    </>
  );
}

export default function Modal() {
  return (
    <div>
      <InitialFocus />
    </div>
  );
}
