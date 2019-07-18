import React from 'react';
import './App.css';
import Toolbar from './Components/Toolbar';
import Messages from './Components/Messages';
import Compose from "./Components/Compose";
import fetch from 'node-fetch';
import request from 'request';

const url = 'http://localhost:8082/api/messages/'

class App extends React.Component {
  state = {
    messages: [],
    sendMessage: 'hide'
  }

  toggleCheck = (value, id) => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        if (message.id === id) {
          return {
            ...message,
            selected: value
          }
        } else {
          return message
        }
      }) };
    });
  }

  toggleStar = id => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        if (message.id === id) {
          return {
            ...message,
            starred: !message.starred
          }
        } else {
          return message
        }
      }) };
    });
  }

  selectAll = () => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        return {
          ...message,
          selected: true
        }
      }) };
    });
  }

  deselectAll = () => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        return {
          ...message,
          selected: false
        }
      }) };
    });
  }

  markRead = () => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        if (message.selected) {
          return {
            ...message,
            read: true
          }
        } else {
          return message
        }
      }) };
    });
  }

  markUnRead = () => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        if (message.selected) {
          return {
            ...message,
            read: false
          }
        } else {
          return message
        }
      }) };
    });
  }

  applyLabel = label => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        if (message.selected) {
          return {
            ...message,
            labels: message.labels.indexOf(label) === -1 ? [...message.labels, label] : message.labels
          }
        } else {
          return message
        }
      }) };
    });
  }

  removeLabel = label => {
    this.setState(prevState => {
      return { messages: prevState.messages.map(message => {
        if (message.selected) {
          return {
            ...message,
            labels: message.labels.filter(item => {
              return item !== label
            })
          }
        } else {
          return message
        }
      }) };
    });
  }

  deleteMessage = id => {
    this.setState(prevState => {
      return { messages: prevState.messages.filter(message => {
        return message.id !== id
      }) };
    });
  }

  updateSendMessage = () => {
    this.setState(prevState => {
      return {
        sendMessage: prevState.sendMessage === 'hide' ? 'show' : 'hide'
      }
    })
  }

  sendMessage = (subject, body) => {
    var options = { 
      method: 'POST',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        'User-Agent': 'PostmanRuntime/7.13.0',
        'Content-Type': 'application/json' },
      body: { subject: subject, body: body },
      json: true 
    };

    request(options, function (error, response, body) {
      if (error) throw new Error(error);
      console.log(body)
    });
  }

  async componentDidMount() {
    const data = await fetch('http://localhost:8082/api/messages')
    const res = await data.json()
    this.setState({ 
      messages: res.map(message => {
        return {
          ...message,
          selected: false
        }
      })
    });
  }
  
  render() {
    const someSelected = this.state.messages.some(message => {
      return message.selected
    })
    const allSelected = this.state.messages.every(message => {
      return message.selected
    })

    const unRead = this.state.messages.reduce((sum, message) => {
      return !message.read ? sum + 1 : sum
    }, 0)

    return (
      <div className="App container">
        <Toolbar 
          deselectAll={this.deselectAll}
          selectAll={this.selectAll}
          someSelected={someSelected}
          allSelected={allSelected}
          markRead={this.markRead}
          markUnRead={this.markUnRead}
          applyLabel={this.applyLabel}
          removeLabel={this.removeLabel}
          deleteMessage={this.deleteMessage}
          unRead={unRead}
          updateSendMessage={this.updateSendMessage}
          />
        <Compose
          sendMessage={this.state.sendMessage}
          handleSubmit={this.sendMessage} />
        <Messages toggleStar={this.toggleStar} toggleCheck={this.toggleCheck} messages={this.state.messages} />
      </div>
    );
  }
}

export default App;
