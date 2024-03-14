import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box, Image, Heading, Text, Button, Grid } from "@chakra-ui/react";
import coachService from "../services/coach.service";

export default function MyPlan() {
    const [coaches, setCoaches] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await coachService.getAllCoaches(id);
                setCoaches(response.data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }
        };

        fetchData();
    }, [id]); 

    return (
        <Stack spacing={4} mr={"100px"} ml={"100px"}>
            {coaches.map((coach) => (
                <Box key={coach._id} mt={10}>
                    <Box border="1px solid #FBD38D" borderRadius="md" width="fit-content" p={5}>
                        <Grid
                            templateColumns={{ base: "1fr", sm: "200px 1fr" }}
                            gap={4}
                            alignItems="center"
                            mt={5}
                            mb={5}
                            maxW="1300px"
                        >
                            <Box>
                                <Image
                                    objectFit="cover"
                                    maxW={{ base: "100%", sm: "500px" }}
                                    maxH={{ base: "200px", sm: "auto" }}
                                    ml={5}
                                    src="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
                                    alt={coach.name}
                                />
                            </Box>
                            <Box ml={5}>
                                <Heading ml={40} size="lg" color={"orange"} fontWeight={"bold"}>{coach.name}</Heading>
                                <Text ml={40} mt={5} fontFamily={"sans-serif"} fontSize={"30px"} style={{ color: "#FBD38D" }}>Education</Text>
                                <Text ml={40} mt={5} fontFamily={"sans-serif"} fontSize={"20px"}>{coach.description}</Text>
                                <Text fontFamily={"sans-serif"} fontSize={"18px"} style={{ color: "orange" }} ml={40} mt={5}>. {coach.speciality}</Text>
                                <Text fontFamily={"sans-serif"} fontSize={"18px"} style={{ color: "orange" }} ml={40} >. {coach.nationality}</Text>
                                <Text fontFamily={"sans-serif"} fontSize={"18px"} style={{ color: "orange" }} ml={40} >. {coach.languages}</Text>
                            </Box>
                        </Grid>
                    </Box>
                </Box>
            ))}
        </Stack>
    );
}