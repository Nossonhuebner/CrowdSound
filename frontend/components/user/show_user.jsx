import React from 'react';
import TrackItem from '../tracks/track_item';
import { fetchUser } from '../../actions/user_actions';



export default (props) => {
    const tracks = props.userTracks.map(track => (
      <TrackItem key={track.id} track={track}/>
    ));

    return (
      <div className="show-user-container">
        <div className="user-banner">
          <h1 className="show-username">{props.user.username}</h1>
          <img className="show-profile-pic"/>
        </div>
        
        <ul>
          {tracks}
        </ul>
      </div>

    );
  };
