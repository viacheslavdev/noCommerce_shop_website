import React, { useEffect } from 'react'
import { useDispatch, useSelector} from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Form, Button, Card } from 'react-bootstrap'
import Message from '../components/Message'
import { addToCard, removeFromCart } from '../actions/cartActions'
import { useParams, useLocation } from 'react-router-dom'
import Loader from '../components/Loader'


function CartScreen({}) {

    const match = Number(useParams().id)

    const location = useLocation().search // explain

    const cart = useSelector(state => state.cart)

    const {cartItems} = cart

    const navigate = useNavigate()

    const qty = location ? Number(location.split('=')[1]) : 1

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(addToCard(match, qty))
    }, [dispatch, match, qty])

    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id))
    }

    const checkoutHandler = () => {
        navigate('/shipping')
    }


    return (
    <Row>
        <Col md={8}>
            <h1>Shopping Cart</h1>
            {cartItems.length === 0 ? (
                <Message variant='info'>
                    Your cart is empty <Link to='/'>Go back</Link>
                </Message>
            ): (
                <ListGroup variant='flush'>
                    {cartItems.map(item => (
                        <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                    <Image src={item.image} fluid rounded/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                                <Col md={2}>
                                    ${item.price}
                                </Col>
                                <Col md={3}>
                                    <Form.Control
                                        as='select' 
                                        value={item.qty}
                                        onChange={(e) => dispatch(addToCard(item.product, Number(e.target.value)))}
                                    >
                                        {
                                            [...Array(item.countInStock).keys()].map((x) => (
                                                <option  key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>
                                            ))
                                        }
                                    </Form.Control>
                                </Col>

                                <Col md={1}>
                                <Button 
                                    type='button'
                                    variant='light'
                                    onClick={() => removeFromCartHandler(item.product)}>
                                    <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            )}
        </Col>  
        <Col md={4}>
            <Card>
                <ListGroup variant='flush'>
                    <ListGroup.Item>
                        <h2>Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}) items</h2>
                        {/* toFixed - max decimal places. toFixed(2) = 0.00 */}
                        {cartItems.reduce((acc, item) => acc + item.qty*item.price, 0).toFixed(2)}
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button
                            type='button'
                            className='btn-block'
                            disabled={cartItems.length === 0}
                            onClick={checkoutHandler}>
                                Proceed To Checkout
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
        </Col>                       
    </Row>
  )
}

export default CartScreen