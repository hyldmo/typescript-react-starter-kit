import React, { useState } from 'react'

import * as wineResponse from '../../../static/result.json'
import { ArrayElement } from 'types'

type Wines = typeof wineResponse['hits']
type Wine = ArrayElement<Wines>
type Vintage = ArrayElement<Wine['vintages']>

const headers = new Headers({
	'x-algolia-application-id': '9TAKGWJUXL',
	'x-algolia-api-key': '60c11b2f1068885161d95ca068d3a6ae'
})

async function search (query: string) {
	const params = {params:`query=${query}&hitsPerPage=6`}
	return fetch('https://9takgwjuxl-dsn.algolia.net/1/indexes/WINES_prod/query', {
		method: 'POST',
		headers,
		body: JSON.stringify(params)
	})
}

function calculateRatings (vintages: Vintage[]) {
	const stats = vintages
		.map(vintage => vintage.statistics)
		.reduce(
			(a, b) => ({
				count: a.count + b.ratings_count,
				score: a.score + b.ratings_average *  b.ratings_count
			}),
			{ count: 0, score: 0 }
		)
	return {
		count: stats.count,
		score: Math.round((stats.score / stats.count) * 10) / 10
	}
}

const Home: React.StatelessComponent = () => {
	const [wines, setWines] = useState<Wines>([])

	const getWines = async (query: string) => {
		const response = await search(query)
		if (response.ok) {
			const result = await response.json() as typeof wineResponse
			setWines(result.hits)
		}
	}

	return (
		<div>
			<h1>Hello world</h1>
			<input type="text" onChange={e => getWines(e.target.value)}/>
			<ul>
				{wines.map(wine => (
					<li key={wine.id}>
						<img src={wine.image.variations.bottle_small} height="50"/>
						<span>{wine.name}</span>
						<em> ({calculateRatings(wine.vintages).score} stars</em>
						<span> - </span>
						<em>{calculateRatings(wine.vintages).count} Reviews)</em>
					</li>
				))}
			</ul>
		</div>
	)
}

export default Home
