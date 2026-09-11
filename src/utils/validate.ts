import { z } from 'zod'

// Form fields arrive as strings; the regex keeps the submit button disabled
// until every field holds a real value (mirrors the old Joi behaviour).
export const activitySchema = z.object({
	name: z.string().min(1),
	max: z.string().regex(/^\d+$/),
	intervalsPerSession: z.string().regex(/^\d+$/),
	sessionsPerWeek: z.string().regex(/^\d+$/)
})

export type ActivityForm = z.infer<typeof activitySchema>

// What localStorage holds: parsed JSON, so startDate is an ISO string there.
const storedActivitySchema = z.object({
	name: z.string(),
	startDate: z.coerce.date(),
	max: z.number(),
	intervalsPerSession: z.number(),
	sessionsPerWeek: z.number()
})

export const trackerSchema = z.object({
	activities: z.array(storedActivitySchema)
})
