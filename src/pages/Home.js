import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Box, Button, Flex, Grid, Img, Input, InputGroup, InputLeftElement,  Text, useToast } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrder } from '../redux/order/action';
import { Search2Icon } from '@chakra-ui/icons';

function Home() {
    const dispatch = useDispatch();
    const toast = useToast();
    const [books, setBooks] = useState([]);
    const [bookname, setBookname] = useState('');

    const orderState = useSelector((state) => state.order);
    const authState = useSelector((state) => state.auth);

    useEffect(() => {
        getBooks(bookname);
    }, [bookname]);


       async function getBooks(bookname) {
              const { data } = await axios.get(`http://localhost:3300/books?bookname=${bookname}`);
            //   console.log('data: ', data);
            //   console.log('data: ', data);
              setBooks(data);
        }
  return (
    <>
    <InputGroup m='40px auto'
    maxW={'md'}
    
    >
        <InputLeftElement children={
            <Search2Icon color='gray' 
            _hover={{cursor:'pointer',
            color:'blue',
            transform:'scale(1.2)'
            
        }}
        /> }
             />
        <Input placeholder='Search Book' onChange={(e)=>{setBookname(e.target.value)}} />
    </InputGroup>
    <Grid
    w='90%'
    m='40px auto'
    templateColumns={{
        base: 'repeat(1, 1fr)',
        md: 'repeat(2, 1fr)',
        lg: 'repeat(3, 1fr)',
    }}
    gap={6}

    >
        {
            books.map((book,index) =><Box
            shadow={'md'}
            rounded={'md'}
            p='4'
                    key={index}
                    >
                        <Img rounded={'md'} objectFit={'cover'} w='full' h='350px' src={book.image} />
                        <Text
                        fontWeight={'semibold'}
                        fontSize={'xl'}
                        color={'gray'}
                        >{book.bookname.charAt(0).toUpperCase() + book.bookname.slice(1)}</Text>
                        
                        
                        <Flex 
                        mt={2}
                        justify={'space-between'}
                        align={'center'}
                        >
                        <Text mt={2} color={'gray'}>₹{book.price}</Text>

                        {
                             orderState.orders.find((boo) => boo.bookname === book.bookname)
                            ? <Button
                            colorScheme={'green'}
                            onClick={()=>{toast({
                                title: "Book already added to Order",
                                status: "info",
                                duration: 3000,
                                isClosable: true,
                                position: 'top'
                            })}}
                            >
                                Ordered
                            </Button>:<Button 
                        onClick={()=>{
                            if(!authState.token){
                                toast({
                                    title: "Please Login to Order",
                                    status: "error",
                                    duration: 3000,
                                    isClosable: true,
                                    position: 'top'
                                })
                                    return;
                                }
                                dispatch(addOrder(book.bookname))
                            }}
                            colorScheme={'blue'}
                            >Order Now</Button>
                        }
                        </Flex>
                    </Box>
            )
            
        }
    </Grid>
        </>
  )
}

export default Home
