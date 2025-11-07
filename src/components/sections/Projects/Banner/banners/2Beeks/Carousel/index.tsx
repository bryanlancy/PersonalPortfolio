import PictureFrame from '../PictureFrame'

import styles from './Carousel.module.scss'

const Carousel = () => {
	const images: { url: string; alt: string }[] = [
		{
			url: '/assets/2beeks/apiary.jpg',
			alt: 'apiary',
		},
		{
			url: '/assets/2beeks/bees.jpg',
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
				/>
			))}
		</div>
	)
}

export default Carousel
