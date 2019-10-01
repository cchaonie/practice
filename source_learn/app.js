class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
  }

  render() {
    const { count } = this.state;
    return [
      React.createElement(
        'button',
        {
          key: 1,
          onClick: () => this.setState({ count: count + 1 })
        },
        'click me'
      ),
      React.createElement(
        'span',
        {
          key: 2,
          children: count
        },
      ),
    ]
  }
}

ReactDOM.render(React.createElement(LikeButton), document.getElementById('root'));

setTimeout(() => document.createElement('div'))