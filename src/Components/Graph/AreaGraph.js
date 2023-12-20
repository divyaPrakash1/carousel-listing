import React, { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';

const AreaGraph = () => {
    const [series, setSeries] = useState(
        [
            { type: 'area', xKey: 'month', yKey: 'subscriptions', yName: 'Subscriptions' },
            { type: 'area', xKey: 'month', yKey: 'services', yName: 'Services' },
            { type: 'area', xKey: 'month', yKey: 'products', yName: 'Products' },
        ])
    const [options, setOptions] = useState({
        title: {
            text: 'Sales by Month',
        },
        data: [
            { type: 'area', xKey: 'month', yKey: 'subscriptions', yName: 'Subscriptions' },
            { type: 'area', xKey: 'month', yKey: 'services', yName: 'Services' },
            { type: 'area', xKey: 'month', yKey: 'products', yName: 'Products' },
        ],
        series: [
            {
                type: 'area',
                xKey: 'month',
                yKey: 'subscriptions',
                yName: 'Subscriptions',
            },
            {
                type: 'area',
                xKey: 'month',
                yKey: 'services',
                yName: 'Services',
            },
            {
                type: 'area',
                xKey: 'month',
                yKey: 'products',
                yName: 'Products',
            },
        ],
    });

    const getData = () => {
        return series;
    }






    return <AgChartsReact options={options} />;
};

export default AreaGraph
