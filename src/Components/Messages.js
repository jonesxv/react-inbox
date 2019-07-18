import React, { Component } from 'react';
import Message from "./Message";

class Messages extends Component {
  render() {
    const messages = this.props.messages.map(message => {
      return <Message toggleStar={this.props.toggleStar} toggleCheck={this.props.toggleCheck} key={message.id} {...message} />
    })
    return (
      <div>
        {messages}
      </div>
    );
  }
}

export default Messages;