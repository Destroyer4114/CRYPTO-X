
import React from 'react';
import { Line } from 'react-chartjs-2';
import { Col, Row, Typography } from 'antd';
import { Chart as ChartJS } from 'chart.js/auto';

import { useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } from '../services/cryptoApi';
const { Title } = Typography;

const LineChart = ({ coinId,timeperiod, currentPrice, coinName }) => {
  const coinPrice = [];
  const coinTimestamp = [];
  const { data: coinHistory } = useGetCryptoHistoryQuery({ coinId, timeperiod });

  console.log(coinHistory);

  for (let  i =coinHistory?.data?.history?.length-1;i>=0;i -= 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
  }

  for (let  i =coinHistory?.data?.history?.length-1;i>=0;i -= 1) {
    const x= coinHistory?.data?.history[i].timestamp;
    // console.log(x);
    const date =new Date(x*1000).toLocaleString();
    // console.log(date);
 
    coinTimestamp.push(date);
    // coinTimestamp.push(coinHistory?.data?.history[i].timestamp);
  }
  // console.log(coinTimestamp);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: 'Price In USD',
        data: coinPrice,
        fill: false,
        backgroundColor: '#0071bd',
        borderColor: '#0071bd',
      },
    ],
  };


  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
      <Row className="chart-header">
        <Title level={2} className="chart-title">{coinName} Price Chart </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">Change: {coinHistory?.data?.change}%</Title>
          <Title level={5} className="current-price">Current {coinName} Price: $ {currentPrice}</Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </>
  );
};

export default LineChart;
