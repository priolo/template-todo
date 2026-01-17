import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';
import TableCellSort from './TableCellSort';
import { Sort } from '@/stores/task/list';
import { Table, TableBody, TableRow } from '@mui/material';

const Wrapper = ({ children }: { children: React.ReactNode }) => (
    <Table>
        <TableBody>
            <TableRow>
                {children}
            </TableRow>
        </TableBody>
    </Table>
);

describe('TableCellSort', () => {
    it('renders the label and children', () => {
        const mockSort: Sort = { prop: 'name', direction: 'asc' };
        render(
            <Wrapper>
                <TableCellSort label="name" sort={mockSort} onSort={() => {}}>
                    Sortable Column
                </TableCellSort>
            </Wrapper>
        );
        expect(screen.getByText('Sortable Column')).toBeInTheDocument();
    });

    it('calls onSort with opposite direction when clicking same prop (asc -> desc)', async () => {
        const user = userEvent.setup();
        const handleSort = vi.fn();
        
        render(
            <Wrapper>
                <TableCellSort label="name" sort={{ prop: 'name', direction: 'asc' }} onSort={handleSort}>
                    Sortable Column
                </TableCellSort>
            </Wrapper>
        );
        
        await user.click(screen.getByText('Sortable Column'));
        expect(handleSort).toHaveBeenCalledWith({ prop: 'name', direction: 'desc' });
    });

    it('calls onSort with opposite direction when clicking same prop (desc -> asc)', async () => {
        const user = userEvent.setup();
        const handleSort = vi.fn();
        
        render(
            <Wrapper>
                <TableCellSort label="name" sort={{ prop: 'name', direction: 'desc' }} onSort={handleSort}>
                    Sortable Column
                </TableCellSort>
            </Wrapper>
        );
        
        await user.click(screen.getByText('Sortable Column'));
        expect(handleSort).toHaveBeenCalledWith({ prop: 'name', direction: 'asc' });
    });

    it('resets to asc when sorting a different property', async () => {
        const user = userEvent.setup();
        const handleSort = vi.fn();
        
        render(
            <Wrapper>
                <TableCellSort label="name" sort={{ prop: 'other', direction: 'desc' }} onSort={handleSort}>
                    Sortable Column
                </TableCellSort>
            </Wrapper>
        );
        
        await user.click(screen.getByText('Sortable Column'));
        expect(handleSort).toHaveBeenCalledWith({ prop: 'name', direction: 'asc' });
    });
});
