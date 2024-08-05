"use client"

import React from 'react';
import Tooltip from '@uiw/react-tooltip';
import HeatMap from '@uiw/react-heat-map';
import { convertDateToString } from '@/lib/utils';

type Props = {
    data: {
        createdAt: Date;
        count: number;
    }[];
}

const panelColors = {
    0: '#4b515c',
    4: '#C6E48B',
    8: '#7BC96F',
    12: '#239A3B',
    32: '#196127'
};

const SubmissionsHeatMap = (props: Props) => {
    const { data } = props;

    // Ensure data is defined and not empty before mapping
    const formattedDates = data && data.length > 0 ? data.map((item) => ({
        date: convertDateToString(item.createdAt),
        count: item.count
    })) : [];

    return (
        <HeatMap
            value={formattedDates}
            width="100%"
            style={{ color: "#888" }}
            startDate={new Date('2024/01/01')}
            panelColors={panelColors}
            rectRender={(props, data) => (
                <Tooltip placement="top" content={`count: ${data.count || 0}`}>
                    <rect {...props} />
                </Tooltip>
            )}
            data-testid="heat-map"/>
    );
};

export default SubmissionsHeatMap;
