import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import StatusDialog, { StatusList } from './StatusDialog';
import { TASK_STATUS } from '@/types/Task';

describe('StatusDialog', () => {
	
    it('does not render when not open', () => {
        render(<StatusDialog isOpen={false} status={TASK_STATUS.PENDING} onClose={() => {}} />);
        const dialogTitle = screen.queryByText('STATUS');
        expect(dialogTitle).not.toBeInTheDocument();
    });

    it('renders correctly when open', () => {
        render(<StatusDialog isOpen={true} status={TASK_STATUS.PENDING} onClose={() => {}} />);
        
        // Check title
        expect(screen.getByText('STATUS')).toBeInTheDocument();

        // Check all status options are present
        StatusList.forEach(item => {
            expect(screen.getByText(item.label)).toBeInTheDocument();
        });

        // Check close button
        expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
    });

    it('highlights the current status', () => {
        render(<StatusDialog isOpen={true} status={TASK_STATUS.IN_PROGRESS} onClose={() => {}} />);
        
        // Find the "IN PROGRESS" list item. 
        // MUI ListItemButton renders as a div or button styled thing. 
        // We can look for the text "IN PROGRESS", then find its parent button/row to check selected state if possible,
        // or just verify it exists. detailed styles check might be brittle, 
        // but MUI sets 'Mui-selected' class or aria-selected='true'.
        
        const selectedOption = screen.getByText('IN PROGRESS').closest('[role="button"]');
        expect(selectedOption).toHaveClass('Mui-selected');

        const unselectedOption = screen.getByText('PENDING').closest('[role="button"]');
        expect(unselectedOption).not.toHaveClass('Mui-selected');
    });

    it('calls onClose with selected status when an option is clicked', async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();
        
        render(<StatusDialog isOpen={true} status={TASK_STATUS.PENDING} onClose={handleClose} />);
        
        await user.click(screen.getByText('COMPLETED'));
        
        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(handleClose).toHaveBeenCalledWith(TASK_STATUS.COMPLETED);
    });

    it('calls onClose with null when generic Close button is clicked', async () => {
        const user = userEvent.setup();
        const handleClose = vi.fn();
        
        render(<StatusDialog isOpen={true} status={TASK_STATUS.PENDING} onClose={handleClose} />);
        
        await user.click(screen.getByRole('button', { name: /close/i }));
        
        expect(handleClose).toHaveBeenCalledTimes(1);
        expect(handleClose).toHaveBeenCalledWith(null);
    });
});
