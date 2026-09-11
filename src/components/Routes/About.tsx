import type { FC } from 'react'
import { useEffect } from 'react'
import { Actions } from '~/actions'
import { useAppDispatch, useAppSelector } from '../../configureStore'

const About: FC = () => {
	const version = useAppSelector(s => s.version)
	const dispatch = useAppDispatch()

	useEffect(() => {
		dispatch(
			Actions.fetchVersion(
				'https://raw.githubusercontent.com/hyldmo/typescript-react-starter-kit/master/package.json'
			)
		)
	}, [dispatch])

	return (
		<>
			<h1 className="font-bold text-2xl">About {import.meta.env.VITE_APP_NAME}</h1>
			<h2 className="mt-2 text-lg">Version: {version}</h2>
		</>
	)
}

export default About
