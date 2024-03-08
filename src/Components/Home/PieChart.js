import React from 'react'
import { Doughnut } from 'react-chartjs-2';

const PieChart = () => {
    return (
        <div className='container d-flex justify-content-between'>
            <div className="container" style={{height:"600px", width:"600px"}}>
                <Doughnut
                    data={{
                        labels: [
                            'Red',
                            'Blue',
                            'Yellow'
                        ],
                        datasets: [{
                            label: 'My First Dataset',
                            data: [300, 50, 100],
                            backgroundColor: [
                                'rgb(255, 99, 132)',
                                'rgb(54, 162, 235)',
                                'rgb(255, 205, 86)'
                            ],
                            hoverOffset: 4
                        }]
                    }}
                />
            </div>
            <div className="container">
                hello
            </div>
        </div>
    )
}

export default PieChart
