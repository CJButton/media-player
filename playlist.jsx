
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import MPlayer from './mplayer';

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
        currentVid: 1
      }
      this.updateCurrentVid = this.updateCurrentVid.bind(this);
    }

    updateCurrentVid() {
      let cVid = this.state.currentVid;
      let vidLength = this.state.videos.length - 1;
      let newVid = cVid + 1 > vidLength ? 0 : cVid += 1
      this.setState({
        currentVid: newVid
      });
    }


    render() {
      let vids = this.state.videos;
      let currentVid = this.state.videos[this.state.currentVid].videoId;

      const updateCurrentVid = this.updateCurrentVid;
      const changeVideo = this.props.changeVideo;

      return(
        <div>
          <MPlayer
            currentVid={currentVid}
            updateCurrentVid={updateCurrentVid}/>
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
