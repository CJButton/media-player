
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { SortableContainer,
         SortableElement,
         SortableHandle,
         arrayMove } from 'react-sortable-hoc';
import { Button } from 'react-bootstrap';

import YouTube from 'react-youtube';

export default class Playlist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        videos: [
          {title: 'Best of the Worst: The Sweeper',
           videoId: 'kWKlmbTudD8'},
          {title: "the rising e1",
           videoId: 'A8NaIt6eFCk'},
          {title: "Funhaus",
           videoId: 'lq_Nf2W86AM'},
          {title: "BotW Sequels",
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
      this.controls = this.controls.bind(this);
      this.onSortEnd = this.onSortEnd.bind(this);
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

    changeVideo(i) {
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
      {/* ???should shuffle update current video or start after finishing??? */}
      {/* Sattolo Algorithm */}
      let items = this.state.videos;
      for(let i = items.length - 1; i > 0; i -= 1 ) {
        let j = Math.floor(Math.random() * (i));
        let tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
      }
      this.setState({
        videos: items
      });
    }

    controls(dir) {
      if (dir === 'next') {return this.updateCurrentVid()}

      const cVid = this.state.currentVid;
      const vidLength = this.state.videos.length - 1;
      const preVid = (cVid - 1 < 0) ? vidLength : (cVid - 1)
      this.setState({
        currentVid: preVid
      });
    }

    onSortEnd({oldIndex, newIndex}) {
      {/* Allows for onClick */}
      if (oldIndex === newIndex) return this.changeVideo(newIndex);
      let items = this.state.videos;

      this.setState({
         videos: arrayMove(items, oldIndex, newIndex),
       });
     };

    render() {
      let items = this.state.videos;

      const DragHandle = SortableHandle(() => <span>::</span>);

      const SortableItem = SortableElement(({value}) => {
        return(
          <div
            className='playlist-el'>
            {value.title}
          </div>
        );
       }
      );

      const SortableList = SortableContainer(({items}) => {
        let vids = this.state.videos;
        return (
          <div>
            {Object.keys(items).map((value, index) => (
              <SortableItem
                key={index}
                index={index}
                value={vids[value]}
                className='playlist-el' />
            ))}
          </div>
        );
      });

      const opts = {
        height: '390',
        width: '640'};

      let vids = this.state.videos;
      let vidId = this.state.vidId;
      let activeVid = vids[this.state.currentVid].videoId;

      const {
        playVid,
        updateCurrentVid,
        stateChange,
        changeVideo,
        autoplay,
        shuffle,
        controls,
        onSortEnd
      } = this;

      return(
        <div>

          <div className='playlist-wrapper'>
            <SortableList
              items={this.state.videos}
              onSortEnd={onSortEnd}
              lockAxis={'y'} />
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
            <Button
              onClick={() => controls('prev')}>
              Previous
            </Button>
            <Button
              onClick={() => controls('next')}>
              Next
            </Button>
          </div>

          <YouTube
            videoId={activeVid}
            opts={opts}
            onStateChange={(event) => stateChange(event)}
            onReady={(event) => playVid(event)}
            onEnd={() => updateCurrentVid()}/>
        </div>
      )
    }
}
