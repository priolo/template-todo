import logoDark from '@/assets/logo_dark.svg';
import logoLight from '@/assets/logo_light.svg';
import themeSo from '@/stores/layout/theme';
import locationSo, { LOCATION_PAGE } from '@/stores/location';
import { Box, Button, IconButton, SxProps } from '@mui/material';
import { useStore } from '@priolo/jon';
import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from './BackButton';
import { Brightness4 as DarkModeIcon, Brightness7 as LightModeIcon, Settings, Tune } from '@mui/icons-material';


import TasksListHeader from '@/pages/task/list/Header';
import TaskDetailHeader from '@/pages/task/detail/Header';
import { lightTheme } from '@/theme/theme';



interface HeaderCmpProps {
}

const HeaderCmp: React.FC<HeaderCmpProps> = ({
}) => {

	// STORES
	useStore(themeSo)
	useStore(locationSo)

	// HOOKS
	const navigate = useNavigate()

	const header = useMemo(() => {
		return {
			[LOCATION_PAGE.TASKS]: <TasksListHeader />,
			[LOCATION_PAGE.TASK]: <TaskDetailHeader />,
		}[locationSo.state.current]
	}, [locationSo.state.current])


	// HANDLERS
	const handleThemeToggle = () => {
		themeSo.toggleMode();
	}

	// Pick logo based on theme
	const isDark = themeSo.state.current?.palette?.mode === 'dark';
	const isHome = locationSo.state.current === LOCATION_PAGE.TASKS;
	const logo = isDark ? logoDark : logoLight;

	// RENDER
	return (
		<Box sx={sxRoot}>

			<Box sx={{ flex: 1 }} />

			<Box sx={{ display: "flex", minWidth: "800px", alignItems: "center" }}>
				{!isHome &&
					<BackButton toHome />
				}
				<Box sx={{ flex: 1, display: 'flex', alignItems: 'center', gap: 2 }}>
					{header}
				</Box>
			</Box>

			<Box sx={sxLeft}>
				<IconButton size="large"
					onClick={handleThemeToggle}
				>
					{themeSo.state.current === lightTheme ? <DarkModeIcon /> : <LightModeIcon />}
				</IconButton>
			</Box>

		</Box>
	);
};

export default HeaderCmp;

const sxRoot: SxProps = {
	backgroundColor: 'background.paper',
	borderBottom: 1,
	borderColor: 'divider',
	padding: '0 2rem',
	height: '70px',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'space-between',
	boxShadow: 1,
	flexShrink: 0
}

const sxLeft: SxProps = {
	flex: 1, display: 'flex',
	justifyContent: 'flex-end'
}
