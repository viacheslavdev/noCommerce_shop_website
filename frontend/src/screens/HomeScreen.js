import React  from 'react'
import { Row, Col } from 'react-bootstrap'
import Product from '../components/Product'
import Loader from '../components/Loader'
import Message from '../components/Message'
import Paginate from '../components/Paginate'
import { useDispatch, useSelector} from 'react-redux'
import {listProducts} from '../actions/productAction'
import { useLocation } from 'react-router'
import ProductCarousel from '../components/ProductCarousel'

function HomeScreen() {
    const dispatch = useDispatch()
    
    // state.productList(name of reducer).loading or product - full selector from the redux store
    // useSelector - subscribes to redux store and then we can select components (state => state.*name of reducer*)

    const productList = useSelector(state => state.productList) 
    
    const {error, loading, product, page, pages} = productList

    let keyword = useLocation().search

    React.useEffect(() => {
        dispatch(listProducts(keyword))
    },[dispatch, keyword])

    return (
    <div>
        <ProductCarousel/>
        <h1>Latest products</h1>
        {loading ? <Loader/>
            : error ? <Message variant='danger'>{error}</Message>
            : <div>
            <Row>
            {product && product.map(product => (
                <Col key={product._id} sm={12} md={6} lg={4} xl={3}> 
                    <Product product={product} />
                </Col>
            ))}
            <Paginate page={page} pages={pages} keyword={keyword}/>
            </Row>
        </div>
        } 
            
    </div>
  )
}

export default HomeScreen