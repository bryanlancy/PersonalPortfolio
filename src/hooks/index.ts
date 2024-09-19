'use client'

import { BannerContext } from '@/context/bannerContext'
import { useContext } from 'react'

export function useBannerScrollProgress(projectName: string) {
	const {
		animState: [{ [projectName]: animProgress }],
	} = useContext(BannerContext)

	return animProgress
}
