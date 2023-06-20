import React, {useState} from 'react'
import { Button, Form} from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router'


function SearchBox() {
    const [keyword, setKeyWord] = useState('')

    const navigate = useNavigate()
    const location = useLocation()

    const submitHandler = (e) => {
        e.preventDefault()

        if(keyword) {
            navigate(`/?keyword=${keyword}&page=1`)
        } else {
            navigate(location)
        }
    }
    return (
        <Form onSubmit={submitHandler} inline='true'>     
            <Form.Control
                type='text'
                name='q'
                onChange={(e) => setKeyWord(e.target.value)}
                className='mr-sm-5 mb-1 ml-sm-4'
            ></Form.Control>
            <Button
                type='submit'
                variant='outline-success'
                className='p-2'
            >
                Submit
            </Button>
        </Form>
    )
}

export default SearchBox