import React, { useState } from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import { GoogleLogin } from 'react-google-login'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import useStyles from './styles'
import Input from './Input'
import Icon from './Icon'
import { signin, signup } from '../../actions/auth'
//
const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' }

const Auth = () => {
	const classes = useStyles()
	const [showPassword, setShowPassword] = useState(false)
	const [isSignUp, setIsSignUp] = useState(false)
	const [formData, setFormData] = useState(initialState)
	const dispatch = useDispatch()
	const navigate = useNavigate('')

	const handleSubmit = (e) => {
		e.preventDefault()
		if (isSignUp) {
			dispatch(signup(formData, navigate))
		} else {
			dispatch(signin(formData, navigate))
		}
	}

	const handleChange = (e) => {
		//setting input field to form data
		setFormData({ ...formData, [e.target.name]: e.target.value })
	}

	const handleShowPassword = () => {
		return setShowPassword((prevShowPassword) => !prevShowPassword)
	}
	const switchMode = () => {
		setIsSignUp((prevIsSignUp) => !prevIsSignUp)
		setShowPassword(false)
	}

	const googleSuccess = async (res) => {
		const result = res?.profileObj //?.  is called optional chaining operator. It wont throw error if the 'res' object don't have profileObj
		const token = res?.tokenId
		try {
			dispatch({ type: 'AUTH', data: { result, token } })
			navigate('/')
		} catch (error) {
			console.log(error)
		}
	}
	const googleFailure = (error) => {
		console.log('Google Sign In was unsuccessful. Try again later')
		console.log(error)
	}

	return (
		<Container component='main' maxWidth='xs'>
			<Paper className={classes.paper} elevation={3}>
				<Avatar className={classes.avatar}>
					<LockOutlinedIcon />
				</Avatar>
				<Typography variant='h5'>{isSignUp ? 'Sign Up' : 'Sign In'}</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<Grid container spacing={2}>
						{isSignUp && (
							<>
								<Input
									name='firstName'
									label='First Name'
									handleChange={handleChange}
									autoFocus
									half
								/>
								<Input
									name='lastName'
									label='Last Name'
									handleChange={handleChange}
									half
								/>
							</>
						)}
						<Input
							name='email'
							label='Email Address'
							handleChange={handleChange}
							type='email'
						/>
						<Input
							name='password'
							label='Password'
							handleChange={handleChange}
							type={showPassword ? 'text' : 'password'}
							handleShowPassword={handleShowPassword}
						/>
						{isSignUp && (
							<Input
								name='confirmPassword'
								label='Repeat Password'
								handleChange={handleChange}
								type='password'
							/>
						)}
					</Grid>
					<Button
						variant='contained'
						color='primary'
						fullWidth
						type='submit'
						className={classes.submit}
					>
						{isSignUp ? 'Sign Up' : 'Sign In'}
					</Button>
					<GoogleLogin
						clientId='52367903271-d4htu2v1hf11u4ov4lmpgoeblreaift9.apps.googleusercontent.com'
						render={(renderProps) => (
							<Button
								variant='contained'
								color='primary'
								className={classes.googleButton}
								fullWidth
								onClick={renderProps.onClick}
								disabled={renderProps.disabled}
								startIcon={<Icon />}
							>
								Google Sign In
							</Button>
						)}
						onSuccess={googleSuccess}
						onFailure={googleFailure}
						cookiePolicy='single_host_origin'
					/>
					<Grid container justifyContent='flex-end'>
						<Button onClick={switchMode}>
							{isSignUp
								? 'Already have an account ? Sign In'
								: "Don't have an account? Sign up."}
						</Button>
					</Grid>
				</form>
			</Paper>
		</Container>
	)
}

export default Auth
