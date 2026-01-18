
/** string indicating a DATE formatted YYYY-MM-DD */
export type DateString = string

/** string indicating a TIME formatted HH:MM */
export type TimeString = string

/** number indicating a time according to Date.getTime() convention */
export type DateNumber = number

/** UNIX timestamp */
export type TimestampString = string

/** UNIX timestamp */
export type Timestamp = number


/** Hexadecimal color like #FFFFFF */
export type Color = `#${string}`

/** a string representing a uuid */
export type Uuid = string

export type Dimension = {
	width?: number,
	height?: number
}

