// src/pages/StockPage.js

import React, { useState, useEffect } from "react";
import { fetchStockData } from "../api/stockService";
import "./StockPage.css";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

Chart.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const StockPage = () => {
  const [stockData, setStockData] = useState(null);
  const [chartData, setChartData] = useState(null);
  const [ticker, setTicker] = useState("AAPL");
  const [fromDate, setFromDate] = useState("2023-01-09");
  const [toDate, setToDate] = useState("2023-02-10");
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchStockData(ticker, fromDate, toDate);
        setStockData(data);
      } catch (err) {
        setError("Failed to fetch stock data");
        console.error(err);
      }
    };

    getData();
  }, [ticker, fromDate, toDate]);

  useEffect(() => {
    setChartData({
      labels: stockData
        ? stockData.map((result) => new Date(result.t).toLocaleDateString())
        : [],
      datasets: [
        {
          label: "Stock Price",
          data: stockData ? stockData.map((result) => result.c) : [],
          borderColor: "rgba(75,192,192,1)",
          backgroundColor: "rgba(75,192,192,0.2)",
        },
      ],
    });
  }, [stockData]);

  if (error) return <p>{error}</p>;

  return (
    <div className="stock-page">
      <div className="stock-content">
        <input
          type="text"
          value={ticker}
          onChange={(e) => setTicker(e.target.value)}
          placeholder="Enter stock ticker (e.g., AAPL)"
        />
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
        {chartData && <Line data={chartData} />}
      </div>
    </div>
  );
};

export default StockPage;
