import React from 'react';

export default class Card extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        const container = document.querySelector('.card-container');
    }

    render() {
        return <div className="card-container">this is a card component</div>
    }
}