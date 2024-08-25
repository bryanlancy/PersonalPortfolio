import React, { FC } from 'react'
import { Contact } from './contact-list'

import styles from './ContactCard.module.scss'

type ContactCardProps = {
	contactMethod: Contact
}

const ContactCard: FC<ContactCardProps> = ({ contactMethod }) => {
	return <div>{contactMethod.name}</div>
}

export default ContactCard
