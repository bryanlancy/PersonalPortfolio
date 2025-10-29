/**
 * Configuration constants for the mouse trail animation
 */
export const MAX_LENGTH = 375 // max total path length in px
export const POINT_INTERVAL = 10 // minimum distance between points
export const RETURN_SPEED = 10 // return home animation speed (pixels per millisecond)
export const MIN_FRAME_INTERVAL = 16 // minimum time between frames (60fps = ~16ms)
export const MAX_FRAME_INTERVAL = 100 // maximum time between frames to prevent stuttering

/**
 * Default home position for the trail to return to when mouse leaves
 */
export const DEFAULT_HOME_POSITION: [number, number] = [500, 800]

export const DEFAULT_RETURN_POINTS: [number, number][] = [
	[DEFAULT_HOME_POSITION[0] - MAX_LENGTH, DEFAULT_HOME_POSITION[1]],
	[...DEFAULT_HOME_POSITION],
]
