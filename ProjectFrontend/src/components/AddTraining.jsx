import { useState } from "react";
import trainingServices from "../services/training.service";

export default function AddTraining(props) {
    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [muscle, setMuscle] = useState("");
    const [sets, setSets] = useState("");
    const [reps, setReps] = useState("");
    const [instructions, setInstructions] = useState("");

    const {training, setTraining } = props;

    function handleSubmit(e) {
        e.preventDefault();
        const newTraining = {name, type, muscle, sets, reps, instructions}
        console.log(newTraining)
        trainingServices
        .createTraining(newTraining)
        .then((response) => setTraining([...training, response.data]))
        .catch((error) => console.log(error));
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <label>Name: </label>
            <input type="text" name="name" value={name} color="orange" onChange={(e) => setName(e.target.value)} />
            <label>Type: </label>
            <input type="text" name="type" value={type} onChange={(e) => setType(e.target.value)} />
            <label>Muscle: </label>
            <input type="text" name="muscle" value={muscle} onChange={(e) => setMuscle(e.target.value)} />
            <label>Sets: </label>
            <input type="number" name="sets" value={sets} onChange={(e) => setSets(e.target.value)} />
            <label>Reps: </label>
            <input type="number" name="reps" value={reps} onChange={(e) => setReps(e.target.value)} />
            <label>Instructions: </label>
            <input type="text" name="instructions" value={instructions} onChange={(e) => setInstructions(e.target.value)} />

            <button type="submit">Add Training</button>
        </form>
    );

}