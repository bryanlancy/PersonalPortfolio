import { FC } from 'react'

import PictureFrame from '../PictureFrame'

import styles from './Carousel.module.scss'

const Carousel = () => {
	const images: { url: string; alt: string }[] = [
		{
			url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Apiary_in_Bashkortostan%2C_Russia.jpg',
			alt: 'apiary',
		},
		{
			url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/The_Lone_Pollinator.jpg',
			alt: 'bee',
		},
	]

	return (
		<div className={styles.container}>
			{images.map((image, i) => (
				<PictureFrame
					key={`bee-carousel-image-${i}`}
					src={image.url}
					alt={image.alt}
					width={200}
					height={200}
				/>
			))}
		</div>
	)
}

export default Carousel
