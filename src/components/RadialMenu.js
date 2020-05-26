/* 
    Radial menu component that handles controller, radial menu rendering and
    selection. Selection params and items in menu are handles in a higher state?
*/

import React from "react";


class RadialMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeButtonPressed: false,
            activeButton: 13, // D-Pad down
            gamePadConnected: false,
            radius: 0,
            angle: 0,
            x: 0,
            y: 0,
            radialMenu: {
                width: 600,
                toggle: false,
                selectorWidth: 200,
                centerTop: true,
                items: [
                    props.items // if any, or give them
                ]
            },
            selectionIndex: -1 // top level?
        };

        this.gamePadIndex;
        this.interval;
    }


    /* 
        When controller is plugged in, and if selection button is pressed, compute
        values needed to know if a selection will happen
    */
    componentDidMount() {
        window.addEventListener('gamepadconnected', event => {
            this.setState({ gamePadConnected: true });
            this.gamePadIndex = event.gamepad.index;

            this.interval = setInterval(this.pollGamepads.bind(this), 50); // 50?

            console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
                navigator.getGamepads()[event.gamepad.index].index, navigator.getGamepads()[event.gamepad.index].id,
                navigator.getGamepads()[event.gamepad.index].buttons.length, navigator.getGamepads()[event.gamepad.index].axes.length);
        });

        window.addEventListener('gamepaddisconnected', () => {
            this.setState({ 
                activeButtonPressed: false,
                gamePadConnected: false,
                radius: 0,
                angle: 0,
                x: 0,
                y: 0,
            });

            clearInterval(this.interval);

            console.log('Gamepad disconnected.');
        });
    }


    /* 
        When controller is plugged in, and if selection button is pressed, compute
        values needed to know if a selection will happen
    */
    pollGamepads() {
        /* Get state of controller, w3.org/TR/gamepad/ for PS4 mapping */
        const gamePad = navigator.getGamepads()[this.gamePadIndex];
        const x = gamePad.axes[2], y = gamePad.axes[3];
        const activeButton = gamePad.buttons[this.state.activeButton].pressed;

        /* Unless active button is pressed, do not bother */
        // Need a toggle check here too
        if (!activeButton) {
            /* Was it just released? */
            if (this.state.activeButtonPressed) {
                this.selection();
            }

            return;
        }

        /* Get the angle of right joystick starting from 0 at the top to 360 clockwise, then offset if needed for menu */
        const angle = (( theta = Math.atan2( y, x ) * ( 180 / Math.PI ) ) => {
            const offset = (this.state.radialMenu.centerTop ? (360 / this.state.radialMenu.items.length / 2) + 90 : 90 );
            return (( theta >= 0 ? theta : theta + 360 ) + offset) % 360;
        })();

        /* Get the radius / distance of joistick from center from 0 center to 1 outer */
        const radius = (( val = Math.sqrt( x * x + y * y ) ) => {
            return (val > 1 ? 1 : val);
        })();

        this.setState({ 
            activeButtonPressed: true,
            radius: radius,
            angle: angle,
            x: x,
            y: y
        });
    }


    /* 
        The button to activate the radial menu was pressed, and now released,
        let's determine if that means a selection was made
    */
    selection() {
        // ...
        
        this.setState({ activeButtonPressed: false });
    }


    render() {
        return (
            <div className = {`radialMain ${ (this.state.activeButtonPressed ? 'open' : 'closed') }`}>
                <div className = 'xy' style={{
                    left: `${((this.state.x * .5 + .5) * this.state.radialMenu.width) - this.state.radialMenu.selectorWidth }px`,
                    top: `${((this.state.y * .5 + .5) * this.state.radialMenu.width) - this.state.radialMenu.selectorWidth }px`,
                    width: `${this.state.radialMenu.selectorWidth}px`,
                    height: `${this.state.radialMenu.selectorWidth}px`,
                    opacity: `${0.25 + (1 - 0.25) * this.state.radius}`
                }} />
            </div>
        );
    }
}

export default RadialMenu;