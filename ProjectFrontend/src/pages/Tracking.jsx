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
  Input,
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
import trackingServices from "../services/tracking.service";
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
    } catch (error) {
      console.log("Error fetching data:", error);
    }
  };

  const handleDelete = (trackerId) => {
    setTrackers(trackers.filter((item) => item._id !== trackerId));
    trackingServices
      .deleteTracker(trackerId)
      .then(() => {
        console.log("Tracker deleted successfully!");
      })
      .catch((error) => {
        console.log("Error deleting tracker", error);
      })
      .finally(() => {
        console.log("Trackers reloaded");
      });
  };

  const handleEdit = (trackerId, updatedTrackerData) => {
    setTrackers((prevTrackers) =>
      prevTrackers.map((item) =>
        item._id === trackerId ? updatedTrackerData : item
      )
    );
    trackingServices
      .updateTracker(trackerId, updatedTrackerData)
      .then(() => location.reload(true))
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
        setTrackers((copyTrackers) => [...copyTrackers, response.data]);
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
      <VStack spacing={10} mt={20} align="stretch">
        <Text as={RouterLink} to="/profile" color="orange" fontSize="2xl" fontWeight="bold" fontFamily={"sans-serif"} _hover={{ textDecoration: "none", color: "blue.600" }}>
          My Profile
        </Text>
        <Text as={RouterLink} to="/myplan" color="orange" fontSize="2xl" fontWeight="bold" fontFamily={"sans-serif"} _hover={{ textDecoration: "none", color: "blue.600" }}>
          My Plan
        </Text>
        <Text as={RouterLink} to="/tracking" color="orange" fontSize="2xl" fontWeight="bold" fontFamily={"sans-serif"} _hover={{ textDecoration: "none", color: "blue.600" }}>
          Tracking
        </Text>
      </VStack>
      <Flex justify="flex-end">
        <Button onClick={onOpen} mt={-190} mr={850} colorScheme="orange">
          Add Tracker
        </Button>
      </Flex>
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader fontSize="40px" fontWeight="bold" color="orange" mb={10}>
            Add Tracking
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={10} mb={5}>
              <Input
                type="text"
                placeholder="Bodyweight"
                value={newTracker.bodyWeight}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, bodyWeight: e.target.value })
                }
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
              />
              <Input
                type="number"
                placeholder="Steps"
                value={newTracker.steps}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, steps: parseInt(e.target.value) })
                }
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
              />
              <Input
                type="text"
                placeholder="Duration"
                value={newTracker.duration}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, duration: e.target.value })
                }
                style={{ backgroundColor: "#FBD38D", height: "35px", borderRadius: "5px" }}
              />
              <Input
                type="text"
                placeholder="Kcals"
                value={newTracker.kcals}
                onChange={(e) =>
                  setNewTracker({ ...newTracker, kcals: e.target.value })
                }
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
      {trackers.map((item) => (
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
                  Bodyweight
                </Th>
                <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                  Steps
                </Th>
                <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                  Duration
                </Th>
                <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange" color={"orange"}>
                  Kcals
                </Th>
              </Tr>
            </Thead>
            <Tbody>
              <Tr>
                                <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                  {item.bodyWeight}
                </Td>
                <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                  {item.steps}
                </Td>
                <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                  {item.duration}
                </Td>
                <Td borderColor="orange" fontFamily={"sans-serif"} fontSize={13}>
                  {item.kcals}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Flex direction="row">
            <EditTracker
              trackerId={item._id}
              bodyWeight={item.bodyWeight}
              steps={item.steps}
              duration={item.duration}
              kcals={item.kcals}
              onUpdate={handleEdit}
            />
            <DeleteTracker trackingId={item._id} onDelete={handleDelete} />
          </Flex>
        </Box>
      ))}
    </Box>
  );
}