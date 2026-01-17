import { Box, SxProps } from '@mui/material';
import React, { FunctionComponent } from "react";



interface Props {
	/** Titolo che appare a sinistra */
	title?: string | React.ReactNode
	children?: React.ReactNode
}

const Paragraph: FunctionComponent<Props> = ({
	title,
	children,
}) => {

	return <Box sx={sxRoot}>

		<Box sx={sxTitle}>{title}</Box>

		<Box sx={sxRootChildren}>
			{children}
		</Box>

	</Box>
}

export default Paragraph

const sxRoot: SxProps = {
	display: "flex",
	alignItems: "center",
	gap: 2,
}

const sxTitle: SxProps = {
	flex: .2,
	fontWeight: 500,
	fontSize: 14,
	opacity: .8,
}

const sxRootChildren: SxProps = {
	display: "flex",
	flex: 1,
}