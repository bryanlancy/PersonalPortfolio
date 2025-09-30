import { FC, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Spreadsheet.module.scss'
import Scanner from './Scanner'

gsap.registerPlugin(useGSAP)
gsap.registerPlugin(ScrollTrigger)

/**
 * Sum the last element of each nested array.
 *
 * @param arr - An array of arrays of numbers.
 * @returns The total sum of the last elements.
 *
 * @example
 * ```ts
 * sumLastElements([[1, 2], [3, 4, 5], [6]]);
 * // → 2 + 5 + 6 = 13
 * ```
 */
function sumLastElements(arr: cols[]): number {
	return arr.reduce((sum, inner) => {
		const itemTotal = inner[3] * inner[2]
		return sum + itemTotal
	}, 0)
}
type cols = [
	partId: string,
	partName: string,
	unitCost: number,
	quantity: number
]

function formatDollar(amount: number): string {
	return amount.toLocaleString('en', {
		currency: 'usd',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

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

		// // Timeline for exit transition
		// const spreadsheetExitTl = gsap.timeline({
		// 	scrollTrigger: {
		// 		trigger: '.chapter4',
		// 		start: 'top bottom',
		// 		end: '+=200px',
		// 		onUpdate: self => {
		// 			spreadsheetExitTl.reversed(
		// 				self.direction > 0 ? false : true
		// 			)
		// 		},
		// 	},
		// })
		// spreadsheetExitTl.to('.spreadsheet', {
		// 	autoAlpha: 0,
		// 	y: -500,
		// })
	}, [])

	const tableData: cols[] = [
		['TEH-92X7', 'Conductor', 0.65, 120],
		['RSR-17B4', 'Flux', 420.0, 4],
		['PSC-8MZ2', 'Hydrocoptic marzlevanes', 310.4, 6],
		['HDR-63K9', 'Waneshaft', 720.75, 2],
		['PFC-4D11', 'Copper Wire', 9.98, 100],
		['ISG-55L8', 'Semi-boloid mill bit', 149.6, 1],
		['BOV-7TQ3', 'Tremie pipe', 185.2, 6],
		['NCM-29R5', 'Girdle spring', 39.99, 16],
		['CTR-90H6', 'Encabulator housing', 489.7, 1],
		['SBA-81V2', 'Grammeters', 249.95, 4],
		['PSK-62V8', 'Phlogiston seal kit', 44.2, 3],
	]
	const totalCost = sumLastElements(tableData)

	return (
		<div
			ref={spreadsheetRef}
			className={cn('spreadsheet', styles.spreadsheet)}>
			<table>
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
						([partId, partName, unitCost, quantity], i) => {
							return (
								<tr key={`spreadsheet-row-${i}`}>
									<td>{partName}</td>
									<td>{partId}</td>
									<td>${formatDollar(unitCost)}</td>
									<td>{quantity}</td>
									<td>
										${formatDollar(quantity * unitCost)}
									</td>
								</tr>
							)
						}
					)}
					<tr>
						<td>Total</td>
						<td></td>
						<td></td>
						<td></td>
						<td>${formatDollar(totalCost)}</td>
					</tr>
				</tbody>
			</table>
			<Scanner />
		</div>
	)
}

export default Spreadsheet
