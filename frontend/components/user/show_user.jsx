import React from 'react';
import TrackItem from '../tracks/track_item';
import { fetchUser } from '../../actions/user_actions';



export default (props) => {
    const tracks = props.userTracks.map(track => (
      <TrackItem track={track}/>
    ));

    return (
      <div>
        <h1 className="test">{props.user.username}</h1>
        <ul>
          {tracks}
        </ul>
      </div>

    );
  };
