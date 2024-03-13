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
  Select,
} from "@chakra-ui/react";
import trackingServices from "../services/tracking.service";
import AddTracker from "../components/AddTracker";
import EditTracker from "../components/EditTracker";
import DeleteTracker from "../components/DeleteTracker";

export default function Tracking() {
  const [trackers, setTrackers] = useState([]);
  const [newTracker, setNewTracker] = useState({
    bodyWeight: "",
    steps: "",
    duration: "",
    kcals: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const fetchData = async () => {
    try {
      const response = await trackingServices.getAllTrackers();

      setTrackers(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleDelete = (trackingid) => {
    setTrackers(trackers.filter((item) => item._id !== trackingid));
    trackingServices
      .deleteTracker(trackingid)
      .then(() => {
        console.log("Tracking deleted successfully!");
      })
      .catch((error) => {
        console.log("Error deleting trackers", error);
      })
      .finally(() => {
        console.log("Trackers reloaded");
      });
  };

  const handleEdit = (trackerId, updatedTrackerData) => {
    setTrackers((prevTracker) =>
      prevTracker.map((item) =>
        item._id === trackerId ? updatedTrackerData : item
      )
    );
    console.log("Editing training with ID:", trackerId);
    console.log("Updated training data:", updatedTrackerData);
    trackingServices
      .updateTracker(trackerId, updatedTrackerData)
      .then(() => {
        console.log("Tracker updated successfully.");
      })
      .catch((error) => {
        console.log("Error updating tracker:", error);
      })
      .finally(() => {
        console.log("Page reloaded.");
      });
  };

  const handleCreate = () => {
    trackingServices
      .createTracking(newTracker)
      .then((response) => {
        console.log("Tracker created successfully:", response.data);
        const oneTrack = response.data;
        setTrackers((copyT) => [...copyT, oneTrack]);
/*         fetchData(); */
        /*         setNewTracker([...trackers, response.data]); */
        onClose();
      })
      .catch((error) => {
        console.log("Error creating tracker:", error);
      });
  };

  useEffect(() => {
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
      <Button onClick={onOpen} mt={4}>
        Add Tracking
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontWeight="bold">
            Tracking
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={10}>
              <input
                type="text"
                placeholder="Bodyweight"
                value={newTracker.bodyWeight}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, bodyWeight: e.target.value })
                }
                style={{
                  backgroundColor: "PaleTurquoise",
                  height: "35px",
                  borderRadius: "5px",
                }}
              />
              <input
                type="number"
                placeholder="Steps"
                value={newTracker.steps}
                onChange={(e) =>
                  setNewTracker({
                    ...newTracker,
                    steps: parseInt(e.target.value),
                  })
                }
                style={{
                  backgroundColor: "PaleTurquoise",
                  height: "35px",
                  borderRadius: "5px",
                }}
              />
              <input
                type="text"
                placeholder="Duration"
                value={newTracker.sets}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, duration: e.target.value })
                }
                style={{
                  backgroundColor: "PaleTurquoise",
                  height: "35px",
                  borderRadius: "5px",
                }}
              />
              <input
                type="text"
                placeholder="Kcals"
                value={newTracker.reps}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, kcals: e.target.value })
                }
                style={{
                  backgroundColor: "PaleTurquoise",
                  height: "35px",
                  borderRadius: "5px",
                }}
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
      {trackers.map((item) => {
        return (
          <Box key={item._id} mt={4} borderWidth="1px" p={4}>
            <Text>Bodyweight: {item.bodyWeight}</Text>
            <Text>Steps:{item.steps}</Text>
            <Text>Duration: {item.duration}</Text>
            <Text>kcals: {item.kcals}</Text>
            <DeleteTracker trackingId={item._id} onDelete={handleDelete} />
            <EditTracker
              trackerId={item._id}
              bodyWeight={item.bodyWeight}
              steps={item.steps}
              duration={item.duration}
              kcals={item.kcals}
              onUpdate={handleEdit}
            />
          </Box>
        );
      })}
    </Box>
  );
}