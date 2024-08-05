import { roundIfNumber } from "@/lib/utils";

type Props = {
    value: number | string | null;
    label: string;
};

const MetricCard = (props: Props) => {
    const { value, label } = props;

    return (
        <div className="mt-4">
            <div className="p-6 border rounded-md">
                <p className="text-[#6c7381]">{label}</p>
                <p
                    className="text-3xl font-bold mt-2"
                    data-testid="metric-value" // Add data-testid here
                >
                    {roundIfNumber(value)}
                </p>
            </div>
        </div>
    );
};

export default MetricCard;
