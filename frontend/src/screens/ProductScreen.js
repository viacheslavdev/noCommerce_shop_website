import React, { useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form} from 'react-bootstrap'
import Rating from '../components/Rating'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { listProductDetails, createProductReview } from '../actions/productAction'
import { PRODUCT_CREATE_REVIEW_RESET } from '../constants/productConstants'

function ProductScreen() {
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')
    
    const dispatch = useDispatch()
    
    const match = useParams().id
    
    const navigate = useNavigate() 
    
    const productDetails = useSelector(state => state.productDetails)
    const {loading, error, product} = productDetails
    

    const userLogin = useSelector(state => state.userLogin)
    const {userInfo} = userLogin

    const productReviewCreate = useSelector(state => state.productReviewCreate)
    const {
        loading: loadingProductReview, 
        error: errorProductReview, 
        success:successProductReview
    } = productReviewCreate
 
    React.useEffect(() => { 
        if(successProductReview) {
            setRating(0)
            setComment('')
            dispatch({type: PRODUCT_CREATE_REVIEW_RESET})
        }

        dispatch(listProductDetails(match))
    }, [dispatch, match, successProductReview])

    const addToCardHandler = () => {
        navigate(`/cart/${match}?qty=${qty}`)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(createProductReview(match, {rating, comment}))
    }

    return (
        <div>
            <Link to='/' className='btn btn-light my-3'>Go back</Link>
            { loading ? 
                <Loader/> 
                : error 
                    ? <Message variant='danger'>{error}</Message>
                    : (
                    <div>
                        <Row>
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
                        </Row>
                        <Row>
                            <Col md={6}>
                                <h4>Reviews</h4>
                                {product.reviews && product.reviews.length === 0 && <Message variant='info'>No reviews</Message>}
                                <ListGroup variant='flush'>
                                    {product.reviews && product.reviews.map((review) => (
                                        <ListGroup.Item key={review._id}>
                                            <strong>{review.name}</strong>
                                            <Rating value={review.rating} color='#f8e825'/>
                                            <p>{review.createdAt.substring(0,10)}</p>
                                            <p>{review.comment}</p>
                                        </ListGroup.Item>
                                    ))}
                                    <ListGroup.Item>
                                        <h4>Write a review</h4>


                                        {loadingProductReview && <Loader/>}
                                        {successProductReview && <Message variant='success'>Review Submitted</Message>}
                                        {errorProductReview && <Message variant='danger'>{errorProductReview}</Message>}

                                        {userInfo ? (
                                            <Form onSubmit={submitHandler}>
                                                <Form.Group controlId='rating'>
                                                    <Form.Label>Rating</Form.Label>
                                                    <Form.Control
                                                        as='select'
                                                        value={rating}
                                                        onChange={(e) => setRating(e.target.value)}
                                                    >
                                                        <option value=''>Select...</option>
                                                        <option value='1'>1 - Poor</option>
                                                        <option value='2'>2 - Fair</option>
                                                        <option value='3'>3 - Good</option>
                                                        <option value='4'>4 - Very good</option>
                                                        <option value='5'>5 - Perfect</option>
                                                    </Form.Control>
                                                </Form.Group>

                                                <Form.Group controlId='comment'>
                                                    <Form.Label>Review</Form.Label>
                                                    <Form.Control
                                                        as='textarea'
                                                        row={5}
                                                        value={comment}
                                                        onChange={(e) => setComment(e.target.value)}
                                                    ></Form.Control>
                                                </Form.Group>

                                                <Button
                                                    disabled={loadingProductReview}
                                                    type='submit'
                                                    variant='primary'
                                                    inline="true"
                                                >Submit</Button>
                                            </Form>
                                        ) : (
                                            <Message variant='info'>Please <Link to='/login'>login</Link></Message>
                                        )}
                                    </ListGroup.Item>
                                </ListGroup>
                            </Col>
                        </Row>
                    </div>   
                        )
            }
        </div>
  )
}


export default ProductScreen