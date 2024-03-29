import React, { useCallback, useRef, useState } from 'react'
import { time } from 'ag-charts-community';
import { AgChartsReact } from 'ag-charts-react';


const LineGraph = () => {
    const chartRef = useRef(null);
    const [updating, setUpdating] = useState(false);
    const [options, setOptions] = useState({
        data: getData(),
        series: [
            {
                xKey: 'time',
                yKey: 'voltage',
            },
        ],
        axes: [
            {
                type: 'time',
                position: 'bottom',
                nice: false,
                tick: {
                    interval: time.second.every(5),
                },
                label: {
                    format: '%H:%M:%S',
                },
            },
            {
                type: 'number',
                position: 'left',
                label: {
                    format: '#{.2f}V',
                },
            },
        ],
        title: {
            text: 'Core Voltage',
        },
    });

    const update = useCallback(() => {
        const clone = { ...options };

        clone.data = getData();

        setOptions(clone);
    }, [getData, options]);

    const startUpdates = useCallback(() => {
        if (updating) {
            return;
        }
        setUpdating(true);
        update();
        setInterval(update, 500);
    }, [updating]);

    return (
        <div className="wrapper">
            <div id="toolPanel">
                <button onClick={startUpdates}>Start Updates</button>
            </div>
            <AgChartsReact ref={chartRef} options={options} />
        </div>
    );
};


var lastTime = new Date().getTime();
var data = [];
function getData() {
    data.shift();
    while (data.length < 20) {
        data.push({
            time: new Date((lastTime += 1000)),
            voltage: 1.1 + Math.random() / 2,
        });
    }
    return data;
}

export default LineGraph