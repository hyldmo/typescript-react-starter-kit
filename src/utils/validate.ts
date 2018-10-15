export const Joi: joi = require('joi-browser')
import { AnySchema, Root as joi } from 'joi' // No typings for joi-browser so have to use @types/joi's
import { Activity, Omit } from 'types'

type Schema<T> = {
	[K in keyof T]: AnySchema
}

export const activitySchema: Schema<Omit<Activity, 'startDate'>> = {
	name: Joi.string().required(),
	max: Joi.number().required(),
	intervalsPerSession: Joi.number().required(),
	sessionsPerWeek: Joi.number().required()
}
