import React, { FC } from 'react'

type ChapterProps = {
	text: string
	shortText: string
	step: number
}

// TODO Make chapters expandable for anyone interested, short short versions by default
// TODO Handle line breaks in text

const Chapter: FC<ChapterProps> = ({ text, shortText, step }) => {
	return (
		<>
			<p>{text}</p>
		</>
	)
}

export default Chapter
