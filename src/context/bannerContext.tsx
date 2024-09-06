import {
	createContext,
	Dispatch,
	FC,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from 'react'

export const BannerContext = createContext<BannerContextProps>({
	animState: null,
})

export const useBannerContext = (): BannerContextProps => {
	return useContext(BannerContext)
}

export const BannerContextProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<BannerContext.Provider value={{ animState: useState(0) }}>
			{children}
		</BannerContext.Provider>
	)
}

export interface BannerContextProps {
	animState: [number, Dispatch<SetStateAction<number>>] | null
}
