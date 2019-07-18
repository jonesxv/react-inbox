import React, { Component } from 'react';

class Toolbar extends Component {

  handleClick = () => {
    if (this.props.allSelected) {
      this.props.deselectAll()
    } else {
      this.props.selectAll()
    }
  }

  render() {
    const selectIcon = () => {
      if (this.props.allSelected) {
        return 'fa-check-square-o'
      } else if (this.props.someSelected) {
        return 'fa-minus-square-o'
      } else {
        return 'fa-square-o'
      }
    }
    return (
      <div className="row toolbar">
        <div className="col-md-12">
          <p className="pull-right">
            <span className="badge badge-pill badge-default">{this.props.unRead}</span>
            unread {this.props.unRead === 1 ? 'message' : 'messages'}
          </p>

          <a onClick={e => {
            e.preventDefault()
            this.props.updateSendMessage()
          }} href="" className="btn btn-danger">
            <i className="fa fa-plus"></i>
          </a>

          <button onClick={() => this.handleClick()} className="btn btn-default">
            <i className={`fa ${selectIcon()}`}></i>
          </button>

          <button onClick={() => this.props.markRead()} className="btn btn-default" disabled={!this.props.someSelected}>Mark As Read</button>

          <button onClick={() => this.props.markUnRead()} className="btn btn-default" disabled={!this.props.someSelected}>Mark As Unread</button>

          <select onChange={e => e.target.value.length > 0 && this.props.applyLabel(e.target.value)} className="form-control label-select" disabled={!this.props.someSelected}>
            <option value="">Apply label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <select onChange={e => e.target.value.length > 0 && this.props.removeLabel(e.target.value)} className="form-control label-select" disabled={!this.props.someSelected}>
            <option value="">Remove label</option>
            <option value="dev">dev</option>
            <option value="personal">personal</option>
            <option value="gschool">gschool</option>
          </select>

          <button onClick={() => this.props.deleteMessage()}className="btn btn-default" disabled={!this.props.someSelected}>
            <i className="fa fa-trash-o"></i>
          </button>
        </div>
      </div>
    );
  }
}

export default Toolbar;