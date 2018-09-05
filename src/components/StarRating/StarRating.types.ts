export interface StarRatingProps {
	/**
	 * Current amount of stars
	 */
	stars: number
	/**
	 * Total amount stars
	 */
	totalStars: number


	/**
	 * Input fields name
	 */
	name: string
	readonly?: boolean

	/**
	 * Triggered whenever a star is clicked
	 * @param i Index of which star was clicked + 1
	 * @param name Name of input field
	 */
	onClick: (i: number, name: string) => void
}
