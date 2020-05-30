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
                selectorStyle: {
                    showSelector: true,
                    width: 10,
                    styleClass: 'dot'
                }
            },
            itemCount: 6,
            radialMenuItems: this.testingItems.slice(0, 6)
        }

        this.itemCountCallback = itemCount => this.setState({radialMenuItems: this.testingItems.slice(0, itemCount)});
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
                        <RadialMenu radialMenuConfig = {this.state.radialMenuConfig} radialMenuItems = {this.state.radialMenuItems} />
                    </Route>
                </Switch>
                
                
                <TestSettings 
                    radialMenuConfig = {this.state.radialMenuConfig} 
                    itemCount = {this.state.itemCount} 
                    itemCountCallback = {this.itemCountCallback} 
                    radialMenuConfigCallback = {this.radialMenuConfigCallback}
                />
            </Router>
        );
    }
}

export default App;