
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { Button } from 'react-bootstrap';

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
      this.stateChange = this.stateChange.bind(this);
      this.changeVideo = this.changeVideo.bind(this);
      this.shuffle = this.shuffle.bind(this);
      this.autoplay = this.autoplay.bind(this);
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
     event.target.playVideo();
    }

    stateChange(event) {
      // console.log(event.data);
      //  -1 (unstarted)
      //   0 (ended)
      //   1 (playing)
      //   2 (paused)
      //   3 (buffering)
      //   5 (video cued).
      {/* autoplay - play if cued up and autoplay is on */}
      if (this.state.autoplay && event.data === 5) {
        this.playVid(event);
      }
    }

    changeVideo(vid, i) {
      this.setState({
        currentVid: i
      });
    }

    autoplay() {
      let newState = this.state.autoplay === true ? false : true
      this.setState({
        autoplay: newState
      });
    }

    shuffle() {
      // keep complexity down to a O(n)
    }

    render() {
      const opts = {
        height: '390',
        width: '640'};

      let vids = this.state.videos;
      let activeVid = vids[this.state.currentVid].videoId;

      const {
        playVid,
        updateCurrentVid,
        stateChange,
        changeVideo,
        autoplay,
        shuffle
      } = this;

      return(
        <div>
          <YouTube
            videoId={activeVid}
            opts={opts}
            onStateChange={(event) => stateChange(event)}
            onReady={(event) => playVid(event)}
            onEnd={() => updateCurrentVid()}/>
          <div className='playlist-wrapper'>
            {vids.map((vid, i) => {
              return(
                <div
                  key={i}
                  className='playlist-el'
                  onClick={() => changeVideo(vid, i)}>
                  {vid.title}
                </div>
              )
            })}
          </div>
          <div>
            <Button
              onClick={() => shuffle()}>
              Shuffle
            </Button>
            <Button
              onClick={() => autoplay()}>
              Autoplay
            </Button>
            <Button>
              Previous
            </Button>
            <Button>
              Next
            </Button>
          </div>
        </div>
      )
    }
}
