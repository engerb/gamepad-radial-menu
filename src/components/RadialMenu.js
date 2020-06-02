/* 
    Radial menu component that handles controller, radial menu rendering and
    selection. Selection params and items in menu are handles in a higher state?
*/

import React from "react";


class RadialMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: true,
            activeButton: props.activeButton, // D-Pad down
            activeButtonToggled: false,
            gamePadConnected: false,
            radius: 0,
            angle: 0,
            x: 0,
            y: 0,
            selectionIndex: -1, 
            hoverIndex: -1,
            interact: true,
            radialMenuConfig: props.radialMenuConfig,
            radialMenuItems: props.radialMenuItems
        };

        this.gamePadIndex;
        this.interval;
    }


    /* Everything to handle gamepad */
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


    /* When controller is plugged in, and if selection button is pressed, compute values needed to know if a selection will happen */
    pollGamepads() {
        // Get state of controller, w3.org/TR/gamepad/ for PS4 mapping
        const gamePad = navigator.getGamepads()[this.gamePadIndex];
        const x = gamePad.axes[2], y = gamePad.axes[3];
        const activeButton = gamePad.buttons[this.state.activeButton].pressed;

        
        // Determine if the menu should be open or not:
        if (this.state.interact) {
            // .... Flow for menu toggle
            if (this.state.radialMenuConfig.toggle) {
                if (activeButton) { 
                    if (!this.state.menuOpen) { 
                        if (!this.state.activeButtonToggled) { 
                            this.setState({ menuOpen: true });
                        } 
                    } else if (this.state.activeButtonToggled) { 
                        this.selectionMade({hover: false});
                    }
                } else {
                    if (this.state.menuOpen) { 
                        this.setState({ activeButtonToggled: true });
                    } else {
                        this.setState({ activeButtonToggled: false });
                    }
                }
            // .... Flow for simple press and release of button
            } else {
                if (activeButton) { 
                    this.setState({ menuOpen: true });
                } else if (this.state.menuOpen) {
                    this.selectionMade({hover: false});
                }
            }
        }

        // Only do all the cool math if the menu is open
        if (this.state.menuOpen) {
            // Get the angle of right joystick starting from 0 at the top to 360 clockwise, then offset if needed for menu
            const angle = (( theta = Math.atan2( y, x ) * ( 180 / Math.PI ) ) => {
                const offset = (this.state.radialMenuConfig.centerTop ? (360 / this.state.radialMenuItems.length / 2) + 90 : 90 );
                return (( theta >= 0 ? theta : theta + 360 ) + offset) % 360;
            })();

            // Get the radius / distance of joistick from center from 0 center to 1 outer
            const radius = (( val = Math.sqrt( x * x + y * y ) ) => {
                return (val > 1 ? 1 : val);
            })();

            this.setState({ 
                radius: radius,
                angle: angle,
                x: x,
                y: y
            }); 

            this.selectionMade({hover: true});
        }
    }


    /* The button to activate the radial menu was pressed, and now released, let's determine if that means a selection was made */
    selectionMade(props) {
        // Is the stick in the selection threshold?
        if (this.state.radius >= this.state.radialMenuConfig.selectionRadius) {
            const range = 360 / this.state.radialMenuItems.length;

            for (let i = 0; i < this.state.radialMenuItems.length; i++) {
                if (this.state.angle >= i * range && this.state.angle <= (i + 1) * range) {
                    if (!props.hover) {
                        this.setState({ 
                            selectionIndex: i, // could toggle?
                            hoverIndex: -1,
                            interact: false 
                        });

                        // Let the selection show
                        this.timedEvent = setTimeout(() => {
                            this.setState({ 
                                menuOpen: false,
                                hoverIndex: -1,
                                interact: true 
                            });
                        }, (this.state.radialMenuConfig.selectTime));

                        // console.log('Selection: ' + i);
                    } else {
                        this.setState({ hoverIndex: i });
                    }
                    break;
                }
            }
        } else {
            if (!props.hover) {
                this.setState({ menuOpen: false });
            } else {
                this.setState({ hoverIndex: -1 });
            }
        }
    }


    /* Receive items and other configs for menu */
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            radialMenuConfig: nextProps.radialMenuConfig,
            radialMenuItems: nextProps.radialMenuItems,
            activeButton: nextProps.activeButton,
        };
    }


    render() {
        let selector = (
            this.state.radialMenuConfig.selectorStyle.showSelector ?
            <div className = {`selector ${this.state.radialMenuConfig.selectorStyle.styleClass}`} style={{
                left: `${Math.round(((this.state.x * .4 + .5) * this.state.radialMenuConfig.width) - (this.state.radialMenuConfig.selectorStyle.width / 2))}px`,
                top: `${Math.round(((this.state.y * .4 + .5) * this.state.radialMenuConfig.width) - (this.state.radialMenuConfig.selectorStyle.width / 2))}px`,
                width: `${this.state.radialMenuConfig.selectorStyle.width}px`,
                height: `${this.state.radialMenuConfig.selectorStyle.width}px`,
                opacity: `${0.25 + (1 - 0.25) * this.state.radius}`
            }}/>:
            null
        );

        const items = (() => {
            return <div></div>;
        })();

        const itemTitles = (() => {
            return <div></div>;
        })();

        const itemBG = (() => {
            const width = this.state.radialMenuConfig.width;
            const styleClass = this.state.radialMenuConfig.styleClass;
            const strokeWidth = this.state.radialMenuConfig.strokeWidth;

            if (styleClass === 'circle') {
                const degWidth = (360 / this.state.radialMenuItems.length);
                var sections = [];

                // Calculate all the vertices
                for (let i = 0; i < this.state.radialMenuItems.length; i++) {
                    const degStart = (this.state.radialMenuConfig.centerTop ? -(degWidth / 2) + -90 : -90 ) + (degWidth * i) + this.state.radialMenuConfig.degSpace;
                    const degEnd = (this.state.radialMenuConfig.centerTop ? (degWidth / 2) - 90 : degWidth - 90 ) + (degWidth * i) - this.state.radialMenuConfig.degSpace;

                    const x1 = Math.round( width * Math.cos(Math.PI * degStart / 180) ) + (width/2);
                    const y1 = Math.round( width * Math.sin(Math.PI * degStart / 180) ) + (width/2);

                    const x2 = Math.round( width * Math.cos(Math.PI * degEnd / 180) ) + (width/2);
                    const y2 = Math.round( width * Math.sin(Math.PI * degEnd / 180) ) + (width/2);

                    sections.push(
                        <polygon key={i} 
                            className={`${((this.state.hoverIndex == i) ? 'hover' : '')} ${((this.state.selectionIndex == i) ? 'selected' : '')}`} mask='url(#mask)' 
                            points={`${x1},${y1} ${(width/2)},${(width/2)} ${x2},${y2}`} 
                        />
                    );
                }

                return (
                    <div className='itemBG'>
                        <svg height={width} width={width}>
                            <defs>
                                <mask id='mask'>
                                    <circle cx={width/2} cy={width/2} r={width/2 - strokeWidth/2} stroke='white' strokeWidth={strokeWidth} fill='none' />
                                </mask>
                            </defs>
                            {sections}
                        </svg>
                    </div>
                );
            }
        })();

        return (
            <div className = 'centerWrap'>
                <div className = {`radialMain ${ (this.state.menuOpen ? 'open' : 'closed') } ${this.state.radialMenuConfig.styleClass} `} style={{
                        width: `${this.state.radialMenuConfig.width}px`,
                        height: `${this.state.radialMenuConfig.width}px`,
                    }} >
                    {items}
                    {itemTitles}
                    {itemBG}
                    {selector}
                </div>
            </div>
        );
    }
}

export default RadialMenu;