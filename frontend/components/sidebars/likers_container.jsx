import React from 'react';
import TrackSidebar from './track_sidebar';
import { connect } from 'react-redux';

class TrackLikers extends React.Component {

    render() {
      if (!this.props.likers) return "";

      return (
        <div className="side-chelek">
          <div className="sidebar-stat-label">
            <i className="fa fa-heart"></i>{this.props.track.likerIds.length} Likes
          </div>
          <TrackSidebar users={this.props.likers}/>
        </div>
      );
    }
  }

  const mapStateToProps = (state, ownProps) => {
    const ids = ownProps.track.likerIds.slice(0, 10);
    const likers = [];
    for ( let i = 0; i < ids.length; i++) {
      if (state.entities.users[ids[i]]) {
        likers.push(state.entities.users[ids[i]]);
      }
    }
    return {likers};
  };

  export default connect(mapStateToProps)(TrackLikers);
