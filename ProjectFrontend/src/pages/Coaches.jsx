import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Stack, Box, Image, Heading, Text, Grid } from "@chakra-ui/react";
import coachService from "../services/coach.service";

const coachPhotos = [
    { photo: "https://www.julienutrition.com/wp-content/uploads/2023/02/Personal-Trainer-Strength-Conditioning-and-Fitness-Coach-JM-Nutrition.jpg" },
    { photo: "https://news.dasa.ncsu.edu/wp-content/uploads/sites/39/2019/08/Shaily-Article-Photo.png" },
    { photo: "https://www.crossfitmafia.com/wp-content/uploads/sites/87/2023/08/TeamKatie.jpg" },
    { photo: "https://www.shutterstock.com/image-photo/nutritionist-desk-healthy-fruits-juice-600nw-1566062176.jpg" },
    { photo: "https://static.wixstatic.com/media/c27e15_9cac7aa691fd4ea99207a313e77d8346~mv2.jpg/v1/fill/w_640,h_575,al_c,q_85/c27e15_9cac7aa691fd4ea99207a313e77d8346~mv2.jpg" },
    { photo: "https://media.istockphoto.com/id/1442080963/photo/pilates-instructor-in-white-yoga-suit-beautiful-young-asian-woman.jpg?s=612x612&w=0&k=20&c=oVr2p3JykatCYVQQyVsUoFAF-wSNRMwe8YxLHWEwJ6M=" },
    { photo: "https://www.crossfitreverence.com/uploads/1/0/4/8/104886357/editor/0r7a2228.jpg?1670444148" },
    { photo: "https://i0.wp.com/ononestudios.com/wp-content/uploads/2023/03/loose.jpg?resize=1024%2C576&ssl=1" },
    { photo: "https://images.squarespace-cdn.com/content/v1/5caa8aa82727be722aeb38d9/1634550184298-STPDR2QQ6CJTQUV23FM5/CMC+Class+2021-07-09+%28HR%29+%28554+of+1077%29.jpg" },
    { photo: "https://images.lifestyleasia.com/wp-content/uploads/sites/3/2021/06/25120938/172465430_298970641810120_7903408233730106209_n-1035x900.jpg" },
    { photo: "https://www.nasm.org/images/nasmlibraries/pages/strength-and-conditioning-coach-bundle/strength-and-conditioning-coach-hero-1.jpg?sfvrsn=fa2b8e9_2" },
    { photo: "https://www.groupxtraining.com/wp-content/uploads/2020/04/barreyoga.jpg" },
];

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
            {coaches.map((coach, index) => (
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
                                src={coachPhotos[index % coachPhotos.length].photo}
                                alt={coach.name}
                                borderRadius="full"
                                boxSize="220px"
                                height={"200px"}
                                border={"1px solid #FBD38D"}
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