import * as api from '../api'
import * as action from '../constants/actionTypes'

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.fetchPosts()
        dispatch({ type: action.FETCH_ALL, payload: data })
    } catch (err) {
        console.log(err)
    }
}

export const createPost = newPost => async (dispatch) => {
    try {
        const { data } = await api.createPost(newPost)
        dispatch({ type: action.CREATE, payload: data })
    } catch (err) {
        console.log(err)
    }
}

export const updatePost = (id, post) => async (dispatch) => {
    try {
        const { data } = await api.updatePost(id, post)
        dispatch({ type: action.UPDATE, payload: data })
    } catch (err) {
        console.log(err)
    }
}

export const deletePost = id => async (dispatch) => {
    try {
        await api.deletePost(id)
        dispatch({ type: action.DELETE, payload: id })
    } catch (err) {
        console.log(err)
    }
}

export const likePost = id => async (dispatch) => {
    try {
        const { data } = await api.likePost(id)
        dispatch({ type: action.LIKE, payload: data })
    } catch (err) {
        console.log(err)
    }
}