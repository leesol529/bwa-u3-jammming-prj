import React from 'react';
import './Playlist.css'
import TrackList from '../TrackList/TrackList.js';

export class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={"New Playlist"}
               onChange = {(event) => this.handleNameChange(event)} />
        <TrackList tracks = {this.props.tracks}
                   onRemove = {this.props.onRemove}
                   isRemoval = {true}/>
        <a className="Playlist-save"
           href="localhost:3000"
           onClick = {this.props.onSave}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
}
