import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import exerciseService from "../services/exercises.service";

function EditExercise(props) {
  const [exercise, setExercise] = useState({});
  const { id, exercises, setExercises } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await exerciseService.getExercise(id);
        setExercise(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setExercise((prevExercise) => ({
      ...prevExercise,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await exerciseService.updateExercise(id, exercise);
      console.log("Exercise updated successfully.");
      navigate("/myplan");
    } catch (error) {
      console.log("Error updating exercise:", error);
    }
  };

  const handleDelete = async (exerciseToRemove) => {
    const removeExercise = exercises.filter(exercise => exercise.id !== exerciseToRemove.id);
    try {
      await exerciseService.deleteExercise(id);
      console.log("Exercise deleted successfully.");
      setExercises(removeExercise);
    } catch (error) {
      console.log("Error deleting exercise:", error);
    }
  };

  return (
    <article>
      <form onSubmit={handleUpdate}>
        <label>Name</label>
        <input type="text" name="name" value={exercise.name || ""} onChange={handleChange} />
        
        <label>Type</label>
        <input type="text" name="type" value={exercise.type || ""} onChange={handleChange} />
        
        <label>Muscle</label>
        <input type="text" name="muscle" value={exercise.muscle || ""} onChange={handleChange} />
        
        <label>Difficulty</label>
        <input type="text" name="difficulty" value={exercise.difficulty || ""} onChange={handleChange} />
        
        <label>Instructions</label>
        <input type="text" name="instructions" value={exercise.instructions || ""} onChange={handleChange} />
        
        <label>Equipment</label>
        <input type="text" name="equipment" value={exercise.equipment || ""} onChange={handleChange} />
        
        <button type="submit">Update Exercise</button>
      </form>
      <button onClick={handleDelete}>Delete Exercise</button>
    </article>
  );
}

export default EditExercise;
