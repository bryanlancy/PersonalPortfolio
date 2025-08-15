/*
	Animation timeline

	Animation:
	!"I've always been drawn...."
    Happy emoji appears and tech icons move by with scroll (parallax effect?)
    Emoji face moves from icon to icon as they scroll by
    Computer icon is last icon, centers on screen when in appropriate spot
	!"until my grandfather..."
    Adult slides into view
    Question speech bubble pops up from adult
	!"sparked the..."
    Curiosity? question mark

	Transition:
    Blue skidoo we can too into computer and zoom in on screen, revealing the next chapter

*/

const Chapter1 = () => {
	const title = 'How it Started'
	const text = `I've always been drawn to technology, but I didn't realize \
                how little I understood it until my grandfather once asked how \
                computers work. That question sparked the curiosity that's shaped \
                my career ever since.`

	return (
		<div>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Chapter1
