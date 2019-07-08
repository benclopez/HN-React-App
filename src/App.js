import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.updateSearch = this.updateSearch.bind(this);
    this.state = {
      items: [],
      next: 10,
      start: 0,
      search: '',
    }
  }

  componentDidMount() {
    fetch('https://hacker-news.firebaseio.com/v0/beststories.json')
      .then(response => response.json())
      .then((data) => {
        data.map((newsId) => {
          fetch(`https://hacker-news.firebaseio.com/v0/item/${newsId}.json`)
            .then(response => response.json())
            .then((itemDetail) => {
              this.setState((currentState) => {
                currentState.items.push(itemDetail);
                return { items: currentState.items };
              })
            })
        });
      })
  }

  updateSearch(event) {
    console.log(event);
    this.setState({
      search: event.target.value.toLowerCase()
    });
  }

  render() {
    var { items } = this.state;
    let filteredItems = items.filter(
      (item) => {
        return (item.title.toLowerCase().indexOf(this.state.search) !== -1 || item.by.toLowerCase().indexOf(this.state.search) !== -1)
      }
    );

    items = filteredItems.map(item => {
      return <li key={item.id}><a href={item.url} target="_blank" rel="noopener noreferrer">{item.title} - {item.by}</a></li>
    });

    return (
      <div className="App">
        <div id="topBar">
          <h1>Best of Hacker News</h1>
        </div>
        <div>
          <label>Search by Author or Title: </label>
          <input id="search" type="text"
            value={this.state.search}
            onChange={this.updateSearch}></input>
        </div>
        <ul>
          {items}
        </ul>
      </div>

    );
  }
}

export default App;