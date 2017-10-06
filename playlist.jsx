
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
          {title: "Sonic the Hedgehog 2 Full Soundtrack",
            videoId: 'YKuPQzhk8rY'},
          {title: 'The Legend of Zelda Ocarina of Time Soundtrack',
           videoId: 'ZzwvItK3JPI'},
          {title: "Stardew Valley Complete Soundtrack",
           videoId: 'sfATf-aMvbA'},
          {title: "Ori and the Blind Forest - Official Soundtrack Full Album",
           videoId: 'MkzeOmkOUHM'},
           {title: "Deus Ex: Human Revolution Soundtrack (Full)",
           videoId: "tyG6YMLEWus"},
           {title: "Super Mario Bros. Original Theme by Nintendo",
           videoId: "uhscMsBhNhw"},
           {title: "Full Super Mario Bros. 1-3 Soundtracks",
           videoId: "SB1VqLCTFpA"},
           {title: "Full Super Mario 64 OST",
           videoId: "kgVUipXiqOc"}
        ],
        currentVid: 0,
        currentVideoId: 'YKuPQzhk8rY',
        autoplay: true
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
      {/* This function fires after a video is finished and autoplay is true.
          It will play the next video, and if at the end, will loop. */}
      {/* この関数はビデオを見終わると次のビデオを自動再生します。最後のビデオだったら、最初のビデオに戻ります。 */}
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
    {/* YouTube's API has a built-in playVideo function */}
    {/* YouTube'sのAPIにはplayVideoの関数があります。これでビデオは始められます。 */}
     event.target.playVideo();
    }

    stateChange(event) {
      {/* YouTube's module will emit these events on each change. */}
      {/* YouTubeのモジュールが変わる度に、このイベントが起こります */}
      {/*
        -1 (unstarted)
        0 (ended)
        1 (playing)
        2 (paused)
        3 (buffering)
        5 (video cued).
        */}
      if (this.state.autoplay && event.data === 5) {
        this.playVid(event);
      }
    }

    changeVideo(i) {
      let currentVideoId = this.state.videos[i].videoId;

      this.setState({
        currentVid: i,
        currentVideoId: currentVideoId
      });
    }

    autoplay() {
      let newState = this.state.autoplay === true ? false : true
      this.setState({autoplay: newState});
    }

    shuffle() {
      {/* Sattolo Algorithm */}
      {/* Big O(n) 複雑さ */}
      let items = this.state.videos;
      for(let i = items.length - 1; i > 0; i -= 1 ) {
        let j = Math.floor(Math.random() * (i));
        let tmp = items[i];
        items[i] = items[j];
        items[j] = tmp;
      }

      {/* Maintains current video after shuffle and continues on to the SHUFFLED next video */}
      {/* シャッフルした後にnextボタンを押しても、再生されるビデオは一つ下のビデオになります。 */}
      let updatedIdx;
      items.map((vid, i) => {
        if (vid.videoId === this.state.currentVideoId) {
          return updatedIdx = i;
        }
      });

      this.setState({
        videos: items,
        currentVid: updatedIdx
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
      {/* After a selection is moved, the old index and new index are passed here */}
      {/* 選択されたビデオが動かされた後、前回のindexと新たなindexが渡されました*/}

      {/* Mimics onClick */}
      {/* onClickの関数を真似ます。*/}
      if (oldIndex === newIndex) return this.changeVideo(newIndex);

      {/* Maintains active video when moving items in list */}
      {/* リストを動かしても、見ているビデオは変わりません。*/}
      let currentVid = this.state.currentVid;
      if (oldIndex === currentVid) {
        this.setState({currentVid: newIndex});
      } else if (oldIndex < currentVid && newIndex >= currentVid) {
        currentVid: currentVid -= 1
      }
      const items = this.state.videos;
      {/* Using the array of items, and the old and new indexes, the local State
        will be updated with the new ordering */}
      {/* ビデオの配列と、前回のindexと、新たなindexによって、ステートが更新されます。 */}
      this.setState({
        videos: arrayMove(items, oldIndex, newIndex),
        currentVid: currentVid});
     };

    render() {
      let items = this.state.videos;

      const SortableItem = SortableElement(({idx, value}) => {
        let active;
        if (value.videoId === this.state.currentVideoId) {
          active = 'active-vid';
        }
        {/* Videos chosen by the user are highlighted with active */}
        {/* 選択されたビデオは赤で強調表示されました。 */}
        return(
          <div
            className={`playlist-el white ${active}`}>
            {value.title}
          </div>
        );
       }
      );

      const SortableList = SortableContainer(({items}) => {
        let vids = this.state.videos;
        {/* Each item in the playlist (in state) is  iterated over and passed to SortableItem */}
        {/* プレイリストの中の曲は（ステートに）、反復処理して SortableItem に渡されました。 */}
        return (
          <div className='sortableList'>
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

      const {
        videos,
        vidId,
        videoId,
        currentVideoId
      } = this.state;

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

      let autoplayStatus = this.state.autoplay === false ? 'OFF' : 'ON'

      return(
        <div className='home-wrapper'>
          <div className='instructions'>
            <h3>Click and Drag Titles</h3>
            <h3>ビデオのタイトルをクリック&ドラッグして好きな順番に変えられます</h3>
          </div>
          {/* YouTube Player */}
          <Col xs={12} md={7}>
            <div className='youtube-wrapper'>
              <YouTube
                videoId={currentVideoId}
                onStateChange={(event) => stateChange(event)}
                onReady={(event) => playVid(event)}
                onEnd={() => updateCurrentVid()}/>
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
            <Col xs={6}>
              <div className='autoplay-wrapper'>
                <h4 className='title'>
                  AUTOPLAY:
                </h4>
                <Button
                  onClick={() => this.autoplay()}
                  id={autoplayStatus}>
                  {autoplayStatus}
                </Button>
              </div>
            </Col>
            <Col xs={12}>
              {/* Personalized shuffle list */}
              {/* ビデオプレイヤーのリスナにとって望ましいシャッフルを実現 */}
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
            </div>
            </div>
        </Col>
      </div>
    )
  }
}
