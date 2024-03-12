// MyPlan.js
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Input, VStack, Box, Text, List, ListItem, Collapse } from "@chakra-ui/react"; // Import necessary Chakra UI components
import exerciseService from "../services/exercises.service";
import Modal from "../components/Modal";


function MyPlan() {
  const [exercises, setExercises] = useState([]);
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
      <Modal />
    </div>
  );
}

export default MyPlan;
