import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { Container, Grow, Grid } from '@material-ui/core'
import useStyles from './styles'
import { getPosts } from '../../actions/posts'
import Posts from '../Posts/Posts'
import Form from '../Form/Form'

const Home = () => {
	const classes = useStyles()
	const dispatch = useDispatch()
	const [currentId, setCurrentId] = useState(null)
	useEffect(() => {
		dispatch(getPosts())
	}, [dispatch, currentId])

	return (
		<Grow in>
			<Container>
				<Grid
					className={classes.mainContainer}
					container
					justifyContent='space-between'
					alignItems='stretch'
				>
					<Grid item xs={12} sm={7}>
						<Posts setCurrentId={setCurrentId} />
					</Grid>
					<Grid item xs={12} sm={4}>
						<Form setCurrentId={setCurrentId} currentId={currentId} />
					</Grid>
				</Grid>
			</Container>
		</Grow>
	)
}

export default Home
