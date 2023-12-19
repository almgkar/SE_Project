import React, { Component } from 'react';
import { Chart, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import './TopSearchedBooksChart.css'
const url = process.env.REACT_APP_API_URL || "http://localhost:3001";

Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend );

class TopSearchedBooksChart extends Component {
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
    fetch(`${url}/search/top-searched-books`)
      .then(response => response.json())
      .then(data => {
        this.setState({ books: data });
      });
  }


  render() {
    const labelsSets = this.state.books.map(book => book.title);
    const dataSet = this.state.books.map(book => book.no_of_searches);

    const data = {
         labels: labelsSets,
        datasets:[{
            label: "Search Count",
            data: dataSet,
            backgroundColor: 'red',
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
        <div className='search-chart-container'>
            <div className='search-chart'>
                <h2>Top Searched Books</h2>
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

export default TopSearchedBooksChart;



