import  { useState } from "react";

export default function EditTracker({ trackerId, bodyWeight, steps, duration, kcals, onUpdate }) {
    const [updatedBodyWeight, setUpdatedBodyWeight] = useState(bodyWeight);
    const [updatedSteps, setUpdatedSteps] = useState(steps);
    const [updatedDuration, setUpdatedDuration] = useState(duration);
    const [updatedKcals, setUpdatedKcals] = useState(kcals);

    function handleSubmit(e) {
        e.preventDefault();
        const updatedTracker = { bodyWeight: updatedBodyWeight, steps: updatedSteps, duration: updatedDuration, kcals: updatedKcals };
        onUpdate(trackerId, updatedTracker);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Bodyweight: </label>
            <input type="text" name="bodyWeight" value={updatedBodyWeight} onChange={(e) => setUpdatedBodyWeight(e.target.value)} />
            <label>Steps: </label>
            <input type="text" name="steps" value={updatedSteps} onChange={(e) => setUpdatedSteps(e.target.value)} />
            <label>Duration: </label>
            <input type="text" name="duration" value={updatedDuration} onChange={(e) => setUpdatedDuration(e.target.value)} />
            <label>Kcals: </label>
            <input type="text" name="kcals" value={updatedKcals} onChange={(e) => setUpdatedKcals(e.target.value)} />

            <button type="submit">Update Tracker</button>
        </form>
    );
}
