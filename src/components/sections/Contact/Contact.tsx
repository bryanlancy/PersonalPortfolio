import React from 'react'
import contactList, { Contact as ContactMethod } from './contact-list'
import ContactCard from './ContactCard'

import styles from './Contact.module.scss'

const Contact = () => {
	const contactArray: ContactMethod[] = Object.values(contactList)

	return (
		<section>
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
							contactMethod={contactMethod}
							key={i}
							i={i}
							copy={copy}
						/>
					)
				})}
			</div>
		</section>
	)
}

export default Contact
