export interface MovieListResponse {
	dates: Dates
	page: number
	results: MovieListItem[]
	total_pages: number
	total_results: number
}

export interface Dates {
	maximum: string
	minimum: string
}

export interface MovieListItem {
	adult: boolean
	backdrop_path: string
	genre_ids: number[]
	id: number
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	release_date: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface QueryCache {
	[key: string]: {
		response: object
		expireAt: number
	}
}

export interface InfiniteQueryCache {
	[key: string]: {
		response: object[]
		expireAt: number
	}
}

export interface MovieResult {
	adult: boolean
	backdrop_path: string
	belongs_to_collection: null
	budget: number
	genres: Genre[]
	homepage: string
	id: number
	imdb_id: string
	original_language: string
	original_title: string
	overview: string
	popularity: number
	poster_path: string
	production_companies: ProductionCompany[]
	production_countries: ProductionCountry[]
	release_date: string
	revenue: number
	runtime: number
	spoken_languages: SpokenLanguage[]
	status: string
	tagline: string
	title: string
	video: boolean
	vote_average: number
	vote_count: number
}

export interface Genre {
	id: number
	name: string
}

export interface ProductionCompany {
	id: number
	logo_path: null | string
	name: string
	origin_country: string
}

export interface ProductionCountry {
	iso_3166_1: string
	name: string
}

export interface SpokenLanguage {
	english_name: string
	iso_639_1: string
	name: string
}

export interface VideoResult {
	id: number
	results: Result[]
}

export interface Result {
	iso_639_1: string
	iso_3166_1: string
	name: string
	key: string
	published_at: string
	site: string
	size: number
	type: string
	official: boolean
	id: string
}

export interface CreditResult {
	id: number
	cast: Cast[]
	crew: Cast[]
}

export interface Cast {
	adult: boolean
	gender: number
	id: number
	known_for_department: Department
	name: string
	original_name: string
	popularity: number
	profile_path: null | string
	cast_id?: number
	character?: string
	credit_id: string
	order?: number
	department?: Department
	job?: string
}

export enum Department {
	Acting = 'Acting',
	Art = 'Art',
	Camera = 'Camera',
	CostumeMakeUp = 'Costume & Make-Up',
	Crew = 'Crew',
	Directing = 'Directing',
	Editing = 'Editing',
	Lighting = 'Lighting',
	Production = 'Production',
	Sound = 'Sound',
	VisualEffects = 'Visual Effects',
	Writing = 'Writing'
}

export interface FavouriteMovie {
	id: number
	title: string
	poster_path: string
}

export interface FavouriteMovieStore {
	movieIds: { [key: number]: true }
	movies: FavouriteMovie[]
}
