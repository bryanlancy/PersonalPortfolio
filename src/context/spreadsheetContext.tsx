import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react'

export const SpreadsheetContext = createContext<SpreadsheetContextProps>({
	inventoryState: [{}, () => null],
})

export const useSpreadsheetContext = (): SpreadsheetContextProps => {
	return useContext(SpreadsheetContext)
}

export const SpreadsheetContextProvider: FC<PropsWithChildren> = ({
	children,
}) => {
	return (
		<SpreadsheetContext.Provider value={{ inventoryState: useState({}) }}>
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
	qty: number
}

const partsInfoArr: [string, string, number][] = [
	['TEH-92X7', 'Conductor', 65.0],
	['RSR-17B4', 'Flux', 420.0],
	['PSC-8MZ2', 'Hydrocoptic marzlevanes', 149.6],
	['HDR-63K9', 'Waneshaft', 720.75],
	['PFC-4D11', 'Copper Wire', 95.5],
	['ISG-55L8', 'Semi-boloid mill bit', 310.4],
	['BOV-7TQ3', 'Tremie pipe', 185.2],
	['NCM-29R5', 'Girdle spring', 39.99],
	['CTR-90H6', 'Encabulator housing', 489.7],
	['SBA-81V2', 'Grammeters', 249.95],
	['PSK-62V8', 'Phlogiston seal kit', 44.2],
]

export const partsArr: Part[] = partsInfoArr.map((part, i) => {
	const [partNumber, partName, unitPrice] = part
	return {
		partId: i,
		partNumber,
		partName,
		unitPrice,
	}
})

interface InventoryList {
	[partId: number]: InventoryPart
}

export interface SpreadsheetContextProps {
	inventoryState: [InventoryList, Dispatch<SetStateAction<InventoryList>>]
}
