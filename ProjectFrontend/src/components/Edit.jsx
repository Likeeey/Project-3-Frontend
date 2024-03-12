import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import trackingServices from "../services/tracking.service";

function EditTracker(props) {
  const [tracker, setTracker] = useState({});
  const { id, trackers, setTrackers } = props;
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await trackingServices.getTracker(id);
        setTracker(response.data);
      } catch (error) {
        console.log("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTracker((prevTracker) => ({
      ...prevTracker,
      [name]: value
    }));
  };

  const handleUpdate = async () => {
    try {
      await trackingServices.updateTracker(id, tracker);
      console.log("Tracker updated successfully.");
      navigate("/tracking");
    } catch (error) {
      console.log("Error updating tracker:", error);
    }
  };

  const handleDelete = async (trackerToRemove) => {
    const removeTracker = trackers.filter(tracker => tracker.id !== trackerToRemove.id);
    try {
      await trackingServices.deleteTracker(id);
      console.log("Tracker deleted successfully.");
      setTrackers(removeTracker);
    } catch (error) {
      console.log("Error deleting tracker:", error);
    }
  };

  return (
    <article>
      <form onSubmit={handleUpdate}>
        <label>Bodyweight</label>
        <input type="text" name="bodyWeight" value={tracker.bodyWeight || ""} onChange={handleChange} />
        
        <label>Steps</label>
        <input type="number" name="steps" value={tracker.steps || ""} onChange={handleChange} />
        
        <label>Duration</label>
        <input type="text" name="duration" value={tracker.duration || ""} onChange={handleChange} />
        
        <label>Kcals</label>
        <input type="text" name="kcals" value={tracker.kcals || ""} onChange={handleChange} />
        
        <button type="submit">Update Exercise</button>
      </form>
      <button onClick={handleDelete}>Delete Exercise</button>
    </article>
  );
}

export default EditTracker;
