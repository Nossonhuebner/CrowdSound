import React from 'react';
import { connect } from 'react-redux';
import { search, wipeState } from '../actions/search_actions';
import { Link } from 'react-router-dom';

class SearchBar extends React.Component {

  constructor (props) {
    super(props);
    this.state = {params: ""};
  }

  handleChange (e) {
    this.setState({params: e.currentTarget.value});
  }

  componentWillReceiveNewProps() {
    this.setState({results: this.props.results});
  }

  clearField (e) {
    setTimeout(() => {
            this.setState({params: ""});
            this.props.wipeState();
    }, 200);
  }

  render () {
    let results = "";
    results = this.props.results.map(r => {

      if (r.artist_id) {
        return (
        <li key={r.id} className="search-result-item">
          <Link to={`/users/${r.artist_id}/${r.id}`}>
            <div>
              <img className="search-results-image" src={r.artworkUrl}/>
              <div>{r.title}</div>
            </div>
            <div className="results-artist-name">by {r.artistName}</div>
          </Link>
        </li>);
      } else {
        return (
        <li key={r.id} className="search-result-item">
          <Link to={r.artist_id ? `/users/${r.artist_id}/${r.id}` : `/users/${r.id}`}>
            <div>
              <img className="search-results-image" src={r.profilePicUrl} style={{borderRadius: "50%"}}/>
              <div>{r.username}</div>
            </div>
          </Link>
        </li>);
      }
    });

    if (this.props.results.length < 1 && this.props.errors.length > 0) {
      results = <li className="search-result-item"><div>No results</div></li>;
    }

    return (
      <div className="search-container">
        <div className="search" onBlur={this.clearField.bind(this)}>
          <form className="search-form"  onSubmit={() => this.props.search(this.state.params)}>
          <input className="search-input"  onChange={this.handleChange.bind(this)}
            type="text" placeholder="Search for artists or tracks" value={this.state.params}/>
          <button className="search-submit">
            <i className="fa fa-search"></i>
          </button>
          </form>
          <ul className="results-list" hidden={!this.state.params}>
            {results}
          </ul>
        </div>
    </div>
    );
  }
}

const mapStateToProps = state => {
  let results = [];

  if (state.ui.search.tracks) {
    let ids = Object.keys(state.ui.search.tracks);
    for (var i = 0; i < ids.length; i++) {
      results.push(state.ui.search.tracks[ids[i]]);
    }
  }

  if (state.ui.search.users) {
    let ids = Object.keys(state.ui.search.users);
    for (var j = 0; j < ids.length; j++) {
      results.push(state.ui.search.users[ids[j]]);
    }
  }

  return {
    errors: state.errors,
    results: results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    wipeState: () => dispatch(wipeState()),
    search: params => dispatch(search(params))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
