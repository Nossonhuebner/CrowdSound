export const OPEN_PLAYBACK_BAR = "OPEN_PLAYBACK_BAR";

export const openPlaybackBar = (track) => {
  return {
    type: OPEN_PLAYBACK_BAR,
    track
  };
};
