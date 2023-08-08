export const getMonthName = (monthNum: number) => {
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

export const carouselResponsiveInfo = {
	xxl: {
		breakpoint: { max: 3000, min: 1440 },
		items: 5,
		slidesToSlide: 5
	},
	xl: {
		breakpoint: { max: 1440, min: 1024 },
		items: 5,
		slidesToSlide: 5
	},
	l: {
		breakpoint: { max: 1024, min: 830 },
		items: 4,
		slidesToSlide: 4
	},
	m: {
		breakpoint: { max: 830, min: 630 },
		items: 3,
		slidesToSlide: 3
	},
	s: {
		breakpoint: { max: 630, min: 420 },
		items: 2,
		slidesToSlide: 2
	},
	xs: {
		breakpoint: { max: 420, min: 0 },
		items: 1,
		slidesToSlide: 1
	}
}
