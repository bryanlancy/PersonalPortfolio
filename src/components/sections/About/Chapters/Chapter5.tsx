/*
	Animation timeline

	Animation:
    Lines draw out from the computer connecting different devices
    Each device has an on/off button on its display as well as current status of light
    !"It's accessibility..."
    Emoji airplane moving around to different places with scroll

	Transition:

*/

const Chapter5 = () => {
	const title = 'Turning to Web Development'
	const text = `Wanting to connect my Arduino projects and control them \
                remotely, I turned to web development. Its accessibility was \
                a big draw—no special tools, just a computer and an internet connection.`
	return (
		<div>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Chapter5
