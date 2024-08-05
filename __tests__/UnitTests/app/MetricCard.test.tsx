import { render, screen } from "@testing-library/react";
import MetricCard from "@/app/(user)/dashboard/metricCard";
import { roundIfNumber } from "@/lib/utils"; 

// Mock the module with the correct path
jest.mock('@/lib/utils', () => ({
    roundIfNumber: jest.fn((value) => (typeof value === 'number' ? Math.round(value) : value)),
}));

describe('MetricCard', () => {
    const label = "Test Label";

    it('renders correctly with a number value', () => {
        const value = 123.456;
        render(<MetricCard value={value} label={label} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(Math.round(value).toString())).toBeInTheDocument();
    });

    it('renders correctly with a string value', () => {
        const value = "Test Value";
        render(<MetricCard value={value} label={label} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        expect(screen.getByText(value)).toBeInTheDocument();
    });

    it('renders correctly with a null value', () => {
        const value = null;
        render(<MetricCard value={value} label={label} />);

        expect(screen.getByText(label)).toBeInTheDocument();
        // Handling null value properly
        expect(screen.getByTestId('metric-value').textContent).toBe('');
    });

    it('calls roundIfNumber with the correct value', () => {
        const value = 123.456;
        render(<MetricCard value={value} label={label} />);

        expect(roundIfNumber).toHaveBeenCalledWith(value);
    });
});
