import { useState } from "react";

export default function EditTraining({ trainingId, name, type, muscle, sets, reps, instructions, onUpdate }) {
    const [updatedName, setUpdatedName] = useState(name);
    const [updatedType, setUpdatedType] = useState(type);
    const [updatedMuscle, setUpdatedMuscle] = useState(muscle);
    const [updatedSets, setUpdatedSets] = useState(sets);
    const [updatedReps, setUpdatedReps] = useState(reps);
    const [updatedInstructions, setUpdatedInstructions] = useState(instructions);

    function handleSubmit(e) {
        e.preventDefault();
        const updatedTraining = { name: updatedName, type: updatedType, muscle: updatedMuscle, sets: updatedSets, reps: updatedReps, instructions: updatedInstructions };
        onUpdate(trainingId, updatedTraining);
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Name: </label>
            <input type="text" name="name" value={updatedName} onChange={(e) => setUpdatedName(e.target.value)} />
            <label>Type: </label>
            <input type="text" name="type" value={updatedType} onChange={(e) => setUpdatedType(e.target.value)} />
            <label>Muscle: </label>
            <input type="text" name="muscle" value={updatedMuscle} onChange={(e) => setUpdatedMuscle(e.target.value)} />
            <label>Sets: </label>
            <input type="number" name="sets" value={updatedSets} onChange={(e) => setUpdatedSets(e.target.value)} />
            <label>Reps: </label>
            <input type="number" name="reps" value={updatedReps} onChange={(e) => setUpdatedReps(e.target.value)} />
            <label>Instructions: </label>
            <input type="text" name="instructions" value={updatedInstructions} onChange={(e) => setUpdatedInstructions(e.target.value)} />

            <button type="submit">Update Training</button>
        </form>
    );
}







