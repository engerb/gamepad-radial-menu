import React from "react";

class RadialMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = { 
            gamePadConnected: false
        };

        this.gamePad = null;
    }

    componentDidMount() {
        window.addEventListener('gamepadconnected', event => {
            this.setState({ gamePadConnected: true });
            this.gamePad = navigator.getGamepads()[event.gamepad.index];

            console.log('Gamepad connected at index %d: %s. %d buttons, %d axes.',
                this.gamePad.index, this.gamePad.id,
                this.gamePad.buttons.length, this.gamePad.axes.length);
        });

        window.addEventListener('gamepaddisconnected', () => {
            this.setState({ gamePadConnected: false });
            this.gamePad = null

            console.log('Gamepad disconnected.');
        });
    }

    render() {
        return (
            <div className = ''>
            
            </div>
        );
    }
}

export default RadialMenu;