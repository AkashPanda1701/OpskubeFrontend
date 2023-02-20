import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Link,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
  } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/auth/action';
import { CLEAR_AUTH_MESSAGE } from '../redux/auth/actionTypes';
  
const initialFormState = {
    username: '',
    password: '',
    };
  export default function Login() {
const [formdata, setFormdata] = useState(initialFormState);
const toast = useToast();
const authState = useSelector((state) => state.auth);
// console.log('authState: ', authState);

const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(() => {
    if (authState.message) {
        toast({
            title: authState.message,
            status: authState.error ? 'error' : 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',

        });
        dispatch({ type: CLEAR_AUTH_MESSAGE });
        if(!authState.error) {

            navigate('/');
        }
    }
}, [authState.message,navigate, authState.error, toast, dispatch]);


const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(formdata));
        // setFormdata(initialFormState);
    };

    return (
      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}>
        <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
          <Stack align={'center'}>
            <Heading fontSize={'4xl'}>Sign in to your account</Heading>
            <Text fontSize={'lg'} color={'gray.600'}>
              to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
            </Text>
          </Stack>
          <Box
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.700')}
            boxShadow={'lg'}
            p={8}>
            <Stack spacing={4} >
              <FormControl color='teal.400'>
                <FormLabel>Username</FormLabel>
                <Input type="text" name="username" value={formdata.username} onChange={handleChange} />
              </FormControl>
              <FormControl  color='teal.400'>
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" value={formdata.password} onChange={handleChange} />
              </FormControl>
              <Stack spacing={10}>
                <Stack
                  direction={{ base: 'column', sm: 'row' }}
                  align={'start'}
                  justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button
                loadingText='Loading...'
                isLoading={authState.loading}
                    onClick={handleSubmit}
                  bg={'teal.400'}
                  color={'white'}
                  _hover={{
                    bg: 'teal.600',
                  }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Flex>
    );
  }