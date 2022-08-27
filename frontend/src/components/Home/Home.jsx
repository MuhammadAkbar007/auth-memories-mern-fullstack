import Posts from "../Posts/Posts"
import Form from '../Form/Form'

import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'

import { getPosts } from '../../actions/postsActions'

const Home = () => {
  
    const dispatch = useDispatch()

    const [currentId, setCurrentId] = useState(null)

    useEffect(() => {
        dispatch(getPosts())
    }, [currentId, dispatch])

    return (
        <div>
            <div className="row mobile">
                <div className="col-md-8 col-sm-12">
                    <Posts setCurrentId={setCurrentId} />
                </div>
                <div className="col-md-4 col-sm-12">
                    <Form currentId={currentId} setCurrentId={setCurrentId} />
                </div>
            </div>
        </div>
    )
}

export default Home