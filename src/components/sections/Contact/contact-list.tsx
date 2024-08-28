import { faGithub, faLinkedinIn } from '@awesome.me/kit-ddd907bdb7/icons/classic/brands'
import { faFileUser, faMailboxFlagUp } from '@awesome.me/kit-ddd907bdb7/icons/sharp-duotone/solid'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Image from 'next/image'
import { ReactElement } from 'react'
import styles from './ContactCard.module.scss'

export interface Contact {
	/** Name of contact method */
	name: string
	/** Link for redirecting to contact method */
	link: string
	/** Text used to display link */
	linkText: string
	/** Icon to be used */
	icon: ReactElement
	/** Hexcode to be used to style elements related to the contact method */
	color: string | string[]
}

// Contact Methods ========
const wellfound: Contact = {
	name: 'wellfound:',
	link: 'https://wellfound.com/u/bryan-burns-4',
	linkText: 'Visit my profile',
	color: '#EC2E39',
	// TODO Add Icon
	icon: <Image src='' alt='' />,
}
const github: Contact = {
	name: 'Github',
	link: 'https://github.com/bryanlancy',
	linkText: 'Check out my projects',
	color: ['#7342C8', '#0D1117'],
	icon: <FontAwesomeIcon icon={faGithub} className={styles.icon} />,
}
const linkedin: Contact = {
	name: 'LinkedIn',
	link: 'https://www.linkedin.com/in/bryan-burns-b45006116/',
	linkText: 'View my profile',
	color: '#0457c4',
	icon: <FontAwesomeIcon icon={faLinkedinIn} className={styles.icon} />,
}
const email: Contact = {
	name: 'Email',
	link: 'bryanburns93@gmail.com',
	linkText: 'Email me directly',
	color: ['#FBBE0C', '#EB493B', '#3AAB58', '#4889F4'],
	icon: <FontAwesomeIcon icon={faMailboxFlagUp} className={styles.icon} />,
}
const resume: Contact = {
	name: 'Resume',
	link: '/Resume_Bryan_Burns.pdf',
	linkText: 'View/Download my resume',
	color: '#6304c9',
	icon: <FontAwesomeIcon icon={faFileUser} className={styles.icon} />,
}
// ========================

/**\
 * Object containing all ways of contacting me.
 */
const contactList: { [contactName: string]: Contact } = {
	wellfound,
	github,
	linkedin,
	email,
	resume,
}

export default contactList
