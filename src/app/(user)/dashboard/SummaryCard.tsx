// components/SummaryCard.tsx
import React from 'react';

const SummaryCard = ({ title, value }) => (
    <div className="p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl">{value}</p>
    </div>
);

export default SummaryCard;
