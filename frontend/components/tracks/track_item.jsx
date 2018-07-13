import React from 'react';

export default ({track, deleteTrack}) => {
  return(
    <li className="single-track">
      <div>{track.title}</div>
      <audio controls>
        <source src={track.fileUrl} type="audio/mpeg"/>
      </audio>
      <button onClick={() => deleteTrack(track.id)}>Delete Track</button>
    </li>
  ) ;
};
