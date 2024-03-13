import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Stack,
  Select
} from "@chakra-ui/react";
import trainingServices from "../services/training.service";
import AddTraining from "../components/AddTraining";
import DeleteTraining from "../components/DeleteTraining";
import EditTraining from "../components/EditTraining";

function MyPlan() {
  const [training, setTraining] = useState([]);
  const [newTraining, setNewTraining] = useState({
    name: "",
    type: "",
    muscle: "",
    sets: "",
    reps: "",
    instructions: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [filteredExerciseOptions, setFilteredExerciseOptions] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const exerciseTypes = ["Cardio", "Weightlifting", "Plyometrics", "Stretching"];
  const muscleGroups = ["Abdominals", "Abductors", "Adductors", "Biceps", "Calves", "Chest", "Forearms", "Glutes", "Hamstrings", "Lats", "Lower back", "Middle back", "Neck", "Quadriceps", "Traps", "Triceps"];

  const handleDelete = (trainingId) => {
    setTraining(training.filter((item) => item._id !== trainingId));
    console.log("Deleted training with ID:", trainingId);
    trainingServices
      .deleteTraining(trainingId)
      .then(() => {
        console.log("Training deleted successfully.");
      })
      .catch((error) => {
        console.log("Error deleting training:", error);
      })
      .finally(() => {
        console.log("Page reloaded.");
      });
  };

  const handleEdit = (trainingId, updatedTrainingData) => {
    setTraining((prevTraining) =>
      prevTraining.map((item) => (item._id === trainingId ? updatedTrainingData : item))
    );
    console.log("Editing training with ID:", trainingId);
    console.log("Updated training data:", updatedTrainingData);
    trainingServices
      .updateTraining(trainingId, updatedTrainingData)
      .then(() => {
        console.log("Training updated successfully.");
      })
      .catch((error) => {
        console.log("Error updating training:", error);
      })
      .finally(() => {
        console.log("Page reloaded.");
      });
  };

  const handleCreate = () => {
    trainingServices
      .createTraining(newTraining)
      .then((response) => {
        console.log("Training created successfully:", response.data);
        setTraining([...training, response.data]);
        onClose();
      })
      .catch((error) => {
        console.log("Error creating training:", error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trainingServices.getAllTrainings();
        console.log(response.data);
        setTraining(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Box as="aside">
        <Box>
          <Link to="/profile">
            <Text>My Profile</Text>
          </Link>
        </Box>
        <Box>
          <Link to="/myplan">
            <Text>My Plan</Text>
          </Link>
        </Box>
        <Box>
          <Link to="/tracking">
            <Text>Tracking</Text>
          </Link>
        </Box>
      </Box>
      <Button onClick={onOpen} mt={4}>Add Workout</Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontWeight="bold">Add Workout</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={10}>
              <input
                type="text"
                placeholder="Name"
                value={newTraining.name}
                onChange={(e) => setNewTraining({ ...newTraining, name: e.target.value })}
                style={{ backgroundColor: 'PaleTurquoise', height: '35px', borderRadius: '5px' }}
              />
              <Select
                placeholder="Type of Exercise"
                value={newTraining.type}
                onChange={(e) => setNewTraining({ ...newTraining, type: e.target.value })}
                style={{ backgroundColor: 'PaleTurquoise', height: '35px', borderRadius: '5px' }}
              >
                {exerciseTypes.map((exerciseType) => (
                  <option key={exerciseType} value={exerciseType}>
                    {exerciseType}
                  </option>
                ))}
              </Select>
              <Select
                placeholder="Muscle Group"
                value={newTraining.muscle}
                onChange={(e) => setNewTraining({ ...newTraining, muscle: e.target.value })}
                style={{ backgroundColor: 'PaleTurquoise', height: '35px',  borderRadius: '5px' }}
              >
                {muscleGroups.map((muscleGroup) => (
                  <option key={muscleGroup} value={muscleGroup}>
                    {muscleGroup}
                  </option>
                ))}
              </Select>
              <input
                type="number"
                placeholder="Sets"
                value={newTraining.sets}
                onChange={(e) => setNewTraining({ ...newTraining, sets: parseInt(e.target.value) })}
                style={{ backgroundColor: 'PaleTurquoise', height: '35px',  borderRadius: '5px' }}
              />
              <input
                type="number"
                placeholder="Reps"
                value={newTraining.reps}
                onChange={(e) => setNewTraining({ ...newTraining, reps: parseInt(e.target.value) })}
                style={{ backgroundColor: 'PaleTurquoise', height: '35px',  borderRadius: '5px'}}
              />
              <input
                type="text"
                placeholder="Instructions/Notes"
                value={newTraining.instructions}
                onChange={(e) => setNewTraining({ ...newTraining, instructions: e.target.value })}
                style={{ backgroundColor: 'PaleTurquoise', height: '35px',  borderRadius: '5px' }}
              />
            </Stack>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
            <Button colorScheme="green" onClick={handleCreate}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      {/* Display existing workouts */}
      {training.map((item) => (
        <Box key={item._id} mt={4} borderWidth="1px" p={4}>
          <Text>Name: {item.name}</Text>
          <Text>Type: {item.type}</Text>
          <Text>Muscle: {item.muscle}</Text>
          <Text>Sets: {item.sets}</Text>
          <Text>Reps: {item.reps}</Text>
          <Text>Instructions: {item.instructions}</Text>
          <DeleteTraining trainingId={item._id} onDelete={handleDelete} />
          <EditTraining
            trainingId={item._id}
            name={item.name}
            type={item.type}
            muscle={item.muscle}
            sets={item.sets}
            reps={item.reps}
            instructions={item.instructions}
            onUpdate={handleEdit}
          />
        </Box>
      ))}
    </Box>
  );
}

export default MyPlan;