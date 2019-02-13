import React from 'react';
import './Track.css';

export default class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  renderAction() {
    if (this.props.isRemoval) {
      return <a className="Track-action" href="localhost:3000" onClick = {this.removeTrack}> - </a>
    } else {
      return <a className="Track-action" href="localhost:3000" onClick = {this.addTrack}> + </a>
    }
  }

  addTrack() {
    this.props.onAdd(this.props.track);
    console.log(this.props.track)  
  }

  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.track.Name}</h3>
          <p>{this.props.track.Artist} | {this.props.track.Album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}
