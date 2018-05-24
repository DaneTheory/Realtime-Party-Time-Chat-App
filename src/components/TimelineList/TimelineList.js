import React, { Component } from 'react'
import ReactDOM from 'react-dom'

import ListItem from '../ListItem/ListItem'


export default class TimelineList extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div className="timeline__items">
        <ListItem { ...this.props } ref={(el) => { this.messagesEnd = el; }} />
        <div style={{ float:"left", clear: "both" }}
             ref={(el) => { this.messagesEnd = el; }}>
        </div>
      </div>
    )
  }

  scrollToBottom = () => {
      const node = ReactDOM.findDOMNode(this.messagesEnd);
      node.scrollIntoView({ behavior: "smooth" });
    }

    componentDidMount() {
      this.scrollToBottom();
    }

    componentDidUpdate() {
      this.scrollToBottom();
    }
}
