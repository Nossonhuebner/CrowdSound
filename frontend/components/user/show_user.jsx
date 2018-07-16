import React from 'react';
import TrackItem from '../tracks/track_item';
import { fetchUser } from '../../actions/user_actions';
import UserDetail from './user_detail';


export default (props) => {
    const tracks = props.userTracks.map(track => (
      <TrackItem key={track.id} track={track}/>
    ));

    return (
      <div className="show-user-container">
        <UserDetail user={props.user}/>
        <ul>
          {tracks}
        </ul>
      </div>

    );
  };
