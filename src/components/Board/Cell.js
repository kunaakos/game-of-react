import React, { PureComponent } from 'react';

class Cell extends PureComponent {
    render() {
        return (
            <div className={this.props.alive ? 'live cell' : 'cell'}/>
        )
    }
}

export default Cell
