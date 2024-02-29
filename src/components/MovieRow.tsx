'use client'
import React, { Component } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import MovieCard from './MovieCard'
import { IMovie } from '../../lib/types'

interface Props {
	title: string
	movies: IMovie[]
}

class MovieRow extends Component<Props> {
	render() {
		const { title, movies } = this.props
		return (
			<div className='ml-20 mr-20 mb-20 text-slate-50 '>
				<h2 className='text-2xl'>{title}</h2>
				<div className='relative'>
					<div className='absolute z-50 inset-y-0 left-0 w-4 bg-gradient-to-l from-transparent to-black'></div>
					<ScrollContainer
						draggingClassName='cursor-grabbing'
						className='pl-1 hover:cursor-grab scroll-container relative'>
						<div className='flex gap-5'>
							{movies.map(movie => (
								<MovieCard key={movie.id} movie={movie} />
							))}
						</div>
					</ScrollContainer>
					<div className='absolute  z-50 inset-y-0 right-0 w-4 bg-gradient-to-r from-transparent to-black'></div>
				</div>
			</div>
		)
	}
}

export default MovieRow
