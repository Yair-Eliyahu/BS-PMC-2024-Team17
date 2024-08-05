import React from 'react';
import { render, screen, act } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import SubmissionsHeatMap from '@/app/(user)/dashboard/heatMap';

jest.mock('@/lib/utils', () => ({
    convertDateToString: jest.fn((date: Date) => date.toISOString().split('T')[0])
}));

describe('SubmissionsHeatMap', () => {
    it('renders HeatMap with provided data', async () => {
        const mockData = [
            { createdAt: new Date('2024-01-01'), count: 5 },
            { createdAt: new Date('2024-01-02'), count: 10 },
        ];

        await act(async () => {
            render(<SubmissionsHeatMap data={mockData} />);
        });

        const heatMapElements = screen.queryAllByTestId('heat-map');
        expect(heatMapElements.length).toBeGreaterThan(0);
    });

    it('handles empty data gracefully', async () => {
        await act(async () => {
            render(<SubmissionsHeatMap data={[]} />);
        });

        const heatMapElements = screen.queryAllByTestId('heat-map');
        expect(heatMapElements.length).toBeGreaterThan(0);
        expect(screen.queryByText(/count:/)).toBeNull();
    });

    it('handles null or undefined data gracefully', async () => {
        await act(async () => {
            render(<SubmissionsHeatMap data={null as any} />);
        });
        let heatMapElements = screen.queryAllByTestId('heat-map');
        expect(heatMapElements.length).toBeGreaterThan(0);

        await act(async () => {
            render(<SubmissionsHeatMap data={undefined as any} />);
        });
        heatMapElements = screen.queryAllByTestId('heat-map');
        expect(heatMapElements.length).toBeGreaterThan(0);
    });
});
