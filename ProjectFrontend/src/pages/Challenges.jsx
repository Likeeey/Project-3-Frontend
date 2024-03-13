import {
    Box,
    Button,
    Card,
    CardBody,
    CardFooter,
    CardHeader,
    Heading,
    SimpleGrid,
    Text,
    Flex,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import React from 'react';

function BasicUsage({ children, description }) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    
    return (
      <>
        {children(onOpen)}
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{description}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {/* Description passed as prop */}
              <Text>{description}</Text>
            </ModalBody>
            <ModalFooter>
              <Button colorScheme='blue' mr={3} onClick={onClose}>
                Close
              </Button>
                </ModalFooter>
          </ModalContent>
        </Modal>
      </>
    );
  }
  
  function CardWithModal({ title, description }) {
    return (
      <Card width="300px" height="400px" mt="100px">
        <CardHeader>
          <Heading size='lg'>{title}</Heading>
        </CardHeader>
        <CardBody>
          <Text>{description}</Text>
        </CardBody>
        <CardFooter position="absolute" bottom="-8px" left="-7px">
          {/* Pass description as prop to BasicUsage */}
          <BasicUsage description={description}>
            {(onOpen) => (
              <Button onClick={onOpen}>View here</Button>
            )}
          </BasicUsage>
        </CardFooter>
      </Card>
    );
  }

export default function Challenges() {
  return (
    <Flex justifyContent="center" alignItems="center">
      <SimpleGrid spacingX={300} spacingY={15} templateColumns='repeat(3, 1fr)'>
        <CardWithModal
          title="Mums in Motion"
          description="This effective workout, using just a pair of dumbbells, is tailored to fit seamlessly into your hectic schedule, allowing you to build strength, increase flexibility, and achieve effective fat loss from the comfort of your own home."
        />
        <CardWithModal
          title="Dad Bod Strength"
          description="You can focus on gaining strength and building muscle through a workout that will allow you to see progress and start to feel like a stronger, more confident version of yourself."
        />
        <CardWithModal
          title="Bro Gains"
          description="Tired of being the skinny dude at the gym? Get ready to bulk up like a pro with our expert-made workout that will get you saying goodbye to spaghetti arms and chicken legs in no time."
        />
        <CardWithModal
        title="Part-time Athlete"
        description="Looking to take your athletic performance to the next level? A personalised workout will help anyone who participates in sports or martial arts reduce injury and improve performance through resistance training."
        />
        <CardWithModal
        title="HIIT - Lower Body"
        description="Ignite your lower body workouts with HIIT! Burn fat, sculpt muscles, and boost metabolism in record time. With dynamic exercises targeting key muscle groups like glutes, quads, and hamstrings, HIIT elevates endurance and enhances overall strength. Elevate your fitness game with HIIT for lower body!"
        />
        <CardWithModal
        title="Calisthenics"
        description="Elevate your fitness journey with full-body Calisthenics! Sculpt and strengthen every muscle group while improving flexibility and agility. With dynamic exercises like push-ups, pull-ups, and burpees, Calisthenics offers a comprehensive and effective workout. Enhance your endurance and overall athleticism with full-body Calisthenics!"
        />
        <CardWithModal
        title="3B"
        description="Transform your body and embrace your curves with our exclusive Bum Bum Brasil fitness class! Tone your lower body with Brazilian-inspired moves that target your glutes, thighs, and core. Combining dance, cardio, and strength training, 3B delivers a fun and effective workout experience."
        />
        <CardWithModal
        title="HIIT - Upper Body"
        description="Torch calories, sculpt muscles, and boost strength with dynamic exercises targeting your arms, shoulders, chest, and back. Whether you're crushing push-ups, rows, or shoulder presses, our high-intensity intervals maximize results in minimal time."
        />
        <CardWithModal
        title="Postpartum Mums in Motion"
        description="Because we understand that finding time for exercise as a new mom can be tough, we tailor your program specifically to your needs, whether you want to train at home or at the gym."
        />
      </SimpleGrid>
    </Flex>
    
  );
  
}