type IProps = {
	genres: string[]
}

type GenreCardProps = {
	genre: string
}

const GenreCard = ({ genre }: GenreCardProps) => {
	return <div className="genre-card">{genre}</div>
}

const GenreList = ({ genres }: IProps) => {
	return (
		<div className="genre-list">
			{genres.map((genre) => (
				<GenreCard key={genre} genre={genre} />
			))}
		</div>
	)
}
export default GenreList
