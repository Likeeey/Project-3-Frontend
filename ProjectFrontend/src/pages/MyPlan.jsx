import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
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
  Select,
  Link as ChakraLink,
  VStack,
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Center
} from "@chakra-ui/react";
import trainingServices from "../services/training.service";
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
  const exerciseTypes = ["Cardio", "Weightlifting", "Plyometrics", "Stretching"];
  const muscleGroups = [
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
      .then(() => location.reload())
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
      <VStack spacing={10} mt={20} align="stretch">
        <ChakraLink
          as={RouterLink}
          to="/profile"
          color="orange"
          fontSize="2xl"
          fontWeight="bold"
          fontFamily={"sans-serif"}
          _hover={{ textDecoration: "none", color: "blue.600" }}
        >
          My Profile
        </ChakraLink>
        <ChakraLink
          as={RouterLink}
          to="/myplan"
          color="orange"
          fontSize="2xl"
          fontWeight="bold"
          fontFamily={"sans-serif"}
          _hover={{ textDecoration: "none", color: "blue.600" }}
        >
          My Plan
        </ChakraLink>
        <ChakraLink
          as={RouterLink}
          to="/tracking"
          color="orange"
          fontSize="2xl"
          fontWeight="bold"
          fontFamily={"sans-serif"}
          _hover={{ textDecoration: "none", color: "blue.600" }}
        >
          Tracking
        </ChakraLink>
      </VStack>
      <Flex justify="flex-end">
        <Button onClick={onOpen} mt={-190} mr={850} colorScheme="orange">
          Add Workout
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontWeight="bold" color="orange" mb={10}>
            Add Workout
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={10} mb={5}>
              <input
                type="text"
                placeholder="Name"
                value={newTraining.name}
                onChange={(e) => setNewTraining({ ...newTraining, name: e.target.value })}
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
              />
              <Select
                placeholder="Type of Exercise"
                value={newTraining.type}
                onChange={(e) => setNewTraining({ ...newTraining, type: e.target.value })}
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
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
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
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
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
              />
              <input
                type="number"
                placeholder="Reps"
                value={newTraining.reps}
                onChange={(e) => setNewTraining({ ...newTraining, reps: parseInt(e.target.value) })}
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
                />
                <input
                  type="text"
                  placeholder="Instructions/Notes"
                  value={newTraining.instructions}
                  onChange={(e) => setNewTraining({ ...newTraining, instructions: e.target.value })}
                  style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
                />
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button style={{ backgroundColor: "#FBD38D" }} color={"white"} mr={3} onClick={onClose}>
                Close
              </Button>
              <Button colorScheme="orange" color={"white"} onClick={handleCreate}>
                Save
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
  
        {training.map((item) => (
          <Box
            key={item._id}
            border="2px solid orange"
            borderRadius="md"
            p={2}
            ml={1090}
            mr={20}
            mt={5}
            width={"800px"}
            display={"inline-grid"}
            style={{ position: "relative", top: "-210px" }}
          >
            <Table variant="simple" size="md">
              <Thead>
                <Tr>
                  <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                    Name
                  </Th>
                  <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                    Type
                  </Th>
                  <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                    Sets
                  </Th>
                  <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                    Reps
                  </Th>
                  <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                    Notes
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                <Tr>
                  <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                    {item.name}
                  </Td>
                  <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                    {item.type}
                  </Td>
                  <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                    {item.sets}
                  </Td>
                  <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                    {item.reps}
                  </Td>
                  <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                    {item.instructions}
                  </Td>
                </Tr>
              </Tbody>
            </Table>
            <Flex direction="row">
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
              <DeleteTraining trainingId={item._id} onDelete={handleDelete} />
            </Flex>
          </Box>
        ))}
      </Box>
    );
  }
  
  export default MyPlan;