import React, { useState } from 'react';
import { AgChartsReact } from 'ag-charts-react';


const BarGraph = () => {
    const [chartOptions] = useState({
        data: [
            { month: 'Jan', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Feb', avgTemp: 6.3, iceCreamSales: 302000 },
            { month: 'Mar', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Apr', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'May', avgTemp: 14.5, iceCreamSales: 950000 },
            { month: 'June', avgTemp: 8.9, iceCreamSales: 200000 },
            { month: 'Jul', avgTemp: 2.3, iceCreamSales: 162000 },
            { month: 'Aug', avgTemp: 6.3, iceCreamSales: 302000 },
            { month: 'Sep', avgTemp: 16.2, iceCreamSales: 800000 },
            { month: 'Oct', avgTemp: 22.8, iceCreamSales: 1254000 },
            { month: 'Nov', avgTemp: 8.9, iceCreamSales: 200000 },
            { month: 'Dec', avgTemp: 14.5, iceCreamSales: 950000 },
        ],
        series: [{ type: 'bar', xKey: 'month', yKey: 'iceCreamSales' }],
    });

    return (
        <AgChartsReact options={chartOptions} />
    );
}

export default BarGraph
