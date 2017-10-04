
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
          {title: '1',
           videoId: 'kWKlmbTudD8'},
          {title: "2",
           videoId: 'A8NaIt6eFCk'},
          {title: "3",
           videoId: 'lq_Nf2W86AM'},
          {title: "4",
           videoId: '9cNUg3XvVKk'},
        ],
        currentVid: 0,
        autoplay: false
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
    //  event.target.playVideo();
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
      // const playLength = this.state.videos.length;
      // let shuffledVids = [];
      // let videoInts = [];
      // for (var i = 0; i <= playLength - 1; i++) {videoInts.push(i);}
      // how to prevent a video from being in the same spot after shuffling?
      // while (videoInts.length > 0) {
      //   let randNum = Math.floor(Math.random() * videoInts.length);
      //   shuffledVids.push(this.state.videos[randNum]);
      //   videoInts.splice(randNum, 1);
      // }

      {/* Sattolo Algorithm */}
      let items = this.state.videos
      // let items = [1, 2, 3, 4];
      for(let i = items.length - 1; i > 0; i -= 0 ) {
        let j = Math.floor(Math.random() * (i + 1));
        let tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
      }

      // console.log(items);

      // need a function to check the values are not identical
      // if (shuffledVids === this.state.videos) {
      //   this.shuffle();
      // }
      //
      this.setState({
        videos: items
      });

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
