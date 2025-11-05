import { FC, useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import { cn } from '@/utils/react'

import styles from './Spreadsheet.module.scss'
import Scanner from './Scanner'
import {
	InventoryList,
	SpreadsheetCols,
	useSpreadsheetContext,
} from '@/context/spreadsheetContext'

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
function sumLastElements(arr: SpreadsheetCols[]): number {
	return arr.reduce((sum, inner) => {
		const itemTotal = inner[3] * inner[2]
		return sum + itemTotal
	}, 0)
}

function formatDollar(amount: number): string {
	return amount.toLocaleString('en', {
		currency: 'usd',
		minimumFractionDigits: 2,
		maximumFractionDigits: 2,
	})
}

function inventoryToTable(
	inventory: InventoryList
): [SpreadsheetCols[], number] {
	const parts: SpreadsheetCols[] = Object.values(inventory)
		.sort((a, b) => {
			return a.partId - b.partId
		})
		.map(part => {
			return [
				part.partNumber,
				part.partName,
				part.unitPrice,
				part.quantity,
			]
		})
	return [parts, sumLastElements(parts)]
}

interface SpreadsheetProps {}
const Spreadsheet: FC<SpreadsheetProps> = ({}) => {
	const spreadsheetRef = useRef<HTMLTableElement>(null)
	const { inventoryState } = useSpreadsheetContext()
	const [tableData, setTableData] = useState<[SpreadsheetCols[], number]>([
		[],
		0,
	])

	useEffect(() => {
		setTableData(inventoryToTable(inventoryState[0]))
	}, [inventoryState])

	useGSAP(() => {
		// Timeline for Chapter 2
		const spreadsheetTl1 = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=1200px`,
				end: '+=1000px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		spreadsheetTl1.to(`.${styles.spreadsheet}`, {
			autoAlpha: 0,
		})

		spreadsheetTl1.to('.spreadsheet', {
			autoAlpha: 1,
		})

		const spreadsheetTl2 = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter2',
				start: `top top-=2200px`,
				end: '+=1000px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		spreadsheetTl2.to('.spreadsheet', {
			x: 0,
		})

		// Timeline for transition between Chapter 2 and Chapter 3
		const mm = gsap.matchMedia()

		// Laptop and larger: use -60
		mm.add('(min-width: 950px)', () => {
			const spreadsheetTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: `top center`,
					end: '+=1000px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			spreadsheetTransitionTl.to('.spreadsheet', {
				yPercent: -60,
			})
		})

		// Below laptop: no yPercent animation (or use 0)
		mm.add('(max-width: 949px)', () => {
			const spreadsheetTransitionTl = gsap.timeline({
				scrollTrigger: {
					trigger: '.chapter3',
					start: `top center`,
					end: '+=1000px',
					toggleActions: 'play complete none reverse',
					fastScrollEnd: true,
				},
			})
			spreadsheetTransitionTl.to('.spreadsheet', {
				x: 24,
			})
		})
		// Timeline for exit transition
		const spreadsheetExitTl = gsap.timeline({
			scrollTrigger: {
				trigger: '.chapter4',
				start: 'top bottom',
				end: '+=200px',
				toggleActions: 'play complete none reverse',
				fastScrollEnd: true,
			},
		})
		spreadsheetExitTl.to(`.spreadsheet`, {
			duration: 0.5,
			autoAlpha: 0,
		})
	}, [])

	return (
		<div
			ref={spreadsheetRef}
			className={cn('spreadsheet', styles.spreadsheet)}>
			<table>
				<thead className={styles.header}>
					<tr>
						<th>Part Name</th>
						<th>Part Id</th>
						<th>Unit ($)</th>
						<th>Qty</th>
						<th>Total Cost</th>
					</tr>
				</thead>
				<tbody className={styles.rows}>
					{tableData[0].map((part, i) => {
						if (!part) return null
						const [partId, partName, unitCost, quantity] = part
						return (
							<tr key={`spreadsheet-row-${i}`}>
								<td>{partName}</td>
								<td>{partId}</td>
								<td>${formatDollar(unitCost)}</td>
								<td>{quantity}</td>
								<td>${formatDollar(quantity * unitCost)}</td>
							</tr>
						)
					})}
					<tr>
						<td>Total</td>
						<td></td>
						<td></td>
						<td></td>
						<td>${formatDollar(tableData[1])}</td>
					</tr>
				</tbody>
			</table>
			<Scanner />
		</div>
	)
}

export default Spreadsheet
