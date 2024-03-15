import {
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
    useDisclosure,
    Table, 
    Thead, 
    Tbody, 
    Tr, 
    Th, 
    Td
  } from '@chakra-ui/react';
  function BasicUsage({ children, modalTitle, modalExercises, workoutDescription }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const handleOpen = () => {
      onOpen();
  };
  
  const handleClose = () => {
      onClose();
  };
  
  return (
      <>
          {children(handleOpen)}
          <Modal isOpen={isOpen} onClose={handleClose}>
              <ModalOverlay style={{ backdropFilter: 'blur(5px)' }} />
              <ModalContent>
                  <ModalHeader  colorfontSize={"30px"} fontFamily={"sans-serif"}>{modalTitle}</ModalHeader>
                  <ModalCloseButton />
                  <ModalBody>
                  <Table variant="simple" size="sm" borderColor="orange">
    <Thead>
      <Tr>
        <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange">Exercise</Th>
        <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange">Sets</Th>
        <Th fontSize={"15px"} fontFamily={"sans-serif"} fontWeight="bold" borderColor="orange">Reps</Th>
      </Tr>
    </Thead>
    <Tbody>
      {modalExercises.map((exercise, index) => (
        <Tr key={index} _horizontalalAlign="center" verticalAlign="middle">
          <Td borderColor="orange">{exercise.name}</Td>
          <Td borderColor="orange">{exercise.sets}</Td>
          <Td borderColor="orange">{exercise.reps}</Td>
        </Tr>
      ))}
    </Tbody>
  </Table>
                      <Text mt={8} fontFamily={"sans-serif"}>{workoutDescription}</Text>
                  </ModalBody>
                  <ModalFooter>
                      <Button style={{ backgroundColor: '#FBD38D' }} color={"white"} mr={3} onClick={handleClose}>
                          Close
                      </Button>
                  </ModalFooter>
              </ModalContent>
          </Modal>
      </>
  );
  }
  
  function CardWithModal({ title, description, modalTitle, modalExercises, workoutDescription, image }) {
  return (
      <Card width="300px" height="400px" mt="100px" position="relative" bgImage={`linear-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0.2)), url(${image})`} bgSize="cover" bgPos="center">
          <CardHeader>
              <Heading size='lg' fontFamily={"sans-serif"} color={"orange"} fontWeight={"bold"}>{title}</Heading>
          </CardHeader>
          <CardBody fontFamily={"sans-serif"} fontWeight={"bold"} color={"black"}>
  {/*                <Text>{description}</Text>
  */}          </CardBody>
          <CardFooter position="absolute" bottom="-8px" left="-7px">
              <BasicUsage
                  modalTitle={modalTitle}
                  modalExercises={modalExercises}
                  workoutDescription={workoutDescription}
              >
                  {(handleOpen) => (
                      <Button onClick={handleOpen} style={{ backgroundColor: '#FBD38D' }} color={"white"}>Details</Button>
                  )}
              </BasicUsage>
          </CardFooter>
      </Card>
  );
  }

  const ChallengeData = [
    {
        title: "Mums in Motion",
        description: "This effective workout, using just a pair of dumbbells, is tailored to fit seamlessly into your hectic schedule, allowing you to build strength, increase flexibility, and achieve effective fat loss from the comfort of your own home.",
        modalTitle: "Mums in Motion Workout Details",
        modalExercises: [
            { name: "Squats", sets: "3", reps: "12-15" },
            { name: "Jumping Jacks", sets: "3", reps: "30 seconds" },
            { name: "Push-ups", sets: "3", reps: "8-10" },
            { name: "Lunges", sets: "3", reps: "12-15 each leg" },
            { name: "High Knees", sets: "3", reps: "45 seconds" }
        ],
        workoutDescription: "A full-body workout suitable for moms of all fitness levels. It includes a combination of strength training and cardio exercises using only dumbbells. Perfect for busy schedules, this workout can be completed in under 30 minutes and requires minimal equipment.",
        image: "https://rushcuttershealth.com.au/wp-content/uploads/2021/04/Workout-for-new-mum.jpg"
    },
    {
        title: "Dad Bod Strength",
        description: "You can focus on gaining strength and building muscle through a workout that will allow you to see progress and start to feel like a stronger, more confident version of yourself.",
        modalTitle: "Dad Bod Strength Workout Details",
        modalExercises: [
            { name: "Deadlifts", sets: "3", reps: "8-10" },
            { name: "Bench Press", sets: "3", reps: "12-15" },
            { name: "Pull-ups", sets: "5", reps: "6-8" },
            { name: "Overhead Press", sets: "4", reps: "8-10" },
            { name: "Plank", sets: "5", reps: "30-60 seconds" }
        ],
        workoutDescription: "An intermediate-level strength training workout focusing on compound movements. Designed to help you build muscle and improve overall strength, this workout targets major muscle groups in the upper body and core. It can be completed in about 45 minutes with basic gym equipment such as a barbell, dumbbells, and a pull-up bar.",
        image:"https://i2-prod.mirror.co.uk/incoming/article8207756.ece/ALTERNATES/s615b/Ian-Bonzani-pictured-working-out-with-his-son-Laurence-5-months-old.jpg"
    },
    {
        title: "Bro Gains",
        description: "Tired of being the skinny dude at the gym? Get ready to bulk up like a pro with our expert-made workout that will get you saying goodbye to spaghetti arms and chicken legs in no time.",
        modalTitle: "Bro Gains Workout Details",
        modalExercises: [
            { name: "Barbell Squats", sets: "4", reps: "8-10" },
            { name: "Dumbbell Bench Press", sets: "4", reps: "8-10" },
            { name: "Barbell Rows", sets: "4", reps: "8-10" },
            { name: "Dumbbell Shoulder Press", sets: "4", reps: "8-10" },
            { name: "Pull-ups", sets: "4", reps: "6-8" }
        ],
        workoutDescription: "An advanced-level workout designed for serious muscle gains. This workout focuses on compound movements and heavy lifting to maximize muscle hypertrophy. Expect a challenging session lasting around 60-75 minutes. You'll need access to a fully equipped gym with barbells, dumbbells, and a pull-up bar.",
        image:"https://media.istockphoto.com/id/513434400/photo/bros-working-out-together-in-a-gym.jpg?s=612x612&w=0&k=20&c=RGzqbyw-B_j9g7FrqQbUG5Ni90qIxwOT1x1KAeZ0l68="
    },
    {
        title: "Part-time Athlete",
        description: "Looking to take your athletic performance to the next level? A personalised workout will help anyone who participates in sports or martial arts reduce injury and improve performance through resistance training.",
        modalTitle: "Part-time Athlete Workout Details",
        modalExercises: [
            { name: "Barbell Squats", sets: "4", reps: "6-8" },
            { name: "Deadlifts", sets: "4", reps: "6-8" },
            { name: "Bench Press", sets: "4", reps: "6-8" },
            { name: "Pull-ups", sets: "4", reps: "6-8" },
            { name: "Plank", sets: "3", reps: "30-60 seconds" }
        ],
        workoutDescription: "An intermediate-level workout designed to enhance athletic performance and strength. This session combines compound lifts with bodyweight exercises, targeting key muscle groups used in sports and martial arts. Expect to spend around 45-60 minutes completing this workout. Minimal equipment is required, including a barbell, weights, and a pull-up bar.",
        image:"https://www.childrens.com/wps/wcm/connect/childrenspublic/d97eae83-546b-4ca7-a7e7-35b02439c10c/AndrewsInst%28J2011050069%29_800x480.jpg?MOD=AJPERES&CVID="
    },
    {
        title: "HIIT - Lower Body",
        description: "Ignite your lower body workouts with HIIT! Burn fat, sculpt muscles, and boost metabolism in record time. With dynamic exercises targeting key muscle groups like glutes, quads, and hamstrings, HIIT elevates endurance and enhances overall strength. Elevate your fitness game with HIIT for lower body!",
        modalTitle: "HIIT - Lower Body Workout Details",
        modalExercises: [
            { name: "Squats", sets: "4", reps: "20 seconds" },
            { name: "Lunges", sets: "4", reps: "20 seconds" },
            { name: "Jump Squats", sets: "4", reps: "20 seconds" },
            { name: "Glute Bridges", sets: "4", reps: "20 seconds" },
            { name: "Calf Raises", sets: "4", reps: "20 seconds" }
        ],
        workoutDescription: "An advanced-level HIIT workout targeting the lower body. This high-intensity session is designed to torch calories and build strength in the legs and glutes. It involves short bursts of intense exercise followed by brief rest periods. Expect a challenging workout lasting around 30-45 minutes. No equipment is necessary, making it perfect for home workouts.",
        image:"https://media.istockphoto.com/id/1305549557/pt/foto/fit-hispanic-woman-in-activewear-exercising-at-the-gym.jpg?s=612x612&w=0&k=20&c=jyCzWwSkJh4yOEEU2cX05MMtWf1DoINrs5UQ26Q1VzQ="
    },
    {
        title: "Calisthenics",
        description: "Elevate your fitness journey with full-body Calisthenics! Sculpt and strengthen every muscle group while improving flexibility and agility. With dynamic exercises like push-ups, pull-ups, and burpees, Calisthenics offers a comprehensive and effective workout. Enhance your endurance and overall athleticism with full-body Calisthenics!",
        modalTitle: "Calisthenics Workout Details",
        modalExercises: [
            { name: "Push-ups", sets: "4", reps: "10-15" },
            { name: "Pull-ups", sets: "4", reps: "6-10" },
            { name: "Dips", sets: "4", reps: "10-15" },
            { name: "Squats", sets: "4", reps: "15-20" },
            { name: "Plank", sets: "3", reps: "30-60 seconds" }
        ],
        workoutDescription: "A beginner to intermediate-level workout focusing on bodyweight exercises. Calisthenics helps build strength, endurance, and flexibility using minimal equipment. This session targets multiple muscle groups and can be completed in 30-45 minutes. It's suitable for all fitness levels.",
        image:"https://www.setforset.com/cdn/shop/articles/calisthenics_back_workout_2000x.jpg?v=1684335042"
    },
    {
        title: "3B",
        description: "Transform your body and embrace your curves with our exclusive Bum Bum Brasil fitness class! Tone your lower body with Brazilian-inspired moves that target your glutes, thighs, and core. Combining dance, cardio, and strength training, 3B delivers a fun and effective workout experience.",
        modalTitle: "3B Workout Details",
        modalExercises: [
            { name: "Squats", sets: "3", reps: "15-20" },
            { name: "Lunges", sets: "3", reps: "15-20 each leg" },
            { name: "Glute Bridges", sets: "3", reps: "15-20" },
            { name: "Donkey Kicks", sets: "3", reps: "15-20 each leg" },
            { name: "Fire Hydrants", sets: "3", reps: "15-20 each leg" }
        ],
        workoutDescription: "An intermediate-level workout inspired by Brazilian fitness culture. 3B focuses on toning and strengthening the lower body, particularly the glutes, thighs, and core. Incorporating dance, cardio, and strength training, this session offers a dynamic and enjoyable fitness experience. Expect to spend around 45-60 minutes completing the workout.",
        image:"https://educatefitness.co.uk/wp-content/uploads/2023/03/Benefits-of-group-fitness.jpg"
    },
    {
        title: "HIIT - Upper Body",
        description: "Torch calories, sculpt muscles, and boost strength with dynamic exercises targeting your arms, shoulders, chest, and back. Whether you're crushing push-ups, rows, or shoulder presses, our high-intensity intervals maximize results in minimal time.",
        modalTitle: "HIIT - Upper Body Workout Details",
        modalExercises: [
            { name: "Push-ups", sets: "4", reps: "15-20" },
            { name: "Pull-ups", sets: "4", reps: "6-10" },
            { name: "Dumbbell Rows", sets: "4", reps: "10-12 each arm" },
            { name: "Dumbbell Shoulder Press", sets: "4", reps: "10-12" },
            { name: "Plank", sets: "3", reps: "30-60 seconds" }
        ],
        workoutDescription: "An intermediate-level HIIT workout targeting the upper body. This session focuses on dynamic exercises to sculpt and strengthen the arms, shoulders, chest, and back. It involves high-intensity intervals with brief rest periods, maximizing calorie burn and muscle engagement. Expect to spend around 30-45 minutes completing the workout.",
        image:"https://upload.wikimedia.org/wikipedia/commons/f/f0/HIIT_Workout.jpg"
    },
    {
        title: "Postpartum Mums in Motion",
        description: "Because we understand that finding time for exercise as a new mom can be tough, we tailor your program specifically to your needs, whether you want to train at home or at the gym.",
        modalTitle: "Postpartum Mums in Motion Workout Details",
        modalExercises: [
            { name: "Kegel Exercises", sets: "3", reps: "10-15" },
            { name: "Pelvic Tilts", sets: "3", reps: "10-15" },
            { name: "Diaphragmatic Breathing", sets: "3", reps: "10-15" },
            { name: "Gentle Yoga Poses", sets: "3", reps: "Hold for 30-60 seconds" },
            { name: "Walking", sets: "3", reps: "20-30 minutes" }
        ],
        workoutDescription: "A beginner-friendly postpartum workout designed to aid in recovery and promote overall well-being. This session includes gentle exercises such as Kegels, pelvic tilts, and diaphragmatic breathing to strengthen the pelvic floor and core muscles. Gentle yoga poses and walking help improve flexibility, reduce stress, and increase energy levels. Expect to spend around 30-45 minutes completing the workout.",
        image:"https://www.nourishmovelove.com/wp-content/uploads/2022/12/postpartum-workout-plan-scaled.jpg"
    },
  ];

  export default function Challenges() {
    return (
        <Flex justifyContent="center" alignItems="center">
            <SimpleGrid spacingX={300} spacingY={15} templateColumns='repeat(3, 1fr)'>
                {ChallengeData.map((challenge, index) => (
                    <CardWithModal key={index} {...challenge} />
                ))}
            </SimpleGrid>
        </Flex>
    );
}