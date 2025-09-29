import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Spreadsheet.module.scss'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

interface SpreadsheetProps {}

const Spreadsheet: FC<SpreadsheetProps> = ({}) => {
	const spreadsheetRef = useRef<HTMLTableElement>(null)

	useGSAP(() => {
		// Timeline for Chapter 2
		const spreadsheetTl1 = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=1200px`,
				end: '+=1px',
				onUpdate: self => {
					spreadsheetTl1.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		spreadsheetTl1.set('.spreadsheet', {
			x: -120,
		})
		spreadsheetTl1.to('.spreadsheet', {
			autoAlpha: 1,
		})

		const spreadsheetTl2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=2200px`,
				end: '+=1px',
				onUpdate: self => {
					spreadsheetTl2.reversed(self.direction > 0 ? false : true)
				},
			},
		})
		spreadsheetTl2.to('.spreadsheet', {
			x: 0,
		})

		// Timeline for transition between Chapter 2 and Chapter 3
		const spreadsheetTransitionTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter3',
				start: `top center`,
				end: '+=1px',
				onUpdate: self => {
					spreadsheetTransitionTl.reversed(
						self.direction > 0 ? false : true
					)
				},
			},
		})
		spreadsheetTransitionTl.to('.spreadsheet', {
			yPercent: -60,
		})

		// Timeline for exit transition
		const spreadsheetExitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top bottom',
				end: '+=200px',
				onUpdate: self => {
					spreadsheetExitTl.reversed(
						self.direction > 0 ? false : true
					)
				},
			},
		})
		spreadsheetExitTl.to('.spreadsheet', {
			autoAlpha: 0,
			y: -500,
		})
	}, [])

	type cols = [
		showText: boolean,
		partId: string,
		partName: string,
		unitCost: number,
		quantity: number
	]
	const tableData: cols[] = [
		[true, 'TEH-92X7', 'Conductor', 65.0, 1],
		[true, 'RSR-17B4', 'Flux', 420.0, 1],
		[true, 'PSC-8MZ2', 'Hydrocoptic marzlevanes', 310.4, 6],
		[true, 'HDR-63K9', 'Waneshaft', 720.75, 1],
		[true, 'PFC-4D11', 'Copper Wire', 95.5, 1],
		[true, 'ISG-55L8', 'Semi-boloid mill bit', 149.6, 1],
		[true, 'BOV-7TQ3', 'Tremie pipe', 185.2, 1],
		[true, 'NCM-29R5', 'Girdle spring', 39.99, 1],
		[true, 'CTR-90H6', 'Encabulator housing', 489.7, 1],
		[true, 'SBA-81V2', 'Grammeters', 249.95, 1],
		[true, 'PSK-62V8', 'Phlogiston seal kit', 44.2, 6],
	]

	return (
		<table
			ref={spreadsheetRef}
			className={cn('spreadsheet', styles.spreadsheet)}>
			<thead className={styles.header}>
				<tr>
					<th>Part Name</th>
					<th>Part Id</th>
					<th>Unit Price ($)</th>
					<th>Qty</th>
					<th>Total Cost</th>
				</tr>
			</thead>
			<tbody className={styles.rows}>
				{tableData.map(
					([showText, partId, partName, unitCost, quantity], i) => {
						return (
							<tr key={`spreadsheet-row-${i}`}>
								<td>{partName}</td>
								<td>{partId}</td>
								<td>${unitCost.toFixed(2)}</td>
								<td>{quantity}</td>
								<td>{}</td>
							</tr>
						)
					}
				)}
			</tbody>
		</table>
	)
}

export default Spreadsheet
