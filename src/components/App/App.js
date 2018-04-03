import React, { Component } from 'react'
import styled from 'styled-components';

import Game from '../Game/Game'
import GitHubForkRibbon from 'react-github-fork-ribbon'

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
                <GitHubForkRibbon 
                    href="https://github.com/kunaakos/game-of-react"
                    target="_blank"
                    position="right"
                    color="black"
                >
                    Bork me on GitHub
                </GitHubForkRibbon>
            </AppWrapper>
        )
    }
}

export default App
