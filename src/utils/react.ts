type classInput =
	/** Class name to add. */
	| string
	/** Add the class name provided in index 1 only when index 0 is equal to true */
	| [boolean | undefined, string]
	/** Add the class name provided in index 1 only when index 0 is equal to true, \
	 * use the class at index 2 if false.
	 */
	| [boolean | undefined, string, string]
	| undefined

/**
 *
 * @param classes Any classes needed to be added to a component. Useful when using css modules.
 * Input can be any combination of a string or array.
 *
 * If an array is provided index 0 should be a boolean used to determine which class to apply.
 * True = index 1, False = index 2 (if provided))
 * @returns `string`
 */
export const cn: (...input: classInput[]) => string = (...classes) => {
	// If only one argument is passed, log a warning as this function is not needed (dev environment only)
	if (classes.length === 1 && process.env.NODE_ENV === 'development') {
		console.warn(
			`'cn' function used with only one class: ${classes[0]}.\n%cThis is an unneeded function call!\n`,
			'color:#ff0'
		)
	}
	let classString: string = ''
	// Loop through classes and add to classes
	for (let i = 0; i < classes.length; i++) {
		const classValue = classes[i]

		// Skip if given an undefined value
		if (!classValue) continue

		// if type is array, check boolean value
		if (typeof classValue !== 'string') {
			// If true, add class at index 1
			if (classValue[0]) classString += ' ' + classValue[1]
			// If false, add class at index 2 (if provided)
			else if (classValue[2]) classString += ' ' + classValue[2]
		} else classString += ' ' + classValue
	}

	return classString.trimStart()
}
