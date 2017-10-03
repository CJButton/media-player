

import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import YouTube from 'react-youtube';

// import basic playlist from a js object file
// pass it down to the playlist
// pass down a function to change videos with an onclick handler

export default class MPlayer extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        currentVid: this.props.currentVid
      }
      this.changeVideo = this.changeVideo.bind(this);
      this.playVid = this.playVid.bind(this);
    }

    changeVideo(videoId) {
      this.setState({
        currentVid: videoId
      });
    }

    componentWillUpdate(nextProps) {
      this.setState({
        currentVid: nextProps.currentVid
      });
    }

    playVid(event) {
      {/* autoplay */}
    //  console.log(event.target);
     event.target.playVideo();
    }

    render() {
      let activeVid = this.state.currentVid;
      const changeVideo = this.changeVideo;
      const playVid = this.playVid;
      const updateCurrentVid = this.props.updateCurrentVid;

      const opts = {
        height: '390',
        width: '640'};
      return(
        <div>
          <YouTube
            playVid={playVid}
            videoId={activeVid}
            opts={opts}
            onReady={(event) => playVid(event)}
            onEnd={(event) => updateCurrentVid(event)}
            />
        </div>
      )
    }
}
