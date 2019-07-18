import React, { Component } from 'react';

class Compose extends Component {
  state = {
    subject: '',
    body: ''
  }
  render() {
    return (
      <form onSubmit={e => {
        e.preventDefault()
        this.props.handleSubmit(this.state.subject, this.state.body)
      }} className={`form-horizontal well ${this.props.sendMessage}`}>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="subject" className="col-sm-2 control-label">Subject</label>
          <div className="col-sm-8">
            <input onChange={e => this.setState({subject: e.target.value})} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="body" className="col-sm-2 control-label">Body</label>
          <div className="col-sm-8">
            <textarea onChange={e => this.setState({body: e.target.value})} name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-8 col-sm-offset-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>
    );
  }
}

export default Compose;