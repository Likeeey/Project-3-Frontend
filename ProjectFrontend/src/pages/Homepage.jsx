import { Button, Card, CardBody, CardFooter, Heading, Image, Stack, Text } from '@chakra-ui/react'

export default function Homepage () {
    return (
        <Card
  direction={{ base: 'column', sm: 'row' }}
  overflow='hidden'
  variant='outline'
  mt={20}
  fontSize={50}
>
  <Image
    objectFit='cover'
    maxW={{ base: '100%', sm: '900px' }}
    src="https://www.fitnessdigital.pt/images/promolinks/pt/PT/muscu5-desk_280823121745.jpg"
    alt='About'   
  />

  <Stack>
    <CardBody>
      <Heading size='l'>App Name</Heading>

      <Text py='0.5em'>
        Random text
      </Text>
    </CardBody>
  </Stack>
</Card>
    )
};