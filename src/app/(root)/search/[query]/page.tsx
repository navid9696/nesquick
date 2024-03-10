import ArrowUp from '@components/ArrowUp'
import Footer from '@components/Footer'
import Navbar from '@components/Navbar'
import SearchResults from '@components/SearchResults'

const Search = ({ params }: { params: { query: string } }) => {
	const query = params.query
	return (
		<>
			<Navbar />
			<main>
				<SearchResults query={query} />
				<ArrowUp />
			</main>
			<Footer />
		</>
	)
}

export default Search
