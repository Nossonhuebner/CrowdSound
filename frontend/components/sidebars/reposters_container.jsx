import React from 'react';
import TrackSidebar from './track_sidebar';
import { connect } from 'react-redux';

class TrackReposters extends React.Component {

  render() {
    if (!this.props.reposters) return "";
    return (
      <div className="side-chelek">
        <div className="sidebar-stat-label">
          <i className="fa fa-retweet"></i>{this.props.track.reposterIds.length}  Reposts
        </div>
        <TrackSidebar users={this.props.reposters}/>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const ids = ownProps.track.reposterIds ? ownProps.track.reposterIds.slice(0, 10) : [];
  const reposters = [];
  for ( let i = 0; i < ids.length; i++) {
    if (state.entities.users[ids[i]]) {
      reposters.push(state.entities.users[ids[i]]);
    }
  }
  return {reposters};
};

export default connect(mapStateToProps)(TrackReposters);
