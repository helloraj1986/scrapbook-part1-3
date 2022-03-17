import React from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { Container } from '@material-ui/core'

import Navbar from './components/Navbar/Navbar'
import Home from './components/Home/Home'
import Auth from './components/Auth/Auth'
import PostDetails from './components/PostDetails/PostDetails'
const App = () => {
	const user = JSON.parse(localStorage.getItem('profile'))
	return (
		<BrowserRouter>
			<Container maxWidth='xl'>
				<Navbar />
				<Switch>
					{/* <Route exact path='/' element={<Home />} /> */}
					<Route exact path='/' component={() => <Redirect to='/posts' />} />
					<Route path='/posts' exact component={Home} />
					<Route path='/posts/search' exact component={Home} />
					<Route path='/posts/:id' component={PostDetails} />
					<Route
						path='/auth'
						component={() => (!user ? <Auth /> : <Redirect to='/posts' />)}
					/>
				</Switch>
			</Container>
		</BrowserRouter>
	)
}

export default App
