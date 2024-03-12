'use client'
import React, { useState } from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import { useForm, SubmitHandler } from 'react-hook-form'

interface IUser {
	userEmail: string
	userPassword: string
	confirmedPassword: string
}

const Authform = () => {
	const [selected, setSelected] = React.useState<string | number>('login')
	const [passwordMatch, setPasswordMatch] = useState<boolean>(true)
	const {
		register: login,
		handleSubmit: handleLoginSubmit,
		formState: { errors: loginErrors },
	} = useForm<IUser>()

	const {
		register: register,
		handleSubmit: handleRegisterSubmit,
		formState: { errors: registerErrors },
	} = useForm<IUser>()

	const onRegister: SubmitHandler<IUser> = data => {
		// if (data.userPassword !== data.confirmedPassword) {
		// 	setPasswordMatch(false)
		// 	return
		// }
		console.log(data)

		// Tutaj wykonaj inne operacje po prawidłowej walidacji
	}
	const onLogin = (data: IUser) => {
		console.log(data)

		// Tutaj wykonaj inne operacje po prawidłowej walidacji
	}
	console.log(loginErrors)
	// console.log(registerErrors)
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
											{...login('userEmail', {
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
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{loginErrors.userEmail?.message}</p>
										<Input
											{...login('userPassword', {
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
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'> {loginErrors.userPassword?.message}</p>
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
									<form onSubmit={handleRegisterSubmit(onRegister)} className='flex flex-col gap-2 '>
										<Input
											{...register('userEmail', {
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
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{registerErrors.userEmail?.message}</p>
										<Input
											{...register('userPassword', {
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
										<p className='h-5 ml-4 -mt-1 text-red-800 text-xs'>{registerErrors.userPassword?.message}</p>
										<Input
											{...register('confirmedPassword', {
												required: 'This field is required',
												validate: (value: string) => {
													if (value.length < 6) {
														return 'Minimum 6 characters'
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
											<Button type='submit' fullWidth className='text-black font-bold bg-[#b41c26]'>
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
