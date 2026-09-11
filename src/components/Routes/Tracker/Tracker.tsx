import { type ChangeEvent, Component } from 'react'
import { connect } from 'react-redux'
import { Actions } from '~/actions'
import Button, { ButtonBar } from '~/components/Button'
import type { Activity, State } from '~/types'
import { type ActivityForm, activitySchema, cn, range } from '~/utils'
import MultiSessionSchedule from './MultiSessionSchedule'
import SingleSessionSchedule from './SingleSessionSchedule'

interface TrackerProps extends TrackerStateProps, TrackerDispatchProps {}

interface TrackerStateProps {
	activities: Activity[]
}

interface TrackerDispatchProps {
	addActivity: typeof Actions.addActivity
}

interface TrackerComponentState {
	form: ActivityForm
	currentActivity: Activity['name'] | null
}

const initialForm: ActivityForm = {
	name: '',
	max: '',
	intervalsPerSession: '',
	sessionsPerWeek: ''
}

const textFields = ['name', 'max', 'intervalsPerSession', 'sessionsPerWeek'] as const
type TextField = (typeof textFields)[number]

const fieldLabels: Record<TextField, { label: string; placeholder: string; type: string }> = {
	name: { label: 'The name of the activity', placeholder: 'Name', type: 'text' },
	max: {
		label: 'Your current record (e.g 50 if you can do max 50 situps in a row)',
		placeholder: 'Record',
		type: 'number'
	},
	intervalsPerSession: {
		label: 'The amount of intervals you want to do per exercise session',
		placeholder: 'Intervals',
		type: 'number'
	},
	sessionsPerWeek: { label: 'Amount of sessions per week', placeholder: 'Sessions', type: 'number' }
}

class Tracker extends Component<TrackerProps, TrackerComponentState> {
	state: TrackerComponentState = {
		form: initialForm,
		currentActivity: null
	}

	addActivity = () => {
		const { name, max, intervalsPerSession, sessionsPerWeek } = this.state.form
		this.props.addActivity({
			name,
			startDate: new Date(),
			max: Number.parseInt(max, 10),
			intervalsPerSession: Number.parseInt(intervalsPerSession, 10),
			sessionsPerWeek: Number.parseInt(sessionsPerWeek, 10)
		})
		this.setState({ form: initialForm })
	}

	onInputChange = (name: TextField) => (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value
		this.setState(prev => ({ form: { ...prev.form, [name]: value } }))
	}

	render() {
		const { form } = this.state
		const { activities } = this.props

		const currentActivity = activities.find(a => a.name === this.state.currentActivity) ?? activities[0]
		const weeks = range(1, 8)
		const valid = activitySchema.safeParse(form).success
		return (
			<div className={cn({ 'opacity-60': activities.length === 0 })}>
				<h1 className="font-bold text-2xl">Exercise Tracker</h1>
				<fieldset className="mt-4 flex flex-col gap-3 border border-neutral-300 p-4">
					<legend className="px-1">Add activity</legend>
					{textFields.map(field => (
						<label key={field} className="flex flex-col gap-1 text-sm">
							{fieldLabels[field].label}
							<input
								name={field}
								type={fieldLabels[field].type}
								value={form[field]}
								onChange={this.onInputChange(field)}
								placeholder={fieldLabels[field].placeholder}
								className="rounded border border-neutral-300 px-2 py-1"
							/>
						</label>
					))}
					<Button onClick={this.addActivity} disabled={!valid}>
						Add
					</Button>
				</fieldset>
				{activities.length > 1 && (
					<>
						<h2 className="mt-6 font-bold text-xl">Activity</h2>
						<ButtonBar>
							{currentActivity &&
								activities.map(activity => (
									<Button
										key={activity.name}
										active={activity.name === currentActivity.name}
										onClick={() => this.setState({ currentActivity: activity.name })}
									>
										{activity.name}
									</Button>
								))}
						</ButtonBar>
					</>
				)}

				{currentActivity && (
					<>
						<h2 className="mt-6 font-bold text-xl">Schedule</h2>
						{currentActivity.sessionsPerWeek > 1 ? (
							<MultiSessionSchedule activity={currentActivity} weeks={weeks} />
						) : (
							<SingleSessionSchedule activity={currentActivity} weeks={weeks} />
						)}
					</>
				)}
			</div>
		)
	}
}

const mapStateToProps = (state: State): TrackerStateProps => ({
	...state.tracker
})

const dispatchToProps: TrackerDispatchProps = {
	addActivity: Actions.addActivity
}

export default connect(mapStateToProps, dispatchToProps)(Tracker)
