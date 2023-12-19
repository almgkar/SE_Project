import React, { Component } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './TopBookedBooksChart.css'
const url = process.env.REACT_APP_API_URL || "http://localhost:3001";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend );

class TopBookedBooksChart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      books: [],
      chart: null,
    };
  }

  componentDidMount() {
    this.fetchBooks();
  }

  fetchBooks() {
    fetch(`${url}/search/top-books`)
      .then(response => response.json())
      .then(data => {
        this.setState({ books: data });
      });
  }


  render() {
    const labelsSets = this.state.books.map(book => book.title);
    const dataSet = this.state.books.map(book => book.no_of_bookings);

    const data = {
        labels: labelsSets,
        datasets:[{
            label: "Booked Count",
            data: dataSet,
            backgroundColor: 'purple',
            borderColor: 'black',
            borderWidth: 1,
        } ]
    }

    const options = {
        scales: {
          x: {
            display: false,
          },
          y: {
            beginAtZero: true,
          },
        },
      };

    return (
        <div className='booking-chart-container'>
            <div className='booking-chart' >
            <h2>Top Booked Books</h2>
            <Bar
                data = {data}
                options = {options}
            >
            </Bar>
            </div>
        </div>
      
    );
  }
}

export default TopBookedBooksChart;



