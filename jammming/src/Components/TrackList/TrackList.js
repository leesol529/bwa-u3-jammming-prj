import React from 'react';
import Track from '../Track/Track.js';
import './TrackList.css';

export default class TrackList extends React.Component {
  render() {
    return (
      <div className="TrackList">
        {this.props.tracks.map(track =>{
          return <Track  key={track.ID}
                  track={track}
                  isRemoval = {this.props.isRemoval}
                  onAdd = {this.props.onAdd}
                  onRemove = {this.props.onRemove}/>
          })}

      </div>
    );
  }
}
