import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import TestSettings from './components/TestSettings';
import RadialMenu from './components/RadialMenu';


class App extends React.Component {
    constructor() {
        super();

        this.testingItems = [
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            },
            {
                name: 'hello',
                icon: 'hello.png'
            }
        ];

        // This would be inside RadialMenu, is only here for easy config for user testing
        this.state = {
            radialMenuConfig: {
                styleClass: 'circle',
                width: 600,
                selectionRadius: 0.5, // 0-1
                toggle: true,
                centerTop: true,
                strokeWidth: 100,
                degSpace: 0.5,
                selectTime: 400,
                labels: 'inside',
                selectorStyle: {
                    showSelector: true,
                    width: 10,
                    styleClass: 'dot'
                }
            },
            itemCount: 6,
            radialMenuItems: this.testingItems.slice(0, 6),
            activeButton: 13,
            // menuOpen: true
        }

        // this.menuToggleCallback = () => ({this.setState({menuOpen: !this.state.menuOpen}); console.log(this.state.menuOpen)});//this.setState({menuOpen: !this.state.menuOpen});
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
                            // menuOpen = {this.state.menuOpen}
                        />
                    </Route>
                </Switch>
                
                
                <TestSettings 
                    radialMenuConfig = {this.state.radialMenuConfig} 
                    itemCount = {this.state.itemCount} 
                    activeButton = {this.state.activeButton}
                    // menuToggleCallback = {this.menuToggleCallback}
                    itemCountCallback = {this.itemCountCallback} 
                    activeButtonCallback = {this.activeButtonCallback} 
                    radialMenuConfigCallback = {this.radialMenuConfigCallback}
                />
            </Router>
        );
    }
}

export default App;