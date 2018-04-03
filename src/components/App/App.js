import React, { Component } from 'react'
import styled from 'styled-components';

import Game from '../Game/Game'

const AppWrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
`

class App extends Component {

    render() {
        return (
            <AppWrapper className="app-wrapper">
                <Game />
            </AppWrapper>
        )
    }
}

export default App
