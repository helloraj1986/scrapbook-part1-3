import React, { useEffect } from 'react'
import { Paper, Typography, CircularProgress, Divider, Button } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useParams, useHistory } from 'react-router-dom'
//
import useStyles from './styles'
//
import { getPost, getPostBySearch } from '../../actions/posts'
import ArrowBack from '@material-ui/icons/ArrowBack'

//TO CAPTALIZE
import startcase from 'lodash.startcase'
const capitalizeWord = (value) => startcase(value.toLowerCase())

const PostDetails = () => {
	const { post, posts, isLoading } = useSelector((state) => state.posts)
	const dispatch = useDispatch()
	const history = useHistory()
	const classes = useStyles()
	const { id } = useParams()

	useEffect(() => {
		dispatch(getPost(id))
	}, [id])

	//recommended post

	useEffect(() => {
		if (post) {
			dispatch(getPostBySearch({ search: 'none', tags: post?.tags.join(',') }))
		}
	}, [post])

	const backToPosts = () => {
		window.history.back()
	}

	if (!post) return null
	if (isLoading) {
		return (
			<Paper eleveation={6} className={classes.loadingPaper}>
				<CircularProgress size='7em' />
			</Paper>
		)
	}
	//remove the current post from the recommended post
	const recommendedPosts = posts.filter((p) => p._id !== post._id)
	const showRecommnedPosts = recommendedPosts.slice(0, 5)
	//
	const openPost = (id) => history.push(`/posts/${id}`)
	return (
		<Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
			<div className={classes.card}>
				<div className={classes.section}>
					<Typography
						variant='h3'
						component='h2'
						style={{ fontSize: '36px', fontWeight: '600' }}
					>
						{capitalizeWord(post.title)}
					</Typography>
					<Typography gutterBottom variant='h6' color='textSecondary' component='h2'>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
					<Typography gutterBottom variant='body1' component='p'>
						{post.message}
					</Typography>
					<Typography variant='h6'>Created by: {capitalizeWord(post.name)}</Typography>
					<Typography variant='body1'>{moment(post.createdAt).fromNow()}</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'>
						<strong>Realtime Chat - coming soon!</strong>
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Typography variant='body1'>
						<strong>Comments - coming soon!</strong>
					</Typography>
					<Divider style={{ margin: '20px 0' }} />
					<Button
						onClick={backToPosts}
						className={classes.back}
						color='primary'
						fontSize='small'
					>
						<ArrowBack />
						Go Back.
					</Button>
				</div>
				<div className={classes.imageSection}>
					<img
						className={classes.media}
						src={
							post.selectedFile ||
							'https://user-images.githubusercontent.com/194400/49531010-48dad180-f8b1-11e8-8d89-1e61320e1d82.png'
						}
						alt={post.title}
					/>
				</div>
			</div>
			{recommendedPosts.length !== 0 ? (
				<div className={classes.section}>
					<Typography variant='h5' color='initial'>
						You might also like:
					</Typography>
					<Divider />
					<div className={classes.recommendedPosts}>
						{showRecommnedPosts.map((r) => {
							return (
								<div
									key={r._id}
									style={{ margin: '20px', cursor: 'pointer' }}
									onClick={() => openPost(r._id)}
								>
									<Typography gutterBottom variant='h6' color='initial'>
										{capitalizeWord(r.title)}
									</Typography>
									<Typography gutterBottom variant='subtitle2' color='initial'>
										{capitalizeWord(r.name)}
									</Typography>
									<Typography gutterBottom variant='subtitle1' color='initial'>
										Likes: {r.likes.length}
									</Typography>
									<img
										src={r.selectedFile}
										width='200px'
										height='100px'
										style={{ objectFit: 'cover' }}
										alt={r.selectedFile}
									/>
								</div>
							)
						})}
					</div>
				</div>
			) : null}
		</Paper>
	)
}
export default PostDetails
