'use client'
import React from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useRouter } from 'next/navigation'

interface AuthformProps {
	type: string | number
}

const Authformbackup: React.FC<AuthformProps> = ({ type }) => {
	const [selected, setSelected] = React.useState<string | number>(type)
	const pathname = usePathname()
	const router = useRouter()

	return (
		<div className="bg-[url('/assets/background.jpg')] h-screen w-full bg-cover bg-center ">
			<div className='h-screen w-full bg-gradient-to-t from-black'>
				<div className='flex flex-col w-full h-screen px-2 items-center justify-center'>
					<Card
						className='max-w-full w-[340px] h-[460px] border-black border-3 shadow-xl
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
								<Tab key='login' title='Login' href='/login'>
									<form className='flex flex-col gap-4'>
										<Input
											className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Email'
											placeholder='Enter your email'
											type='email'
										/>
										<Input
											className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Password'
											placeholder='Enter your password'
											type='password'
										/>
										<p className='text-center text-small text-white'>
											Need to create an account?{' '}
											<Link
												href='/signup'
												className='text-[#c7000d] font-semibold cursor-pointer'
												size='sm'
												onPress={() => {
													setSelected('sign-up')
													router.push('/signup')
												}}>
												Sign up
											</Link>
										</p>

										<Link className='flex gap-2 justify-end'>
											<Button fullWidth className='text-black font-bold bg-[#b41c26]'>
												Login
											</Button>
										</Link>
									</form>
								</Tab>

								<Tab key='sign-up' title='Sign up' href='/signup'>
									<form className='flex flex-col gap-4 h-[300px]'>
										<Input
											className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Email'
											placeholder='Enter your email'
											type='email'
										/>
										<Input
											className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Name'
											placeholder='Enter your name'
											type='password'
										/>
										<Input
											className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Password'
											placeholder='Enter your password'
											type='password'
										/>
										<p className='text-center text-small text-white'>
											Already have an account?{' '}
											<Link
												href='/login'
												className='text-[#c7000d] font-semibold cursor-pointer'
												size='sm'
												onPress={() => {
													setSelected('login')
													router.push('/login')
												}}>
												Login
											</Link>
										</p>

										<Link className='flex gap-2 justify-end'>
											<Button fullWidth className='text-black font-bold bg-[#b41c26]'>
												Sign Up
											</Button>
										</Link>
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

export default Authformbackup
