import { CssBaseline, ThemeProvider } from '@mui/material';
import { useStore } from '@priolo/jon';
import { lazy } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import { ErrorBoundary } from './components/ErrorBoundary';
import Layout from './layout/Layout';
import MsgBox from './layout/MsgBox';
import themeSo from './stores/layout/theme';

const TasksListPag = lazy(() => import("./pages/task/list/Pag"));
const TaskDetailPag = lazy(() => import("./pages/task/detail/Pag"));



function App() {

	// STORES
	useStore(themeSo);

	// HOOKS
	return <ThemeProvider theme={themeSo.state.current}>
		<CssBaseline />

		<ErrorBoundary>
			<Router>
				<Routes>
					<Route path="/app" element={<Layout />}>

						<Route index element={<TasksListPag />} />
						<Route path="tasks" element={<TasksListPag />} />

						<Route path="tasks/:id" element={<TaskDetailPag />} />

					</Route>
				</Routes>
			</Router>
		</ErrorBoundary>

		<MsgBox />

	</ThemeProvider>
}

export default App;
