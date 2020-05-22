import React from "react";

class RadialMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            gamePadConnected: false,
            radius: 0,
            angle: 0,
            x: 0,
            y: 0,
            activeButton: 13 // D-Pad down
        };

        this.gamePadIndex;
        this.interval;
    }

    componentDidMount() {
        window.addEventListener('gamepadconnected', event => {
            this.setState({ gamePadConnected: true });
            this.gamePadIndex = event.gamepad.index;

            this.interval = setInterval(this.pollGamepads.bind(this), 50);

            console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
                navigator.getGamepads()[event.gamepad.index].index, navigator.getGamepads()[event.gamepad.index].id,
                navigator.getGamepads()[event.gamepad.index].buttons.length, navigator.getGamepads()[event.gamepad.index].axes.length);
        });

        window.addEventListener('gamepaddisconnected', () => {
            this.setState({ 
                gamePadConnected: false,
                radius: 0,
                angle: 0,
                x: 0,
                y: 0
            });

            clearInterval(this.interval);

            console.log('Gamepad disconnected.');
        });
    }

    pollGamepads() {
        /* Get state of controller, w3.org/TR/gamepad/ for PS4 mapping */
        const gamePad = navigator.getGamepads()[this.gamePadIndex];
        const x = gamePad.axes[2], y = gamePad.axes[3];
        const activeButton = gamePad.buttons[this.state.activeButton];

        /* Unless active button is pressed, do not bother */
        if (!activeButton) {
            return;
        }

        /* Get the angle of right joystick starting from 0 at the top to 360 clockwise */
        const theta = Math.atan2( y, x ) * ( 180 / Math.PI );
        const angle = (( theta >= 0 ? theta : theta + 360 ) + 90) % 360;

        /* Get the radius / distance of joistick from center from 0 center to about 1 */
        const radius = Math.sqrt( x*x + y*y );

        this.setState({ 
            radius: radius,
            angle: angle,
            x: x,
            y: y
        });
    }

    render() {
        return (
            <div className = 'radialMain'>
                
            </div>
        );
    }
}

export default RadialMenu;