# README
http://crowd-sound.herokuapp.com

CrowdSound is a SoundCloud inspired webapp. Users can upload music of their own, as well as listen to and comment on other artists' tracks.

The backend framework implements Ruby on Rails, with a combination of ActiveStorage and AWS cloud storage to manage user uploads. The frontend uses React.js and Redux to handle state.

## Custom Playback Bar / Continuous play
Since the HTML5 audio tag is largely uncustomizable, I set out to make an audio component that would give me the look and utility I was looking for. There were three main goals: 
* A stylable volume / audio bar
* The ability to skip throughout the track with the mouse
* A queue of tracks that had already been played, and ones coming up

I accomplished the first two by find the length of the track and calculating the percentage of the track duration. There is one `<div>` element that represents the total track length, and a second one overlaying it to represent the progress. To skip around in the song, I found the mouseX end subtracted the width of all elements on the side of the `<div>`, giving me the relative mouseX. From there it was just a matter of making a similar calculation of the track's ellapsed time.
```javascript
  //audio_player.jsx
  
  clickSeek(e) {
    let element = e.currentTarget;
    let offsetX = 0;
    let mouseX;
    while (element.offsetParent) {
      offsetX += element.offsetLeft;
      element = element.offsetParent;
    }
    mouseX = e.pageX - offsetX;

    const newPercentage = mouseX / e.currentTarget.offsetWidth;
    const duration = this.audioRef.current.duration;
    this.audioRef.current.currentTime = duration * newPercentage;
  }
```
<br/>
For the continuous play, I created a separate slice of state to be the queue which was an array of track id's referencing tracks in the tracks slice of state. I simply keep track of the current index in the queue, and when you hit back / next it increments / decrements.

```javascript
// playback_reducer.js

    case NEXT_TRACK:
      let idx;
      let nextId;
      if (state.queueIdx >= state.queue.length-1) { 
      // checks that new queue is not shorter than old queue
        idx = 0;
        nextId = state.queue[0];
      } else {
        idx = state.queueIdx + 1;
        nextId = state.queue[idx];
      }
      return {queueIdx: idx, queue: state.queue, playingId: nextId};
    case PREV_TRACK:
      if (state.queueIdx === 0) {
        return state;
      }
        const prev = state.queue[state.queueIdx-1] ? state.queue[state.queueIdx-1] : state.queue[state.queueIdx-1];
        // checks that current queue length is not less than that of playing track
        return {queueIdx: state.queueIdx-1, queue: state.queue, playingId: prev};
    default:
      return state;
```


## Search Bar
One of my latest features is the live search bar. Search results update as you type, and artists and tracks are displayed separately. This was accomplished by updating the 'Search' slice of state, allowing the component to re-render as results become available, even when backspacing.
##### Live Search Demo:
![search_demo](https://i.imgur.com/SbF5U5y.gif)


## Signed in Features
Users can author comments on tracks, but they cannot be published unless the user is signed in. Similarly, once they are signed in they are able to like tracks, repost tracks, follow artists. They can also update their profile pic and delete tracks they have uploaded or comments they have written. 
<br/>
(For security, only salted hashes of the passwords are stored in the database)
##### Feature Demo:
![feature_demo](https://i.imgur.com/i9RUvHy.gif)



## Features Currently in progress: 
* Sidebar for user and track pages
* Trending / Top 50 feature
* Soundwave form for tracks
