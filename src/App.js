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
                iconWhite: require('./assets/img/icons/onDelivery_white.png').default,
                iconBlack: require('./assets/img/icons/onDelivery_black.png').default,
            },
            {
                name: 'Hello!',
                iconWhite: require('./assets/img/icons/hello_white.png').default,
                iconBlack: require('./assets/img/icons/hello_black.png').default,
            },
            {
                name: 'Right turn',
                iconWhite: require('./assets/img/icons/turnRight_white.png').default,
                iconBlack: require('./assets/img/icons/turnRight_black.png').default,
            },
            {
                name: 'Opps!',
                iconWhite: require('./assets/img/icons/oops_white.png').default,
                iconBlack: require('./assets/img/icons/oops_black.png').default,
            },
            {
                name: 'All off',
                iconWhite: require('./assets/img/icons/none_white.png').default,
                iconBlack: require('./assets/img/icons/none_black.png').default,
            },
            {
                name: 'Crossing',
                iconWhite: require('./assets/img/icons/crossing_white.png').default,
                iconBlack: require('./assets/img/icons/crossing_black.png').default,
            },
            {
                name: 'Left turn',
                iconWhite: require('./assets/img/icons/turnLeft_white.png').default,
                iconBlack: require('./assets/img/icons/turnLeft_black.png').default,
            },
            {
                name: 'Excuse me',
                iconWhite: require('./assets/img/icons/excuseMe_white.png').default,
                iconBlack: require('./assets/img/icons/excuseMe_black.png').default,
            },
            {
                name: 'Claxon',
                iconWhite: require('./assets/img/icons/claxon_white.png').default,
                iconBlack: require('./assets/img/icons/claxon_black.png').default,
            },
            {
                name: 'Wink',
                iconWhite: require('./assets/img/icons/wink_white.png').default,
                iconBlack: require('./assets/img/icons/wink_black.png').default,
            }
        ];

        // This would be inside RadialMenu, is only here for easy config for user testing
        this.state = {
            radialMenuConfig: {
                testOpen: false,

                toggle: false,
                deadZone: 0.0,
                selectionRadius: 0.3,
                
                width: 650,
                degSpace: 0.3,
                selectTime: 400,
                strokeWidth: 70,
                centerTop: true,
                labels: 'center',
                styleClass: 'circle',
                
                hoverColor: '#FFFFFF',
                inactiveColor: '#000000',
                selectionColor: '#2D9CDB',
                hoverSelectionColor: '#35AAED',
                disabledColor: '#515151',

                floatingLabelColor: '#12C2A2',
                floatingLabelText: '#FEFBE3',
                floatingLabelOpacity: 0.9,

                hoverOpacity: 1,
                inactiveOpacity: 0.5,
                selectionOpacity: 1,
                hoverSelectionOpacity: 1,
                disabledOpacity: 0.3,
                
                selectorStyle: {
                    width: 10,
                    styleClass: 'dot',
                    showSelector: false,
                }
            },
            itemCount: 8,
            radialMenuItems: this.testingItems.slice(0, 8),
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
                    <Route path='/flat'>
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