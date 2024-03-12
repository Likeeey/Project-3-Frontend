import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Edit from "../components/Edit";

/* Import Axios Service */
import trackingServices from "../services/tracking.service";

function AddTracker(props) {
  const [bodyWeight, setBodyWeight] = useState("");
  const [steps, setSteps] = useState(0);
  const [duration, setDuration] = useState("");
  const [kcals, setKcals] = useState("");

  // Initialize Navigate
  const navigate = useNavigate();

  // const { createTracking } = trackingServices;

  const { tracker, setTracker } = props;
  

  function handleSubmit(e) {
    e.preventDefault();

    const newTracker = { bodyWeight, steps, duration, kcals };
    console.log(newTracker);
    trackingServices
    .createTracking(newTracker)
      .then((response) => setTracker([...tracker, response.data]))
      .catch((error) => console.log(error));
  }
  return (
    <form onSubmit={(e) => handleSubmit(e)}>
        <label>Bodyweight: </label>
        <input type="text" name="bodyWeight" value={bodyWeight} onChange={(e) => setBodyWeight(e.target.value)} />
        
        <label>Steps: </label>
        <input type="number" name="steps" value={steps} onChange={(e) => setSteps(e.target.value)} />
        
        <label>Duration: </label>
        <input type="text" name="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
        
        <label>Kcals: </label>
        <input type="text" name="kcals" value={kcals} onChange={(e) => setKcals(e.target.value)} />
      
      <button type="submit">Add Training Tracker</button>
    </form>
    
  );<Edit id={id} tracker={tracker} setTracker={setTracker}/>
}

export default AddTracker;