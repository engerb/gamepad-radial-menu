import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TestSettings from './components/TestSettings';
import RadialMenu from './components/RadialMenu';


class App extends React.Component {
    constructor() {
        super();

        this.testingItems = [
            {
                name: 'On delivery',
                icon: 'onDelivery.png'
            },
            {
                name: 'Hello!',
                icon: 'hello.png'
            },
            {
                name: 'Right turn',
                icon: 'turnRight.png'
            },
            {
                name: 'Opps!',
                icon: 'oops.png'
            },
            {
                name: 'All off',
                icon: 'none.png'
            },
            {
                name: 'Crossing',
                icon: 'crossing.png'
            },
            {
                name: 'Left turn',
                icon: 'turnLeft.png'
            },
            {
                name: 'Excuse me',
                icon: 'excuseMe.png'
            },
            {
                name: 'Claxon',
                icon: 'claxon.png'
            },
            {
                name: 'Wink',
                icon: 'wink.png'
            }
        ];

        // This would be inside RadialMenu, is only here for easy config for user testing
        this.state = {
            radialMenuConfig: {
                testOpen: false,

                toggle: false,
                deadZone: 0.0,
                selectionRadius: 0.3,
                
                width: 600,
                degSpace: 0.5,
                selectTime: 400,
                strokeWidth: 100,
                centerTop: true,
                labels: 'inside',
                styleClass: 'circle',
                
                hoverColor: 'rgba(255, 255, 255, 0.849)',
                inactiveColor: 'rgba(0, 0, 0, 0.575)',
                selectionColor: 'rgb(0, 162, 255)',
                hoverSelectionColor: 'rgb(106, 200, 255)',

                labelHoverColor: '#grey',
                labelInactiveColor: '#red',
                labelSelectionColor: '#blue',
                
                selectorStyle: {
                    width: 10,
                    styleClass: 'dot',
                    showSelector: true,
                }
            },
            itemCount: 8,
            radialMenuItems: this.testingItems.slice(0, 6),
            activeButton: 13
        }

        this.menuTestOpen = open => this.setState({testOpen: open});
        this.itemCountCallback = itemCount => this.setState({radialMenuItems: this.testingItems.slice(0, itemCount)});
        this.activeButtonCallback = activeButton => this.setState({activeButton: activeButton});
        this.radialMenuConfigCallback = radialMenuConfig => this.setState({radialMenuConfig: radialMenuConfig});
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path='/bar'>
                        <h1>It's a cool flat menu!</h1>
                    </Route>
                    <Route path='/'>
                        <RadialMenu 
                            radialMenuConfig = {this.state.radialMenuConfig} 
                            radialMenuItems = {this.state.radialMenuItems} 
                            activeButton = {this.state.activeButton}
                            testOpen = {this.state.testOpen}
                        />
                    </Route>
                </Switch>
                
                
                <TestSettings 
                    radialMenuConfig = {this.state.radialMenuConfig} 
                    itemCount = {this.state.itemCount} 
                    activeButton = {this.state.activeButton}
                    menuTestOpen = {this.menuTestOpen}
                    itemCountCallback = {this.itemCountCallback} 
                    activeButtonCallback = {this.activeButtonCallback} 
                    radialMenuConfigCallback = {this.radialMenuConfigCallback}
                />
            </Router>
        );
    }
}

export default App;