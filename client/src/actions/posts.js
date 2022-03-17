import * as api from '../api'
import {
	FETCH_ALL,
	CREATE,
	UPDATE,
	DELETE,
	LIKE,
	GET_BY_SEARCH,
	START_LOADING,
	END_LOADING,
	FETCH_POST,
} from '../constants/actionTypes'

//action creators
export const getPost = (id) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.fetchPost(id)
		const action = { type: FETCH_POST, payload: { post: data } }
		dispatch(action)
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const getPosts = (page) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const {
			data: { data, currentPage, numberOfPages },
		} = await api.fetchPosts(page)
		const action = { type: FETCH_ALL, payload: { data, currentPage, numberOfPages } }
		dispatch(action)
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const getPostBySearch = (searchQuery) => async (dispatch) => {
	try {
		dispatch({ type: START_LOADING })
		const { data } = await api.getPostBySearch(searchQuery)
		//console.log('search data', data)
		dispatch({ type: GET_BY_SEARCH, payload: data })
		dispatch({ type: END_LOADING })
	} catch (error) {
		console.log(error)
	}
}

export const createPost = (newPost, history) => async (dispatch) => {
	try {
		const { data } = await api.createPost(newPost)
		const action = { type: CREATE, payload: data }
		history.push(`/posts/${data._id}`)
		dispatch(action)
	} catch (error) {
		console.log(error)
	}
}

export const updatePost = (id, post) => async (dispatch) => {
	try {
		dispatch({ type: END_LOADING })
		const { data } = await api.updatePost(id, post)
		const action = { type: UPDATE, payload: data }
		dispatch(action)
	} catch (error) {
		console.log(error)
	}
}

export const deletePost = (id) => async (dispatch) => {
	try {
		await api.deletePost(id)
		const action = { type: DELETE, payload: id }
		dispatch(action)
	} catch (error) {
		console.log(error)
	}
}

export const likePost = (id) => async (dispatch) => {
	try {
		const { data } = await api.likePost(id)
		const action = { type: LIKE, payload: data }
		dispatch(action)
	} catch (error) {
		console.log(error)
	}
}
