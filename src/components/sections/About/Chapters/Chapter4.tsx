/*
	Animation timeline

	Animation:
    Woozy emoji face starts rolling across the screen
    !"In 2015, while trying..."
    A basic "ground" appears to add to movement animation
    House comes into view and emoji goes inside and sleeps (animated z's floating above?)
    !"waking up early..."
    Rotate sun and moon overhead, indicating sleeping for days
    On final night cycle, house rotates with scene, revealing new scene and text
    !"I bought an Arduino..."
    Curious emoji with small circuit and light
    Hook1 text starts fading in and light icon flickers on, face turns to happy
    Hook2 text appears, face and hook1 fade out, followed shortly by hook2

	Transition:
    Light icon remains on screen, and scales down (zoom out effect)
    Zoom out of computer screen from earlier animation to emoji face sitting at computer
*/

const Chapter4 = () => {
	const title = 'The Arduino Moment'
	const text = `In 2015, while trying to solve my own problem — waking up \
                early — I bought an Arduino kit to build a sunrise alarm clock \
                with LEDs.`
	const hook1 = 'The first time I saw an LED respond to my code'
	const hook2 = 'I was hooked.'
	return (
		<div>
			<h1>{title}</h1>
			<p>{text}</p>
		</div>
	)
}

export default Chapter4
