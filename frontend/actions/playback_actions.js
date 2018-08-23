export const OPEN_PLAYBACK_BAR = "OPEN_PLAYBACK_BAR";
export const NEXT_TRACK = "NEXT_TRACK";
export const PREV_TRACK = "PREV_TRACK";

export const openPlaybackBar = ({track}) => {
  return {
    type: OPEN_PLAYBACK_BAR,
    track
  };
};

export const nextTrack = () => ({
  type: NEXT_TRACK
})

export const prevTrack = () => ({
  type: PREV_TRACK
})
