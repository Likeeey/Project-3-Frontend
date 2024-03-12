import React, { useState, useEffect } from "react";
import exerciseService from "../services/exercises.service";
import {
  useDisclosure,
  Button,
  Modal as ChakraModal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Input,
  Select,
  Box,
  Text,
} from "@chakra-ui/react";

function TrainingForm({ initialRef, onClose, onSave, exercises, exerciseTypes, muscleGroups }) {
  const [formData, setFormData] = useState({
    exerciseName: "",
    exerciseType: "",
    targetingMuscle: "",
    sets: "",
    repetitions: "",
    instructions: "",
  });
  const [filteredExerciseOptions, setFilteredExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);

  useEffect(() => {
    setFilteredExerciseOptions(exercises);
  }, [exercises]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSelectExercise = (exercise) => {
    setSelectedExercise(exercise);
    setFormData({
      ...formData,
      exerciseName: exercise.name,
    });
  };

  const handleClearSelection = () => {
    setSelectedExercise(null);
    setFormData({
      ...formData,
      exerciseName: "",
    });
  };

  const handleSubmit = () => { //
    onSave(formData);
    onClose();
  };

  return (
    <ModalContent>
      <ModalHeader>Add Your Training Session</ModalHeader>
      <ModalCloseButton />
      <ModalBody pb={6}>
        <FormControl>
          <FormLabel>Name of the exercise</FormLabel>
          <Box display="flex" alignItems="center">
            {selectedExercise ? (
              <Box
                marginRight="2"
                paddingX="2"
                paddingY="1"
                borderRadius="md"
                border="1px solid #CBD5E0"
                backgroundColor="gray.100"
                whiteSpace="nowrap"
              >
                {selectedExercise.name}
                <Button size="sm" ml="2" onClick={handleClearSelection}>
                  Clear
                </Button>
              </Box>
            ) : (
              <Input
                name="exerciseName"
                ref={initialRef}
                placeholder="Search or enter exercise"
                onChange={handleInputChange}
                value={formData.exerciseName}
                autoComplete="off"
              />
            )}
            <Select
              name="exerciseName"
              placeholder="Select exercise"
              onChange={(e) => handleSelectExercise({ name: e.target.value })}
              value={formData.exerciseName}
            >
              {filteredExerciseOptions.map((exercise, index) => (
                <option key={index} value={exercise.name}>
                  {exercise.name}
                </option>
              ))}
            </Select>
          </Box>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Type</FormLabel>
          <Select
            name="exerciseType"
            placeholder="Select exercise type"
            onChange={handleInputChange}
            value={formData.exerciseType}
          >
            {exerciseTypes.map((type, index) => (
              <option key={index} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Targeting Muscle</FormLabel>
          <Select
            name="targetingMuscle"
            placeholder="Select muscle group"
            onChange={handleInputChange}
            value={formData.targetingMuscle}
          >
            {muscleGroups.map((muscle, index) => (
              <option key={index} value={muscle}>
                {muscle}
              </option>
            ))}
          </Select>
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Sets</FormLabel>
          <Input
            name="sets"
            placeholder="Sets"
            onChange={handleInputChange}
            value={formData.sets}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Repetitions</FormLabel>
          <Input
            name="repetitions"
            placeholder="Reps"
            onChange={handleInputChange}
            value={formData.repetitions}
          />
        </FormControl>

        <FormControl mt={4}>
          <FormLabel>Instructions</FormLabel>
          <Input
            name="instructions"
            placeholder="Instructions"
            onChange={handleInputChange}
            value={formData.instructions}
          />
        </FormControl>
      </ModalBody>
      <ModalFooter>
        <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
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
  const [trainingSessions, setTrainingSessions] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await exerciseService.getAllExercises();
        setExercises(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleSave = (formData) => { // Add this line to handle form submission logic here 
    setTrainingSessions([...trainingSessions, formData]);
  };

  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const exerciseTypes = ["Cardio", "Weightlifting", "Plyometrics", "Stretching"];
  const muscleGroups = ["Abdominals", "Abductors", "Adductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes", "Hamstrings", "Lats", "Lower back", "Middle back", "Neck", "Quadriceps", "Traps", "Triceps"];

  return (
    <>
      <AddTrainingButton onOpen={onOpen} />
      <ChakraModal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <TrainingForm
          initialRef={initialRef}
          onClose={onClose}
          onSave={handleSave}
          exercises={filteredExercises}
          exerciseTypes={exerciseTypes}
          muscleGroups={muscleGroups}
        />
      </ChakraModal>
      <Box mt={8}>
        <Text fontSize="xl">Training Sessions:</Text>
        {trainingSessions.map((session, index) => (
          <Box key={index} mt={4} borderWidth="1px" p={4}>
            <Text>{session.exerciseName}</Text>
            <Text>{session.exerciseType}</Text>
            <Text>{session.targetingMuscle}</Text>
            <Text>{session.sets}</Text>
            <Text>{session.repetitions}</Text>
            <Text>{session.instructions}</Text>
          </Box>
        ))}
      </Box>
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