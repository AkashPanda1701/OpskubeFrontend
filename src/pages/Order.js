import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Box, Button, Flex, Grid, Heading, Img, Text } from '@chakra-ui/react';
import { deleteOrder } from '../redux/order/action';
import { Link } from 'react-router-dom';


function Order() {
    const orderState = useSelector((state) => state.order);
    // console.log('orderState: ', orderState);
    const dispatch = useDispatch();
    const [books, setBooks] = useState([]);

    useEffect(() => {
        getBooks();
    }, []);

    

       async function getBooks() {
              const { data } = await axios.get(`http://localhost:3300/books?bookname=`);
            //   console.log('data: ', data);
            //   console.log('data: ', data);
              setBooks(data);
        }
        if(orderState.orders.length === 0){
            return <>
            <Heading m='20px auto' textAlign='center' color='teal'>Your Cart is Empty</Heading>
            <Img 
            rounded={'md'}
            objectFit={'cover'}
            m='20px auto'
            w={{
                base: '80%',
                md: '50%',
            }}
            src='https://media.istockphoto.com/id/1208705769/photo/empty-shopping-cart-on-opening-book.jpg?s=612x612&w=0&k=20&c=rVkoUniw579fPh1Y1TFrYuUwhbF-NgcWoSCR6UJRnoc='/>
            
            <Link to='/'>
            <Button
            display={'block'}
            m='20px auto'
            colorScheme='teal'
            >Start Exploring</Button>
            </Link>
            </>
        }

  return (
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
            orderState.orders.map((book,index) =>{
                // console.log('book: ', book);
                let exist = books.find((boo) => boo.bookname === book.bookname);
                if(exist){
                    return <Box
                    shadow={'md'}
                    rounded={'md'}
                    p='4'
                            key={index}
                            >
                                <Img rounded={'md'} objectFit={'cover'} w='full' h='350px' src={exist.image} />
                                
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
                                    <Box>

                                <Text mt={2} color={'gray'}>₹{exist.price}</Text>
                                <Text mt={2} color={'gray'}>BookDate- {new Date(book.bookdate).toDateString()}</Text>
                                    </Box>
        
                                <Button 
                                onClick={()=>{
                                    dispatch(deleteOrder(book.bookname,book.bookdate))
                                }}
                                colorScheme={'red'}
                                >Remove</Button>
                                </Flex>
                            </Box>
                }else{
                    return null;
                }
            }
            )

        }
    </Grid>
  )
}

export default Order
