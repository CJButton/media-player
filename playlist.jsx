
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import YouTube from 'react-youtube';

export default class Playlist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        videos: [
          {title: 'Best of the Worst: The Sweeper, Empire of the Dark, and Mad Foxes',
           videoId: 'kWKlmbTudD8'},
          {title: "Bumbling Through The Ring: Terror's Realm p.1",
           videoId: 'A8NaIt6eFCk'},
        ],
        currentVid: 1,
        autoplay: true
      }
      this.updateCurrentVid = this.updateCurrentVid.bind(this);
      this.playVid = this.playVid.bind(this);
      this.pauseVid = this.pauseVid.bind(this);
      this.stateChange = this.stateChange.bind(this);
    }

    updateCurrentVid() {
      let cVid = this.state.currentVid;
      let vidLength = this.state.videos.length - 1;
      let newVid = cVid + 1 > vidLength ? 0 : cVid += 1
      this.setState({
        currentVid: newVid
      });
    }

    playVid(event) {
      {/* autoplay */}
     event.target.playVideo();
    }

    pauseVid(event) {
      event.target.pauseVideo();
    }

    stateChange(event) {
      console.log(event.data);
      //  -1 (unstarted)
      //   0 (ended)
      //   1 (playing)
      //   2 (paused)
      //   3 (buffering)
      //   5 (video cued).
      if (event.data === 5) {
        this.playVid(event);
      }
    }


    render() {
      const opts = {
        height: '390',
        width: '640'};

      let vids = this.state.videos;
      let activeVid = vids[this.state.currentVid].videoId;

      // const playVid = this.playVid;
      // const updateCurrentVid = this.updateCurrentVid;
      // const stateChange = this.stateChange;

      return(
        <div>
          <YouTube
            videoId={activeVid}
            opts={opts}
            onStateChange={(event) => this.stateChange(event)}
            onPause={(event) => this.pauseVid(event)}
            onReady={(event) => this.playVid(event)}
            onEnd={() => this.updateCurrentVid()}/>
          <div className='playlist-wrapper'>
            {vids.map((vid, i) => {
              return(
                <div
                  key={i}
                  className='playlist-el'
                  onClick={() => changeVideo(vid)}>
                  {vid.title}
                </div>
              )
            })}
          </div>
        </div>
      )
    }
}
