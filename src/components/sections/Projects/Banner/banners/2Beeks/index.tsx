import React, { FC, MutableRefObject, SVGProps, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SplitText from 'gsap/SplitText'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@awesome.me/kit-ddd907bdb7/icons/classic/regular'

import ProjectCard from '../../ProjectBanner'
import { Swarm } from './AnimatedBee'
import HexBackground from './HexBackground'
import HexButton from './HexButton'
import ToolTip from './ToolTip'
import PictureFrame from './PictureFrame'
import Container from '@/utils/components/Container'
import { cn } from '@/utils/react'

import styles from './TwoBeeks.module.scss'
import { NoSsr } from '@/utils/next'

gsap.registerPlugin(useGSAP, ScrollTrigger, SplitText)

interface TwoBeeksBannerProps {}

function SVGBeeksLogo(props: SVGProps<SVGSVGElement>) {
	const { className, ...rest } = props

	return (
		<svg
			xmlns='http://www.w3.org/2000/svg'
			id='_2Beeks'
			data-name='2Beeks'
			viewBox='0 0 286.91 112.3'
			className={cn(styles.logo, className)}
			{...rest}>
			<path d='M275.34 39.24v-2.21h8.96v22.14h-8.96v-5.33c0-5.94-1.21-8.96-4.93-8.96-3.22 0-4.33 2.72-4.33 5.43 0 3.92 1.41 8.35 6.14 14.19l4.13 5.13c5.74 7.04 10.57 14.99 10.57 24.86s-5.53 17.81-13.08 17.81c-3.02 0-5.64-1.11-7.95-3.52v2.31h-8.96V85.63h8.96v7.35c0 7.15 1.41 10.26 5.53 10.26 3.12 0 5.23-2.82 5.23-7.25 0-4.73-2.11-10.47-5.84-15.09l-5.03-6.34c-8.25-10.47-9.56-14.89-9.56-22.14 0-9.66 4.73-16.6 11.67-16.6 3.22 0 5.03 1.11 7.45 3.42ZM229.35 37.03v8.96h-4.23v56.15h4.23v8.96h-19.93v-8.96h5.23V45.99h-5.23v-8.96h19.93Zm21.03 0v8.96h-4.73l-9.66 24.96 11.37 31.2h4.83v8.96h-20.23v-8.96h4.73l-10.67-29.28L236.28 46h-4.53v-8.96h18.62ZM201.98 0v32.45h-13.43V13.43h-13.89v33.66h11.32v13.43h-11.32v37.13h13.89V76.97h13.43v34.11h-51.17V97.65h8.15V13.43h-8.15V0h51.17ZM142.2 0v32.45h-13.43V13.43h-13.89v33.66h11.32v13.43h-11.32v37.13h13.89V76.97h13.43v34.11H91.03V97.65h8.15V13.43h-8.15V0h51.17ZM51.94 0C69.3 0 80.92 10.57 80.92 28.68c0 12.98-6.19 22.34-16.91 23.4v.3c12.08 2.26 19.47 12.83 19.47 27.47 0 19.92-12.38 31.24-31.7 31.24H26.57V97.66h8.45V13.43h-8.45V0h25.36Zm-1.21 46.34h1.06c10.11 0 13.28-4.83 13.28-16.15 0-12.23-3.02-16.75-13.74-16.75h-.6v32.9Zm0 51.32c10.42 0 16.45-4.38 16.45-18.57 0-4.08.15-19.32-13.89-19.32h-2.57v37.89ZM21.67 14.08c0 6.13-2.12 11.45-4.81 14.66l-4.45 5.25c-3.65 4.3-5.84 9.85-6.05 14.3h9.12v-9.78h6.2v16.34H0v-4.6c.07-6.2 2.04-12.47 6.78-18.6l3.43-4.45c3.65-4.67 4.23-7.44 4.23-13.42 0-5.33-1.31-7.66-3.94-7.66S6.34 8.6 6.34 13.2c0 .95.15 1.97.44 5.11H.51C.15 16.63 0 15.25 0 13.42 0 4.96 3.87.29 10.65.29s11.02 4.96 11.02 13.79Z' />
		</svg>
	)
}

const TwoBeeksBanner: FC<TwoBeeksBannerProps> = ({}) => {
	const [showToolTip, setShowToolTip] = useState(false)

	const picLargeRef = useRef<HTMLDivElement | null>(null)
	const picSmall1Ref = useRef<HTMLDivElement | null>(null)
	const picSmall2Ref = useRef<HTMLDivElement | null>(null)

	const line1a = '2Beeks is a family-owned and operated'

	const line1b = 'local to southern NJ.'
	const line2 = `The owners (and my best friends), Michael and Andy, have been beekeeping for years and have grown to have many beehives.`
	const line3 =
		"Now they're looking to expand their reach and asked me to help with their website redesign."
	const line4 =
		"I'm designing everything from scratch using Figma. All of the code is being built to integrate with their Square store and a CMS for easy content management."
	const line5 =
		"This is a project I'm currently working on so be sure to visit it and bookmark it for later!"
	const line6 = 'Especially if you like homemade, locally-sourced honey!'

	const images: {
		url: string
		alt: string
		className: string
		ref: MutableRefObject<HTMLDivElement | null>
	}[] = [
		{
			url: 'https://upload.wikimedia.org/wikipedia/commons/8/84/Apiary_in_Bashkortostan%2C_Russia.jpg',
			alt: 'apiary',
			className: styles.picLarge,
			ref: picLargeRef,
		},
		{
			url: 'https://upload.wikimedia.org/wikipedia/commons/1/11/The_Lone_Pollinator.jpg',
			alt: 'bee',
			className: styles.picSmall1,
			ref: picSmall1Ref,
		},
		{
			url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/Bee_Collecting_Pollen_2004-08-14.jpg',
			alt: 'bee pollen',
			className: styles.picSmall2,
			ref: picSmall2Ref,
		},
	]

	useGSAP(() => {
		const logoTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.TwoBeeksContainer',
				start: 'top center-=50px',
				end: '+=100px',
				fastScrollEnd: true,
				toggleActions: 'play none none reverse',
			},
		})
		logoTl.to(`.${styles.logo}`, {
			autoAlpha: 1,
			y: 0,
			ease: 'elastic',
			duration: 0.5,
		})

		const picTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.TwoBeeksContainer',
				start: 'top center-=50px',
				end: '+=100px',
				fastScrollEnd: true,
				toggleActions: 'play none none reverse',
				onEnter: () => {
					picTl.timeScale(1).reversed(false)
				},
				onLeaveBack: () => {
					picTl.timeScale(5).reversed(true)
				},
			},
		})
		// Large Pic Animation
		picTl.to(`.${styles.picLarge}`, {
			autoAlpha: 1,
		})

		// Small Pic 1 Animation
		picTl.to(`.${styles.picSmall1}`, {
			autoAlpha: 1,
			delay: 2,
		})

		// Small Pic 2 Animation
		picTl.to(`.${styles.picSmall2}`, { autoAlpha: 1, delay: 2.5 })

		// Button Animation
		picTl.to(`.${styles.button}`, { autoAlpha: 1, delay: 2 })

		// Line 1 Animation
		const textTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.TwoBeeksContainer',
				start: 'top center+=100px',
				end: '+=400px',
				fastScrollEnd: true,
				toggleActions: 'play none none reverse',
				onEnter: () => {
					textTl.timeScale(1).reversed(false)
				},
				onLeaveBack: () => {
					textTl.timeScale(7).reversed(true)
				},
			},
		})

		textTl.to(`.${styles.line1}`, { autoAlpha: 1, scaleX: 1 })
		SplitText.create(`.${styles.line1}`, {
			type: 'words',
			onSplit: ({ words }) => {
				for (let i = 0; i < words.length; i++) {
					textTl.to(
						words[i],
						{
							color: '#000',
						},
						i * 0.075
					)
				}
			},
		})
		textTl.to(
			`.${styles.apiaryText}`,
			{ borderBottom: '1px solid #000' },
			'>-.5'
		)
		textTl.to(`.${styles.apiaryText} svg`, { color: '#000' }, '>-.5')

		// Line 2 Animation
		textTl.to(`.${styles.line2}`, { autoAlpha: 1, scaleY: 1 })
		SplitText.create(`.${styles.line2}`, {
			type: 'words',
			onSplit: ({ words }) => {
				textTl.to(
					words,
					{
						color: '#000',
						stagger: 0.1,
					},
					'<'
				)
			},
		})

		// Line 3 Animation
		textTl.to(`.${styles.line3}`, { autoAlpha: 1, scaleY: 1, delay: 0.9 })
		SplitText.create(`.${styles.line3}`, {
			type: 'words',
			onSplit: ({ words }) => {
				textTl.to(
					words,
					{
						color: '#000',
						stagger: 0.1,
					},
					'<'
				)
			},
		})
		// Line 4 Animation
		textTl.to(`.${styles.line4}`, { autoAlpha: 1, scaleY: 1, delay: 0.8 })
		SplitText.create(`.${styles.line4}`, {
			type: 'words',
			onSplit: ({ words }) => {
				textTl.to(
					words,
					{
						color: '#000',
						stagger: 0.1,
					},
					'<'
				)
			},
		})
		// Line 5 & 6 Animation
		textTl.to(`.${styles.line5}`, { autoAlpha: 1, scaleX: 1, delay: 1.5 })
		SplitText.create(`.${styles.line5}`, {
			type: 'words',
			onSplit: ({ words }) => {
				textTl.to(
					words,
					{
						color: '#000',
						stagger: 0.1,
					},
					'<'
				)
			},
		})
		textTl.to(`.${styles.line6}`, {
			autoAlpha: 1,
			color: '#000',
			translateY: 0,
			delay: 1.1,
		})
		textTl.to(`.${styles.line5}`, { borderBottomRightRadius: 0 }, '<')
		SplitText.create(`.${styles.line6}`, {
			type: 'words',
			onSplit: ({ words }) => {
				textTl.to(words, { color: '#000', y: 0, stagger: 0.1 }, '<')
			},
		})
	}, [])

	return (
		<ProjectCard
			className={cn('TwoBeeksContainer', styles.background)}
			projectName='2Beeks'
			techs={{ frontend: [], backend: [], devops: [] }}>
			<Container>
				<SVGBeeksLogo className={styles.logo} />

				{images.map((image, i) => {
					return (
						<PictureFrame
							className={cn(styles.pic, image.className)}
							key={`beeks-image-${i}`}
							src={image.url}
							alt={image.alt}
						/>
					)
				})}
				<ToolTip show={showToolTip} />
				<p className={cn(styles.line, styles.line1)}>
					{line1a}
					<span
						className={styles.apiaryText}
						onMouseEnter={() => setShowToolTip(true)}
						onMouseLeave={() => setShowToolTip(false)}>
						<FontAwesomeIcon
							icon={faMagnifyingGlass}
							className={styles.magnifier}
						/>
						apiary
					</span>
					{line1b}
				</p>
				<p className={cn(styles.line, styles.line2)}>{line2}</p>
				<p className={cn(styles.line, styles.line3)}>{line3}</p>
				<div className={styles.group4}>
					<p className={cn(styles.line, styles.line4)}>{line4}</p>
					<div className={styles.rightCol}>
						<div className={styles.group5}>
							<p className={cn(styles.line, styles.line5)}>
								{line5}
							</p>
							<p className={cn(styles.line, styles.line6)}>
								{line6}
							</p>
						</div>
					</div>
				</div>
				<div className={styles.buttons}>
					{/* <HexButton
							variant='dark'
							className={cn(styles.button, styles.figma)}
							href=''
							target='_blank'>
							Figma Design
						</HexButton> */}
					<HexButton
						variant='dark'
						className={cn(styles.button, styles.website)}
						href='https://2beeks.com/'
						target='_blank'>
						Website
					</HexButton>
				</div>
			</Container>

			<NoSsr>
				<Swarm count={2} className={styles.swarm} />
			</NoSsr>
			<HexBackground />
		</ProjectCard>
	)
}

export default TwoBeeksBanner
