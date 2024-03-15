import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Text, Flex, Button, Grid, GridItem, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter, ModalCloseButton, Card, CardHeader, CardBody, CardFooter, Heading, useDisclosure, useToast } from '@chakra-ui/react';
import memberService from "../services/member-result.service";

export default function MembersResults() {
    const [data, setData] = useState([]);
    const { id } = useParams();
    const [selectedMember, setSelectedMember] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await memberService.getAllMembers(id);
                setData(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleOpenModal = (member) => {
        setSelectedMember(member);
        onOpen();
        showCongrats(); 
    };

    const handleCloseModal = () => {
        setSelectedMember(null);
        onClose();
    };

    const showCongrats = () => {
        toast({
            title: "Congratulations on your progress!",
            status: "success",
            position: "bottom",
            duration: 3500,
            isClosable: true,
            colorScheme: "orange",
        });
    };

    return (
        <Flex justifyContent="center" alignItems="center">
            <Grid templateColumns="repeat(4, 1fr)" gap={120} style={{ rowGap: '1px' }} >
                {data.map((member, index) => (
                    <GridItem key={member._id}>
                        <Card width="350px" height="400px" mt="100px" position="relative" style={{ backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 1)), url(${index % 2 === 0 ? 'https://us.123rf.com/450wm/funwayillustration/funwayillustration1609/funwayillustration160900035/62091117-boy-before-after-illustration-design.jpg?ver=6' : 'https://img.freepik.com/premium-vector/woman-character-before-after-losing-weight-flat-cartoon-illustration_133260-2155.jpg'})`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                            <CardHeader>
                                <Heading size='lg' fontFamily={"sans-serif"} color={"orange"} fontWeight={"bold"}>{member.title}</Heading>
                            </CardHeader>
                            <CardBody fontFamily={"sans-serif"} fontWeight={"bold"} color={"grey"} mt={220}>
                                <Text>{member.description.substring(0, 70)}...</Text>
                            </CardBody>
                            <CardFooter position="absolute" bottom="-px" left="-7px">
                                <Button onClick={() => handleOpenModal(member)} style={{ backgroundColor: '#FBD38D' }} color={"white"}>Testimony</Button>
                            </CardFooter>
                        </Card>
                    </GridItem>
                ))}
            </Grid>

            <Modal isOpen={isOpen} onClose={handleCloseModal}>
                <ModalOverlay style={{ backdropFilter: 'blur(7px)' }}/>
                <ModalContent>
                    <ModalHeader color={"orange"} fontSize={"30px"} fontFamily={"sans-serif"} fontWeight={"bold"}>{selectedMember ? selectedMember.name : "sjkbdbashja" }</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {selectedMember && (
                            <>
                                <Text fontSize={"20px"} fontFamily={"sans-serif"} mt={2}>{selectedMember.description}</Text>
                            </>
                        )}
                    </ModalBody>
                    <ModalFooter>
                        <Button style={{ backgroundColor: '#FBD38D' }} color={"white"} mr={3} onClick={handleCloseModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Flex>
    );
}