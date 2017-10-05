
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Link, browserHistory } from 'react-router';

import { SortableContainer,
         SortableElement,
         SortableHandle,
         arrayMove } from 'react-sortable-hoc';
import { Button,
         FormControl,
         Grid,
         Col } from 'react-bootstrap';

import YouTube from 'react-youtube';

export default class Playlist extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        videos: [
          {title: "Robbaz Here",
            videoId: 'dmkpuK6ImWI'},
          {title: 'Best of the Worst: The Sweeper',
           videoId: 'kWKlmbTudD8'},
          {title: "the rising e1",
           videoId: 'A8NaIt6eFCk'},
          {title: "BotW Sequels",
           videoId: '9cNUg3XvVKk'},
        ],
        currentVid: 0,
        currentVideoId: 'dmkpuK6ImWI',
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
      this.addVideo = this.addVideo.bind(this);
    }

    updateCurrentVid() {
      let cVid = this.state.currentVid;
      let vidLength = this.state.videos.length - 1;
      let newVid = cVid + 1 > vidLength ? 0 : cVid += 1
      let currentVideoId = this.state.videos[newVid].videoId;
      this.setState({
        currentVid: newVid,
        currentVideoId: currentVideoId
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
      console.log(i);
      let currentVideoId = this.state.videos[i].videoId;

      this.setState({
        currentVid: i,
        currentVideoId: currentVideoId
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
      let currentVideoId = this.state.videos[preVid].videoId;
      this.setState({
        currentVid: preVid,
        currentVideoId: currentVideoId
      });
    }

    onSortEnd({oldIndex, newIndex}) {
      {/* Mimics onClick pretty well */}
      if (oldIndex === newIndex) return this.changeVideo(newIndex);

      {/* Maintains active video when moving items in list */}
      const currentVid = this.state.currentVid;
      if (oldIndex === currentVid) {this.setState({currentVid: newIndex})}

      const items = this.state.videos;
      {/* Allows for click and drag */}
      this.setState({videos: arrayMove(items, oldIndex, newIndex)});
     };

     addVideo(e) {
       console.log(e.target.value);
     }

    render() {
      let items = this.state.videos;

      const DragHandle = SortableHandle(() => <span>::</span>);

      const SortableItem = SortableElement(({idx, value}) => {
        let color = (idx % 2 === 0) ? 'grey' : 'white'
        let active;
        if (value.videoId === this.state.currentVideoId) {
          active = 'active-vid';
        }
        return(
          <div
            className={`playlist-el ${color} ${active}`}>
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
                idx={index}
                className='playlist-el' />
            ))}
          </div>
        );
      });

      const opts = { height: '390' };
        // width: '640'
      const {
        videos,
        vidId,
        videoId,
        currentVideoId
      } = this.state;
      let title = videos[this.state.currentVid].title;

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
        <div className='home-wrapper'>
          {/* Player */}
          <Col xs={12} md={7}>
          <div>
              <h3 className='title'>
                Currently Playing: {title}
              </h3>
                <div className='youtube-wrapper'>
                  <YouTube
                    videoId={currentVideoId}
                    onStateChange={(event) => stateChange(event)}
                    onReady={(event) => playVid(event)}
                    onEnd={() => updateCurrentVid()}/>
                </div>
          </div>
          </Col>

          {/* Playlist */}
          <Col xs={8} xsOffset={2} md={5} mdOffset={0}>
            <div className='play-controls'>

          <div className='playlist-wrapper'>
            <Col xs={5}>
              <h4 className='title'>
                PLAYLIST
              </h4>
            </Col>
            <Col xs={7}>
              <h4 className='title'>
                AUTOPLAY: Put Toggle here
              </h4>
              {/*onClick={() => autoplay()}*/}
            </Col>
            <Col xs={12}>
              <SortableList
                items={this.state.videos}
                onSortEnd={onSortEnd}
                lockAxis={'y'} />
            </Col>
            </div>
            <div className='controls'>
              <div className='controls-buttons'>
                <Button
                  onClick={() => controls('prev')}>
                  PREVIOUS
                </Button>
                <Button
                  onClick={() => shuffle()}>
                  SHUFFLE
                </Button>
                <Button
                  onClick={() => controls('next')}>
                  NEXT
                </Button>
              </div>
              <form>
                <FormControl
                  id="formControlsText"
                  type="text"
                  label="Text"
                  placeholder="Add a YouTube URL" />
                <Button type="submit">
                  SUBMIT
                </Button>
              </form>
            </div>
            </div>
      </Col>
      </div>
    )
  }
}
