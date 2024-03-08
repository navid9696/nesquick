'use client'
import React, { Component } from 'react'
import ScrollContainer from 'react-indiana-drag-scroll'
import MovieCard from './MovieCard'
import { IGenres, IMovie } from '../../lib/types'

interface Props {
	title: string
	movies: IMovie[]
	genres: IGenres[]
	type: string
}

interface State {
	isScrolled: boolean
}

class MovieRow extends Component<Props, State> {
	constructor(props: Props) {
		super(props)
		this.state = {
			isScrolled: false,
		}
	}

	onScroll = () => {
		if (!this.state.isScrolled) {
			this.setState({ isScrolled: true })
		}
	}

	onEndScroll = () => {
		if (this.state.isScrolled) {
			this.setState({ isScrolled: false })
		}
	}

	render() {
		const { title, movies, genres, type } = this.props

		return (
			<div className='mx-2 sm:mx-10 mb-10 text-slate-50 '>
				<h2 className='pl-10 text-2xl sm:text-3xl font-bold'>{title}</h2>
				<div className='relative '>
					<div className='absolute z-40 inset-y-0 left-0 w-4 bg-gradient-to-l from-transparent to-black'></div>
					<ScrollContainer
						onEndScroll={this.onEndScroll}
						onStartScroll={this.onScroll}
						className={`${
							this.state.isScrolled ? 'cursor-grabbing' : 'cursor-grab'
						}   px-10 scroll-container relative`}>
						<div className='flex  gap-3 sm:gap-5'>
							{movies.map(movie => (
								<MovieCard type={type} key={movie.id} movie={movie} genres={genres} />
							))}
						</div>
					</ScrollContainer>
					<div className='absolute z-40 inset-y-0 right-0 w-4 bg-gradient-to-r from-transparent to-black'></div>
				</div>
			</div>
		)
	}
}

export default MovieRow
