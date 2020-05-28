import React from 'react';
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
        ];

        this.state = {
            radialMenuConfig: {
                styleClass: 'circle',
                width: 600,
                toggle: true,
                centerTop: true,
                selectorStyle: {
                    showSelector: true,
                    width: 50,
                    styleClass: 'dot'
                }
            },
            itemsToTest: 6,
            radialMenuItems: this.testingItems.slice(0, 6)
        }
    }

    render() {
        return (
            <div>
                <TestSettings/>
                <RadialMenu radialMenuConfig = {this.state.radialMenuConfig} radialMenuItems = {this.state.radialMenuItems} />
            </div>
        );
    }
}

export default App;