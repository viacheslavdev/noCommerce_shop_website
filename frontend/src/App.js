import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import {Container} from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import CartScreen from './screens/CartScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import ShippingScreen from './screens/ShippingScreen'


export default function App() {
  return (
    <Router>
      <Header />
      <main className="py-3">
        <Container>
          <Routes>
            <Route path="/" element={<HomeScreen/>}/>
            <Route path='/login' element={<LoginScreen/>} />
            <Route path='/register' element={<RegisterScreen/>} />
            <Route path='/profile' element={<ProfileScreen/>} />
            <Route path='/shipping' element={<ShippingScreen/>} />
            <Route path="/product/:id" element={<ProductScreen/>} />
            // :id? - ? - make the id an option
            // id - also we can use with useParams()
            <Route path='/cart/:id?' element={<CartScreen/>} />
          </Routes>
        </Container>
      </main>
      <Footer />
    </Router>
  )
}
