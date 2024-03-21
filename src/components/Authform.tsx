'use client'
import React from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'
import { signIn } from 'next-auth/react'

interface IUser {
	email: string
	password: string
	confirmedPassword: string
}

const Authform = () => {
	const [selected, setSelected] = React.useState<string | number>('login')

	const router = useRouter()

	const {
		register: login,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginErrors },
	} = useForm<IUser>()

	const {
		register: register,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerErrors },
		getValues,
	} = useForm<IUser>()

	const onRegister: SubmitHandler<IUser> = async data => {
		let res = await fetch('/api/auth/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (res.ok) {
			toast.success('Registered successfully')
			setTimeout(() => {
				setSelected('login')
			}, 2000)
		} else if (res.status === 400) {
			toast.error('Email already exists')
		} else {
			toast.error('Something went wrong')
		}
	}

	const onLogin: SubmitHandler<IUser> = async data => {
		let res = await signIn('credentials', {
			...data,
			redirect: false,
		})

		if (res && res.ok) {
			toast.success('Login successfully')
			setTimeout(() => {
				router.push('/')
			}, 2000)
		} else {
			console.log(res?.error)
			toast.error('Email or password is incorrect')
		}
		console.log(res?.status)
	}

	return (
		<div className="bg-[url('/assets/background.jpg')] h-screen w-full bg-cover bg-center ">
			<div className='h-screen w-full bg-gradient-to-t from-black'>
				<div className='flex flex-col w-full h-screen px-2 items-center justify-center'>
					<Card
						className='max-w-full w-[340px] h-[500px] border-black border-3 shadow-xl
					bg-black/50
					backdrop-blur-xl
					backdrop-saturate-200
					hover:bg-black/25
					!cursor-text'>
						<CardBody className='overflow-hidden'>
							<CardHeader className='justify-center'>
								<Image
									src={'/assets/logo.png'}
									alt='logo'
									width='0'
									height='0'
									sizes='100vw'
									className='w-fit max-h-16  '
								/>
							</CardHeader>

							<Tabs
								variant='bordered'
								fullWidth
								size='md'
								aria-label='Tabs form'
								selectedKey={selected}
								onSelectionChange={setSelected}>
								<Tab key='login' title='Login'>
									<form className='flex flex-col gap-2'>
										<Input
											{...login('email', {
												required: 'This field is required',
												validate: (value: string) => {
													if (
														!value.match(
															/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}$/
														)
													) {
														return 'Invalid email format'
													}
												},
											})}
											className='text-zinc-200'
											variant='bordered'
											label='Email'
											placeholder='Enter your email'
											type='email'
										/>
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{loginErrors.email?.message}</p>
										<Input
											{...login('password', {
												required: 'This field is required',
												validate: (value: string) => {
													if (value.length < 6) {
														return 'Minimum characters is 6'
													}
												},
											})}
											className='text-zinc-200'
											variant='bordered'
											label='Password'
											placeholder='Enter your password'
											type='password'
										/>
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'> {loginErrors.password?.message}</p>
										<p className='text-center text-small text-white'>
											Need to create an account?{' '}
											<Link
												className='text-[#c7000d] font-semibold cursor-pointer'
												size='sm'
												onPress={() => setSelected('sign-up')}>
												Sign up
											</Link>
										</p>
										<div className='flex gap-2 justify-end'>
											<Button
												onClick={handleLoginSubmit(onLogin)}
												type='submit'
												fullWidth
												className='text-black font-bold bg-[#b41c26]'>
												Login
											</Button>
										</div>
									</form>
								</Tab>

								<Tab key='sign-up' title='Sign up'>
									<form className='flex flex-col gap-2 '>
										<Input
											{...register('email', {
												required: 'This field is required',
												validate: (value: string) => {
													if (
														!value ||
														!value.match(
															/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,4}))$/gim
														)
													) {
														return 'Invalid email format'
													}
												},
											})}
											className='text-zinc-200'
											variant='bordered'
											label='Email'
											placeholder='Enter your email'
											type='email'
										/>
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{registerErrors.email?.message}</p>
										<Input
											{...register('password', {
												required: 'This field is required',
												validate: (value: string) => {
													if (value.length < 6) {
														return 'Minimum 6 characters'
													}
												},
											})}
											className='text-zinc-200'
											variant='bordered'
											label='Password'
											placeholder='Create password'
											type='password'
										/>
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{registerErrors.password?.message}</p>
										<Input
											{...register('confirmedPassword', {
												required: 'This field is required',
												validate: (value: string) => {
													if (value.length < 6) {
														return 'Minimum 6 characters'
													} else if (getValues('password') != value) {
														return 'Your passwords do not match'
													}
												},
											})}
											className='text-zinc-200'
											variant='bordered'
											label='Repeat password'
											placeholder='Confirm your password'
											type='password'
										/>

										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{registerErrors.confirmedPassword?.message}</p>
										<p className='text-center text-small text-white'>
											Already have an account?{' '}
											<Link
												className='text-[#c7000d] font-semibold cursor-pointer'
												size='sm'
												onPress={() => setSelected('login')}>
												Login
											</Link>
										</p>
										<div className='flex gap-2 justify-end'>
											<Button
												onClick={handleRegisterSubmit(onRegister)}
												type='submit'
												fullWidth
												className='text-black font-bold bg-[#b41c26]'>
												Sign up
											</Button>
										</div>
									</form>
								</Tab>
							</Tabs>
						</CardBody>
					</Card>
				</div>
			</div>
		</div>
	)
}

export default Authform
