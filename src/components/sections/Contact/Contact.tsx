import React from 'react'
import contactList, { Contact as ContactMethod } from './contact-list'
import ContactCard from './ContactCard'

const Contact = () => {
	const contactArray: ContactMethod[] = Object.values(contactList)

	return (
		<section>
			<h1>Get in Touch</h1>
			<p>I'm always interested in talking about new opportunities. Please feel free to reach out to me if you want to talk more!</p>
			<ul>
				{contactArray.map((contactMethod, i) => {
					return (
						<li key={i}>
							<ContactCard contactMethod={contactMethod} />
						</li>
					)
				})}
			</ul>
		</section>
	)
}

export default Contact
