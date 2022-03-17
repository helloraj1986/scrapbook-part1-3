import React from 'react'
import {
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Button,
	Typography,
	ButtonBase,
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import useStyles from './styles'
import moment from 'moment'
//
import { useDispatch } from 'react-redux'
import { deletePost, likePost } from '../../../actions/posts'
//
import { useHistory } from 'react-router-dom'

//TO CAPTALIZE
import startcase from 'lodash.startcase'
const capitalizeWord = (value) => startcase(value.toLowerCase())
//
const Post = ({ post, setCurrentId }) => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const history = useHistory()
	//get username from the local storage
	const user = JSON.parse(localStorage.getItem('profile'))

	//Likes start
	const Likes = () => {
		if (post.likes.length > 0) {
			return post.likes.find(
				(like) => like === (user?.result?.googleId || user?.result?._id),
			) ? (
				<>
					<ThumbUpAltIcon fontSize='small' />
					&nbsp;
					{post.likes.length > 2
						? `You and ${post.likes.length - 1} others`
						: `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}`}
				</>
			) : (
				<>
					<ThumbUpAltOutlined fontSize='small' />
					&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
				</>
			)
		}
		return (
			<>
				<ThumbUpAltOutlined fontSize='small' />
				&nbsp;Like
			</>
		)
	}
	//Like end

	//Open Post
	const openPost = (e) => history.push(`/posts/${post._id}`)

	return (
		<Card className={classes.card} raised elevation={6}>
			<ButtonBase
				className={classes.cardAction}
				onClick={openPost}
				component='span'
				name='test'
			>
				<CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
				<div className={classes.overlay}>
					<Typography variant='h6'>{capitalizeWord(post.name)}</Typography>
					<Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
				</div>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<div className={classes.overlay2}>
						<Button
							style={{ color: 'white' }}
							size='small'
							onClick={(e) => {
								e.stopPropagation()
								setCurrentId(post._id)
							}}
						>
							<MoreHorizIcon fontSize='medium' />
						</Button>
					</div>
				)}

				<div className={classes.details}>
					<Typography variant='body2' color='textSecondary'>
						{post.tags.map((tag) => `#${tag} `)}
					</Typography>
				</div>
				<Typography
					className={classes.title}
					variant='h5'
					gutterBottom
					style={{ fontSize: '24px', fontWeight: '600' }}
				>
					{capitalizeWord(post.title)}
				</Typography>
				<CardContent>
					<Typography
						variant='body2'
						color='textSecondary'
						component='p'
						style={{ fontSize: '10px' }}
					>
						{post.message.slice(0, 100)}....
					</Typography>
				</CardContent>
			</ButtonBase>
			<CardActions className={classes.cardActions}>
				<Button
					color='primary'
					size='small'
					disabled={!user?.result}
					onClick={() => dispatch(likePost(post._id))}
				>
					<Likes />
				</Button>
				{(user?.result?.googleId === post?.creator ||
					user?.result?._id === post?.creator) && (
					<Button
						size='small'
						onClick={() => {
							dispatch(deletePost(post._id))
						}}
					>
						<DeleteIcon fontSize='small' color='secondary' />
					</Button>
				)}
			</CardActions>
		</Card>
	)
}

export default Post
