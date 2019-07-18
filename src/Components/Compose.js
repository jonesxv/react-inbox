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
      }} className={`p-3 well ${this.props.sendMessage}`}>
        <div className="form-group">
          <div className="col-8 offset-sm-2">
            <h4>Compose Message</h4>
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="subject" className="col-2 col-form-label text-right">Subject</label>
          <div className="col-8">
            <input onChange={e => this.setState({subject: e.target.value})} type="text" className="form-control" id="subject" placeholder="Enter a subject" name="subject" />
          </div>
        </div>
        <div className="form-group row">
          <label htmlFor="body" className="col-2 col-form-label text-right">Body</label>
          <div className="col-8">
            <textarea onChange={e => this.setState({body: e.target.value})} name="body" id="body" className="form-control"></textarea>
          </div>
        </div>
        <div className="form-group">
          <div className="col-8 offset-sm-2">
            <input type="submit" value="Send" className="btn btn-primary" />
          </div>
        </div>
      </form>
    );
  }
}

export default Compose;