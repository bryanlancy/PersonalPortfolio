import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	RefObject,
	SetStateAction,
	useContext,
} from 'react'
import useStateRef from 'react-usestateref'

export const SpreadsheetContext = createContext<SpreadsheetContextProps>({
	partsArr: [],
	inventoryState: [{}, () => null, { current: null }],
	scannerXState: [0, () => null, { current: null }],
})

export const useSpreadsheetContext = (): SpreadsheetContextProps => {
	return useContext(SpreadsheetContext)
}

export const SpreadsheetContextProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	const partsArr: SpreadsheetCols[] = [
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
	return (
		<SpreadsheetContext.Provider
			value={{
				inventoryState: useStateRef(
					Object.assign(
						{},
						...partsArr.map((part, i) => {
							return {
								[part[0]]: {
									partId: i,
									partName: part[1],
									partNumber: part[0],
									unitPrice: part[2],
									quantity: part[3],
								},
							}
						})
					)
				),
				scannerXState: useStateRef(0),
				partsArr,
			}}>
			{children}
		</SpreadsheetContext.Provider>
	)
}

export interface Part {
	partId: number
	partName: string
	partNumber: string
	unitPrice: number
}

export interface InventoryPart extends Part {
	quantity: number
}

export type SpreadsheetCols = [
	partNumber: string,
	partName: string,
	unitCost: number,
	quantity: number
]

export interface InventoryList {
	[partNumber: string]: InventoryPart
}

export interface SpreadsheetContextProps {
	partsArr: SpreadsheetCols[]
	inventoryState: [
		InventoryList,
		Dispatch<SetStateAction<InventoryList>>,
		RefObject<InventoryList>
	]
	scannerXState: [number, Dispatch<SetStateAction<number>>, RefObject<number>]
}
