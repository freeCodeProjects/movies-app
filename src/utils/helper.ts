const getMonthName = (monthNum: number) => {
	let month = ''
	switch (monthNum) {
		case 1:
			month = 'Jan'
			break
		case 2:
			month = 'Feb'
			break
		case 3:
			month = 'Mar'
			break
		case 4:
			month = 'Apr'
			break
		case 5:
			month = 'May'
			break
		case 6:
			month = 'Jun'
			break
		case 7:
			month = 'Jul'
			break
		case 8:
			month = 'Aug'
			break
		case 9:
			month = 'Sep'
			break
		case 10:
			month = 'Oct'
			break
		case 11:
			month = 'Nov'
			break
		case 12:
			month = 'Dec'
			break
		default:
			break
	}
	return month
}

export const getFormattedDate = (value: string) => {
	if (!value) {
		return 'Invalide Date'
	}
	const dateObj = new Date(value)
	const date = dateObj.getDate()
	const month = getMonthName(dateObj.getMonth() + 1)
	const year = dateObj.getFullYear()
	return `${date} ${month} ${year}`
}

export const getFormattedRuntime = (runtime: number) => {
	let formattedRuntime = ''
	let hours = 0
	let minutes = 0
	hours = Math.floor(runtime / 60)
	minutes = runtime % 60
	if (hours) {
		formattedRuntime += `${hours}hr`
	}
	if (minutes) {
		formattedRuntime += ` ${minutes}min`
	}

	return formattedRuntime.trim()
}

const movieGenreById: { [key: number]: string } = {
	28: 'Action',
	12: 'Adventure',
	16: 'Animation',
	35: 'Comedy',
	80: 'Crime',
	99: 'Documentary',
	18: 'Drama',
	10751: 'Family',
	14: 'Fantasy',
	36: 'History',
	27: 'Horror',
	10402: 'Music',
	9648: 'Mystery',
	10749: 'Romance',
	878: 'Science Fiction',
	10770: 'TV Movie',
	53: 'Thriller',
	10752: 'War',
	37: 'Western'
}

export const getGenreById = (id: number) => {
	return movieGenreById[id]
}

export const carouselResponsiveInfo = {
	xxl: {
		breakpoint: { max: 3000, min: 1440 },
		items: 5,
		slidesToSlide: 5
	},
	xl: {
		breakpoint: { max: 1440, min: 1200 },
		items: 5,
		slidesToSlide: 5
	},
	l: {
		breakpoint: { max: 1200, min: 978 },
		items: 4,
		slidesToSlide: 4
	},
	m: {
		breakpoint: { max: 978, min: 726 },
		items: 3,
		slidesToSlide: 3
	},
	s: {
		breakpoint: { max: 726, min: 484 },
		items: 2,
		slidesToSlide: 2
	},
	xs: {
		breakpoint: { max: 484, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
}
