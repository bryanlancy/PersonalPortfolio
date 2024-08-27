import React from 'react'
import contactList, { Contact as ContactMethod } from './contact-list'
import ContactCard from './ContactCard'

import styles from './Contact.module.scss'

const Contact = () => {
	const contactArray: ContactMethod[] = Object.values(contactList)

	return (
		<section className={styles.section}>
			<h1 className={styles.title}>Get in Touch</h1>
			<div className={styles.text}>
				<p>I'm always interested in talking about new opportunities!</p>
				<p>Don't hesitate to reach out to me if you want to talk more!</p>
			</div>
			<div className={styles.contactList}>
				{contactArray.map((contactMethod, i) => {
					return <ContactCard contactMethod={contactMethod} key={i} />
				})}
			</div>
		</section>
	)
}

export default Contact
