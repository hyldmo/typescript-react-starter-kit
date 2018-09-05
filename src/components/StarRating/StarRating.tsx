import cn from 'classnames'
import React from 'react'
import { StarRatingProps } from './StarRating.types'

import css from './StarRating.scss'

const StarRating: React.StatelessComponent<StarRatingProps> = ({ name, stars, totalStars, readonly, onClick }) => (
	<>
		{[...Array(totalStars)].map((_, i) => (
			<label key={i} className={cn(css.star, { readonly })}>
				<input
					type="radio"
					name={name}
					aria-label={`${i + 1} star`}
					onClick={() => !readonly && onClick(i + 1, name)}
					value={i + 1}
				/>
				<svg viewBox="0 0 51 48" className={cn({ [css.filled]: stars > i, [css.readonly]: readonly })}>
					<path d="m25,1 6,17h18l-14,11 5,17-15-10-15,10 5-17-14-11h18z"/>
				</svg>
			</label>)
		)}
	</>
)

export default StarRating
