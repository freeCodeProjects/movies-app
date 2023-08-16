import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

import './../../styles/circle-progress.css'

type IProps = {
	rating: number
}

const CircleRating = ({ rating }: IProps) => {
	return (
		<div className="circleRating">
			<CircularProgressbar
				value={rating}
				maxValue={10}
				text={rating.toString()}
				styles={buildStyles({
					pathColor: rating < 5 ? 'red' : rating < 7 ? 'orange' : 'green'
				})}
			/>
		</div>
	)
}

export default CircleRating
