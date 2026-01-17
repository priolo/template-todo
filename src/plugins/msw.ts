// start MSW (mock service worker)

if (import.meta.env.DEV && import.meta.env.VITE_API_MOCK === 'true') {
	const { worker } = await import('../mock/browser')
	await worker.start({
		serviceWorker: {
			url: '/app/mockServiceWorker.js',
		},
	})
}
