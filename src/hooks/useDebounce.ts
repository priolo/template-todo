import { useEffect, useState } from 'react';


/**
 * Custom hook to manage debounced state updates.
 */
export function useDebounce<T>(valueDeb: T, onDeb: (value: T) => void, delay: number = 300): [T, React.Dispatch<React.SetStateAction<T>>] {

	const [value, setValue] = useState<T>(valueDeb)

	useEffect(() => {
		setValue(valueDeb)
	}, [valueDeb])

	useEffect(() => {
		const timer = setTimeout(() => onDeb(value), delay)
		return () => {
			clearTimeout(timer)
		}
	}, [value, delay])


	return [value, setValue]
}
