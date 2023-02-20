import { Box, Button, Flex, Text, useToast } from '@chakra-ui/react'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AUTH_LOGOUT } from '../redux/auth/actionTypes';
import { getOrder } from '../redux/order/action';
import { CLEAR_ORDER_MESSAGE, GET_ORDER_SUCCESS } from '../redux/order/actionTypes';

function Navbar() {
    const authState =useSelector(state=>state.auth);
    const orderState =useSelector(state=>state.order);
    const dispatch = useDispatch();
    const toast = useToast();

    
    useEffect(() => {
        if(authState.token){

            dispatch(getOrder());
        }
    }, [dispatch,authState.token]);

    useEffect(() => {
        if(orderState.message){
            toast({
                title:orderState.message,
                status:orderState.error ? 'error' : 'success',
                duration:3000,
                isClosable:true,
                position:'top'
            })
            dispatch({type:CLEAR_ORDER_MESSAGE})
        }
    }, [orderState.message,orderState.error,toast,dispatch]);

  return (
    <Flex
    gap='4'
    bg = 'purple.200'
    p='4'
    justify='flex-end'
    fontSize={'lg'}
    fontWeight='semibold'
    color={'teal.600'}
    alignItems='center'
    
    >
        <Link to='/'>
        <Text
        _hover={{
            color:'red',
            cursor:'pointer',
            transform:'scale(1.1)'
        }
    }
    >Books</Text>
        </Link>

        <Box position={'relative'}>


        <Link to='/orders'>
        <Text
        
        _hover={{
            color:'red',
            cursor:'pointer',
            
            transform:'scale(1.1)'
        }
    }
    >Orders</Text>
        </Link>
      { authState.token && <Box 
        position='absolute'
        top='-15px'
        right='-5px'
        bg='red'
        color='white'
        borderRadius='50%'
        w='20px'
        h='20px'
        display='flex'
        alignItems='center'
        justifyContent='center'
        fontSize='sm'
        >
            {orderState.orders.length}
            </Box>}

    </Box>
            {
                authState.token && <Text>Hi {authState.username}</Text>
            }

      { !authState.token ?<Link to='/login'>
        <Text
        _hover={{
            color:'red',
            cursor:'pointer',
            transform:'scale(1.1)'
        }
        }
        
        >Login</Text>
        </Link>
        :

<Button
onClick={()=>{
    dispatch({type:AUTH_LOGOUT})
    toast({
        title:'Logged Out Successfully',
        status:'success',
        duration:3000,
        isClosable:true,
        position:'top'
    })
    dispatch({type:GET_ORDER_SUCCESS,payload: {
        orders: [],
    }})

}
}
colorScheme='red'
>Logout</Button>
}
    </Flex>
  )
}

export default Navbar
