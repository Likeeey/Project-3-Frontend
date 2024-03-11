// MyPlan.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Input, VStack, Box, Text, List, ListItem, Collapse } from "@chakra-ui/react"; // Import necessary Chakra UI components
import exerciseService from "../services/exercises.service";
import Edit from "../components/Edit";

function MyPlan() {
  const [exercises, setExercises] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState(""); // State to store selected exercise
  const [searchTerm, setSearchTerm] = useState(""); // State to store search term
  const [showDropdown, setShowDropdown] = useState(false); // State to toggle dropdown visibility

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

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value); // Update search term as the user types
    setShowDropdown(true); // Show the dropdown when the user starts typing
  };

  const handleExerciseSelect = (exerciseName) => {
    setSelectedExercise(exerciseName); // Update selected exercise when an option is clicked
    setSearchTerm(""); // Clear search term
    setShowDropdown(false); // Hide the dropdown after selecting an option
  };

  // Filter exercises based on search term
  const filteredExercises = exercises.filter((exercise) =>
    exercise.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <aside>
        <div>
          <Link to="/profile"><p>My Profile</p></Link>
        </div>
        <div>
          <Link to="/myplan"><p>My Plan</p></Link>
        </div>
        <div>
          <Link to="/tracking"><p>Tracking</p></Link>
        </div>
      </aside>
      
      <VStack spacing={4}>
        {/* Render Input for search bar */}
        <Input
          placeholder="Search exercise"
          value={searchTerm}
          onChange={handleInputChange}
          onClick={() => setShowDropdown(true)} // Show the dropdown when the input is clicked
        />
        
        {/* Render custom dropdown */}
        <Box
          position="relative"
          width="100%"
          display={showDropdown ? "block" : "none"}
        >
          <Collapse in={showDropdown}>
            <List
              borderWidth="1px"
              borderRadius="md"
              overflow="auto"
              maxH="200px"
              bg="white"
              position="absolute"
              zIndex="1"
              width="100%"
            >
              {filteredExercises.map((exercise) => (
                <ListItem
                  key={exercise._id}
                  onClick={() => handleExerciseSelect(exercise.name)}
                  cursor="pointer"
                  _hover={{ bg: "gray.100" }}
                  px={4}
                  py={2}
                >
                  <Text>{exercise.name}</Text>
                </ListItem>
              ))}
            </List>
          </Collapse>
        </Box>
      </VStack>
      
      {/* Render exercise details based on selected exercise */}
      {selectedExercise && exercises.map((exercise) => (
        exercise.name === selectedExercise && (
          <div key={exercise._id}>
            <p>Name: {exercise.name}</p>
            <p>Type: {exercise.type}</p>
            <p>Muscle: {exercise.muscle}</p>
            <p>Difficulty: {exercise.difficulty}</p>
            <p>Instructions: {exercise.instructions}</p>
            <p>Equipment: {exercise.equipment}</p>
            <Edit id={exercise._id} exercises={exercises} setExercises={setExercises}/>
          </div>
        )
      ))}
    </div>
  );
}

export default MyPlan;
