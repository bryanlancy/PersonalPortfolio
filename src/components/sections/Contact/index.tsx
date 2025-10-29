'use client'

import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { contactList } from '../../../app/data'
import { Contact as ContactMethod } from '@/app/data/contact-list'
import ContactCard from './ContactCard'

import styles from './Contact.module.scss'

gsap.registerPlugin(useGSAP, ScrollTrigger)

const Contact = () => {
	const contactArray: ContactMethod[] = Object.values(contactList)

	useGSAP(() => {
		const contactCardTl = gsap.timeline({
			scrollTrigger: {
				trigger: `.${styles.section}`,
				start: 'top center-=100px',
				end: '+=400px',
				toggleActions: 'play none resume reverse',
			},
		})
		contactCardTl.to(`.${styles.contactCard}`, {
			autoAlpha: 1,
			transform: 'translateY(0)',
			duration: 0.5,
			stagger: 0.25,
		})
	})

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Get in Touch</h1>
			<div className={styles.text}>
				<p>
					Interested in talking about new opportunities? Want to leave
					a compliment or critique? Maybe just say hello?
				</p>
				<p>
					Don't hesitate to reach out to me if you want to talk more!
				</p>
			</div>
			<div className={styles.contactList}>
				{contactArray.map((contactMethod, i) => {
					const copy = contactMethod.name === 'Email' ? true : false // Add method to easily copy email address
					return (
						<ContactCard
							className={styles.contactCard}
							contactMethod={contactMethod}
							key={i}
							copy={copy}
						/>
					)
				})}
			</div>
		</section>
	)
}

export default Contact
