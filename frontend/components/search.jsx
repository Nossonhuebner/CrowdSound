import React from 'react';

class SearchBar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {params: ""};
  }

  handleChange (e) {
    this.setState({params: e.currentTarget.value});
  }

  render () {
    return (
      <div className="search">
        <form className="search-form">
        <input className="search-input" onChange={this.handleChange.bind(this)}
          type="text" placeholder="Search" value={this.state.params}/>
        <button className="search-submit">
          <i className="fa fa-search"></i>
        </button>
        </form>
      </div>
    );
  }
}

export default SearchBar;
