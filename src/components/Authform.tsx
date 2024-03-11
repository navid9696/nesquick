'use client'
import React from 'react'
import { Tabs, Tab, Input, Link, Button, Card, CardBody, CardHeader } from '@nextui-org/react'
import Image from 'next/image'

const Authform = () => {
	const [selected, setSelected] = React.useState<string | number>('login')
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
								<Tab key='login' title='Login'>
									<form className='flex flex-col gap-4'>
										<Input className='text-zinc-200' variant='bordered' isRequired label='Email' placeholder='Enter your email' type='email' />
										<Input className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Password'
											placeholder='Enter your password'
											type='password'
										/>
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
											<Button fullWidth className='text-black font-bold bg-[#b41c26]'>
												Login
											</Button>
										</div>
									</form>
								</Tab>

								<Tab key='sign-up' title='Sign up'>
									<form className='flex flex-col gap-4 h-[300px]'>
										<Input className='text-zinc-200' variant='bordered' isRequired label='Email' placeholder='Enter your email' type='email' />
										<Input className='text-zinc-200' variant='bordered' isRequired label='Name' placeholder='Enter your name' type='password' />
										<Input className='text-zinc-200'
											variant='bordered'
											isRequired
											label='Password'
											placeholder='Enter your password'
											type='password'
										/>
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
											<Button fullWidth className='text-black font-bold bg-[#b41c26]'>
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
