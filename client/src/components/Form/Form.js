import React, { useState, useEffect } from 'react'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import FileBase from 'react-file-base64'
import { createPost, updatePost } from '../../actions/posts'
import useStyles from './styles'

const Form = ({ currentId, setCurrentId }) => {
	const [postData, setPostData] = useState({
		title: '',
		message: '',
		tags: '',
		selectedFile: '',
	})

	const post = useSelector((state) =>
		currentId ? state.posts.find((p) => p._id === currentId) : null,
	)

	const classes = useStyles()
	const dispatch = useDispatch()
	//
	//get username from the local storage
	const user = JSON.parse(localStorage.getItem('profile'))
	//populate the value of form when using useEffect
	useEffect(() => {
		if (post) setPostData(post)
	}, [post])

	const clear = () => {
		setCurrentId(null)
		setPostData({
			title: '',
			message: '',
			tags: '',
			selectedFile: null,
		})
	}
	const handleSubmit = async (e) => {
		e.preventDefault()
		console.log('current id', currentId)
		//
		if (currentId === null) {
			dispatch(createPost({ ...postData, name: user?.result?.name }))
			console.log('handlesubmit-createPost', { ...postData, name: user?.result?.name })
			clear()
		} else {
			dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
			clear()
		}
	}

	//if no user login
	if (!user?.result?.name) {
		return (
			<Paper className={classes.paper}>
				<Typography variant='h6' align='center'>
					Please sign in to craete your own posts and like other's posts
				</Typography>
			</Paper>
		)
	}

	return (
		<Paper className={classes.paper}>
			<form
				action=''
				autoComplete='off'
				noValidate
				className={`${classes.root} ${classes.form}`}
				onSubmit={handleSubmit}
			>
				<Typography variant='h6'>
					{currentId ? 'Editing a Memory' : 'Creating a Memory'}
				</Typography>

				<TextField
					name='title'
					variant='outlined'
					label='Title'
					fullWidth
					value={postData.title}
					onChange={(e) => setPostData({ ...postData, title: e.target.value })}
				/>
				<TextField
					name='message'
					variant='outlined'
					label='Message'
					fullWidth
					value={postData.message}
					onChange={(e) => setPostData({ ...postData, message: e.target.value })}
				/>
				<TextField
					name='tags'
					variant='outlined'
					label='Tags'
					fullWidth
					value={postData.tags}
					onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(',') })}
				/>
				<div className={classes.fileInput}>
					<FileBase
						type='file'
						multiple={false}
						onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
					/>
				</div>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='primary'
					size='large'
					type='submit'
					fullWidth
				>
					SUBMIT
				</Button>
				<Button
					className={classes.buttonSubmit}
					variant='contained'
					color='secondary'
					size='small'
					fullWidth
					onClick={clear}
				>
					CLEAR
				</Button>
			</form>
		</Paper>
	)
}

export default Form
