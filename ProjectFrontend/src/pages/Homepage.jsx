import React, { useState, useEffect } from 'react';
import { Box, Container, Flex, Image, Stack, Text } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

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

export default function Homepage() {
    const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
    const photosPerPage = 3;

    useEffect(() => {
        const interval = setInterval(() => {
            nextPhoto();
        }, 4500);
        return () => clearInterval(interval);
    }, [currentPhotoIndex]);

    const nextPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => {
            const newIndex = prevIndex + 1;
            return newIndex >= coachPhotos.length ? 0 : newIndex;
        });
    };

    const prevPhoto = () => {
        setCurrentPhotoIndex((prevIndex) => (prevIndex - photosPerPage + coachPhotos.length) % coachPhotos.length);
    };

    return (
        <Box>
            {/* Image */}
            <Flex justifyContent="center" mt={10}>
                <Image
                    objectFit='cover'
                    width='full'
                    src="https://www.fitnessdigital.pt/images/promolinks/pt/PT/muscu5-desk_280823121745.jpg"
                    alt='About'
                    maxH={900}
                    style={{ clipPath: 'inset(0 0 30% 0)' }}
                />
            </Flex>

            {/* Content */}
            <Flex justifyContent="center" mt={-150}>
                <Box
                    maxW='1000'
                    width='100%'
                    border={'1px solid orange'}
                    borderWidth='2px'
                    borderRadius='lg'
                    overflow='hidden'
                    boxShadow='md'
                    p={4}
                    bg='white'
                    textAlign='center'
                    color='black'
                    fontFamily={'sans-serif'}
                    fontWeight={'bold'}
                    fontSize={'lg'}
                >
                    <Container
                        maxW='container.xxl'
                        p={10}
                        bgGradient="linear(to-l, rgba(255,0,0,0.5), rgba(255,165,0.5), rgba(255,255,0,0.5), rgba(255,165,0,0.5), rgba(255,0,0,0.5), rgba(255,0,0,0.7))"
                        bgClip="border-box"
                        textAlign="center"
                        borderRadius="lg"
                        boxShadow="md"
                        color="white"
                        position="relative"
                        _after={{
                            content: '""',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0) 0%, rgba(255,255,255,0.2) 100%, rgba(255,255,255,0.3) 100%, rgba(255,255,255,0.4) 100%, rgba(255,255,255,0.45) 100%)',
                            animation: 'flames 3s ease-in-out infinite',
                            borderRadius: 'inherit'
                        }}
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                            right: '0',
                            bottom: '0',
                            backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0) 100%, rgba(255,255,255,0.2) 100%, rgba(255,255,255,0.3) 10%, rgba(255,255,255,0.4) 10%, rgba(255,255,255,0.45) 100%)',
                            animation: 'flames 3s ease-in-out infinite',
                            borderRadius: 'inherit'
                        }}
                    >
                        <Stack direction="row" spacing={200} align="center">
                            <Text fontSize='72' fontFamily={'sans-serif'}>Lusitanian Boost</Text>
                            <Text
                                fontSize='30'
                                textAlign="center"
                                fontWeight="bold"
                                letterSpacing="wide"
                            >
                                Fuel your focus, fuel your fire, and ignite your fitness journey!
                            </Text>
                        </Stack>
                    </Container>
                </Box>
            </Flex>

            {/* Team */}
            <Flex justifyContent="center" mt={10}>
                <Text fontSize="50" fontWeight="bold" fontFamily={"sans-serif"} color="orange" mt={35} mb={-10}>The Team</Text>
            </Flex>
            <Flex justifyContent="center">
                {coachPhotos.slice(currentPhotoIndex, currentPhotoIndex + photosPerPage).map((photo, index) => (
                    <Image
                        key={index}
                        src={photo.photo}
                        alt="Coach"
                        width={400} // Increased size
                        height={400} // Increased size
                        m={90}
                        borderRadius="50%"
                        boxShadow={'lg'}
                        style={{ clipPath: 'polygon(100% 0%, 100% 1%, 75% 100%, 0% 75%, 20% 10% )' }}
                    />
                ))}
            </Flex>
        </Box>
    );
}