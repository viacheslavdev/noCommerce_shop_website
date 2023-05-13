import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import {listProductDetails} from '../actions/productAction'

function ProductScreen() {
    const [qty, setQty] = useState(1)

    const dispatch = useDispatch()

    const match = useParams()

    const navigate = useNavigate() // explain

    const productDetails = useSelector(state => state.productDetails)

    const {loading, error, product} = productDetails
 
    React.useEffect(() => {
        dispatch(listProductDetails(match.id))
    }, [dispatch, match])

    const addToCardHandler = () => {
        navigate(`/cart/${match.id}?qty=${qty}`)
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go back</Link>
            { loading ? 
                <Loader/> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (<Row>
                        <Col md={6}>
                            <Image src={product.image} alt={product.name} fluid/>
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{product.name}</h3>
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    <Rating value={product.rating} text={` ${product.numReviews} reviews`} color='#FFDD33'/>
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    Price: ${product.price}
                                </ListGroup.Item>
        
                                <ListGroup.Item>
                                    Description: {product.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>  
                                {/* flush removes a border */}
                                <ListGroup variant='flush'> 
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price :</Col>
                                            <Col>
                                                <strong>${product.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
        
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Status:</Col>
                                            <Col>
                                                {product.countInStock > 0 ? 'In stock' : 'Out of stock'}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    {product.countInStock > 0 && (
                                        <ListGroup.Item>
                                            <Row>
                                                <Col>Qty</Col>
                                                <Col className=''>
                                                    <Form.Control
                                                        as='select' 
                                                        value={qty}
                                                        // The target property of the event object refers to the DOM element 
                                                        // that triggered the event, and the value property is the current value of that element.
                                                        onChange={(e) => setQty(e.target.value)}
                                                    >
                                                        {
                                                            [...Array(product.countInStock).keys()].map((x) => 
                                                                <option key={x+1} value={x+1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        }

                                                    </Form.Control>
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    )}

                                    <ListGroup.Item>
                                        <Button 
                                            className='btn-block px-5 ' 
                                            disabled={product.countInStock <= 0} 
                                            type='button'
                                            onClick={addToCardHandler}>
                                            Add to card
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>)

            }
        </div>
  )
}

// flush - without border left and right
export default ProductScreen