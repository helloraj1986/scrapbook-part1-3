import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

export const posts = (posts = [], action) => {
	switch (action.type) {
		case DELETE:
			return posts.filter((post) => post._id !== action.payload)
		case UPDATE:
		case LIKE:
			return posts.map((post) => (post._id === action.payload._id ? action.payload : post))
		case FETCH_ALL:
			return action.payload
		case CREATE:
			return [...posts, action.payload]
		default:
			return posts
	}
}

//here state = posts ..that is why we have mentioned posts in place of state
