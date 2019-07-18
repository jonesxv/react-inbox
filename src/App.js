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
    var options = { 
      method: 'PATCH',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        
        'Content-Type': 'application/json' },
      body: { command: 'star', messageIds: [id] },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
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
    const selected = this.state.messages.filter(message => {
      return message.selected
    }).map(message => message.id)
    console.log(selected)
    var options = { 
      method: 'PATCH',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        
        'Content-Type': 'application/json' },
      body: { command: 'read', read: true, messageIds: selected },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      console.log(body)
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
    });
  }

  markUnRead = () => {
    const selected = this.state.messages.filter(message => {
      return message.selected
    }).map(message => message.id)
    console.log(selected)
    var options = { 
      method: 'PATCH',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        
        'Content-Type': 'application/json' },
      body: { command: 'read', read: false, messageIds: selected },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
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
    });
  }

  applyLabel = label => {
    const selected = this.state.messages.filter(message => {
      return message.selected
    }).map(message => message.id)
    console.log(selected)
    var options = { 
      method: 'PATCH',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        
        'Content-Type': 'application/json' },
      body: { command: 'addLabel', label: label, messageIds: selected },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
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
    });
  }

  removeLabel = label => {
    const selected = this.state.messages.filter(message => {
      return message.selected
    }).map(message => message.id)
    console.log(selected)
    var options = { 
      method: 'PATCH',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        
        'Content-Type': 'application/json' },
      body: { command: 'removeLabel', label: label, messageIds: selected },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
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
    });

  }

  deleteMessage = () => {
    const selected = this.state.messages.filter(message => {
      return message.selected
    }).map(message => message.id)
    var options = { 
      method: 'PATCH',
      url: url,
      headers: { 
        'cache-control': 'no-cache',
        Connection: 'keep-alive',
        'content-length': '44',
        'accept-encoding': 'gzip, deflate',
        Host: 'localhost:8082',
        'Cache-Control': 'no-cache',
        Accept: '*/*',
        
        'Content-Type': 'application/json' },
      body: { command: 'delete', messageIds: selected },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      this.setState(prevState => {
        return { messages: prevState.messages.filter(message => {
          return !selected.includes(message.id)
        }) };
      });
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
        'Content-Type': 'application/json' },
      body: { subject: subject, body: body },
      json: true 
    };

    request(options, (error, response, body) => {
      if (error) throw new Error(error);
      this.setState(prevState => {
        return { messages: [...prevState.messages, {...body, selected: false} ] };
      });
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
