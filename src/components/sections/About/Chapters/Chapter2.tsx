/*
	Animation timeline

	Animation:
    Computer hardware icons scale up to match zoom in effect of transition
    Emoji face from first chapter appears, looking around hardware icons
    Bug emoji appears and runs off screen, emoji face follows (with hammer?)
    !"I started using spreadsheets..."
    Bug chaser scene leaves the screen and enlarged spreadsheet appears
    Mouse icon manually clicking on each cell, typing animation adds data (typo for funsies)
    !"fascinated by how much..."
    Spreadsheet drag

	Transition:
    !"I automated nighlty math tasks..."
    Spreadsheet slides up revealing more empty rows, remains on screen during next chapter
    !"and later..."
    Under the bottom of the spreadsheet the conveyor belt used in next chapter is revealed


*/

const Chapter2 = () => {
	const title = 'Early Tech Work'
	const text = `I began with building PCs and doing basic repairs. In 2011, I started \
                using spreadsheets at my first job and was fascinated by \
                how much you could do with formulas. I automated nightly math tasks and later`
	return (
		<div>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Chapter2
