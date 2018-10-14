/**
 * Converts strings from snake case to camel case
 */
export const snakeToCamel = (str: string) =>
	str
	.split('-')
	.map(name => name.charAt(0).toUpperCase() + name.slice(1))
	.join(' ')