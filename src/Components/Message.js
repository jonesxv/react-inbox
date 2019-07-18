import React, { Component } from 'react';

class Message extends Component {
  render() {
    const read = this.props.read ? 'read' : 'unread'
    const starred = this.props.starred ? 'fa-star': 'fa-star-o'
    const selected = this.props.selected && 'selected'
    const labels = this.props.labels.map((label, key) => {
      return <span key={key} className="label label-warning">{label}</span>
    })
    return (
      <div className={`row message ${read} ${selected}`}>
        <div className="col-1">
          <div className="row">
            <div className="col-2">
              <input type="checkbox" checked={this.props.selected} onChange={e => this.props.toggleCheck(e.target.checked, this.props.id)}/>
            </div>

            <div className="col-2">
              <i onClick={()  => this.props.toggleStar(this.props.id)} className={`star fa ${starred}`}></i>
            </div>
          </div>
        </div>

        <div className="col-11">
          {labels}
          <span>{this.props.subject}</span>
        </div>
      </div>
    );
  }
}

export default Message;