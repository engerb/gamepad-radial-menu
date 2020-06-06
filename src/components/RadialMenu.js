/* 
    Radial menu component that handles controller, radial menu rendering and
    selection. 
*/

import React from "react";


class RadialMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menuOpen: false,
            testOpen: props.testOpen, // for config use only
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
        const gamePad = navigator.getGamepads()[this.gamePadIndex],
            x = gamePad.axes[2], 
            y = gamePad.axes[3],
            activeButton = gamePad.buttons[this.state.activeButton].pressed;

        
        // Determine if the menu should be open or not:
        if (this.state.interact) {
            // Flow for menu toggle
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
            // Flow for simple press and release of button
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

            // Get the radius / distance of joystick from center from 0 center to 1 outer
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

                        // This might be where you now send the selection off
                        console.log({Selection: this.state.radialMenuItems[i]}); 
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


    /* State driven style for menu */
    fillColor(i) {
        if (this.state.hoverIndex == i && this.state.selectionIndex == i) {
            return this.state.radialMenuConfig.hoverSelectionColor;
        } else if (this.state.selectionIndex == i) {
            return this.state.radialMenuConfig.selectionColor;
        } else if (this.state.hoverIndex == i) {
            return this.state.radialMenuConfig.hoverColor;
        } else {
            return this.state.radialMenuConfig.inactiveColor;
        }
    }

    fillOpacity(i) {
        if (this.state.hoverIndex == i && this.state.selectionIndex == i) {
            return this.state.radialMenuConfig.hoverSelectionOpacity;
        } else if (this.state.selectionIndex == i) {
            return this.state.radialMenuConfig.selectionOpacity;
        } else if (this.state.hoverIndex == i) {
            return this.state.radialMenuConfig.hoverOpacity;
        } else {
            return this.state.radialMenuConfig.inactiveOpacity;
        }
    }

    cssRGBA(i) {
        const hex = this.fillColor(i),
            alpha = this.fillOpacity(i),
            r = "0x" + hex[1] + hex[2],
            g = "0x" + hex[3] + hex[4],
            b = "0x" + hex[5] + hex[6];

        return "rgba("+ +r + "," + +g + "," + +b + "," + +alpha + ")";
    }


    /* Used for selecting an icon that can be seen against the background color */
    checkContrast( hex ) {
        const threshold = 160, // close to half 256 ~130
            r = parseInt( hex.substring(1, 3), 16),
            g = parseInt( hex.substring(3, 5), 16),
            b = parseInt( hex.substring(5, 7), 16);
            
        const cBrightness = ((r * 299) + (g * 587) + (b * 114)) / 1000;
        
        if (cBrightness > threshold) {
            return 'black';
        } else { 
            return 'white';
        }	
    }


    /* Label above or inside the items */
    makeLabel(text, width, i) {
        if (['inside', 'centerAndInside'].includes(this.state.radialMenuConfig.labels)) {
            return <p style = {{
                color: `${(this.checkContrast( this.fillColor(i) ) == 'black' ? 'black' : 'white')}`,
                // fontSize: `${(width / (text.length / 0.5)) * 3}px`,      // could be fill space...
                }}>
                    {text}
                </p>;

        } else if (['above', 'centerAndAbove'].includes(this.state.radialMenuConfig.labels) && ((this.state.interact && this.state.hoverIndex == i) || (!this.state.interact && this.state.selectionIndex == i))) {
            const floatingText = (
                this.state.interact ?
                this.state.radialMenuItems[this.state.hoverIndex].name :
                this.state.radialMenuItems[this.state.selectionIndex].name
            );

            return <div className = 'floatingLabel' 
                style = {{
                    backgroundColor: `${this.state.radialMenuConfig.floatingLabelColor}`,
                    opacity: `${this.state.radialMenuConfig.floatingLabelOpacity}`,
                    top: `-${width/2 + 10}px`}}>
                <p style = {{color: `${this.state.radialMenuConfig.floatingLabelText}`}}>
                    {text}
                </p>
            </div>;
        }
    }


    /* Receive items and other configs for menu */
    static getDerivedStateFromProps(nextProps, prevState) {
        return {
            radialMenuConfig: nextProps.radialMenuConfig,
            radialMenuItems: nextProps.radialMenuItems,
            activeButton: nextProps.activeButton,
            testOpen: nextProps.testOpen
        };
    }


    render() {
        // The pointer showing the joystick position
        const selector = (
            this.state.radialMenuConfig.selectorStyle.showSelector ?
            <div className = {`selector ${this.state.radialMenuConfig.selectorStyle.styleClass}`} style={{
                left: `${Math.round(((this.state.x * .4 + .5) * this.state.radialMenuConfig.width) - (this.state.radialMenuConfig.selectorStyle.width / 2))}px`, // todo: deadzone
                top: `${Math.round(((this.state.y * .4 + .5) * this.state.radialMenuConfig.width) - (this.state.radialMenuConfig.selectorStyle.width / 2))}px`,
                width: `${this.state.radialMenuConfig.selectorStyle.width}px`,
                height: `${this.state.radialMenuConfig.selectorStyle.width}px`,
                // opacity: `${0.25 + (1 - 0.25) * this.state.radius}` // this should be a decided option in state
            }}/> :
            null
        );
        
        // Icons and (optionally) their labels placed in a circle
        const items = (() => {
            // Get max width/height based on inner/outer radius constrained by quantity in circumference
            const degWidth = (360 / this.state.radialMenuItems.length),
                radius = (this.state.radialMenuConfig.width - this.state.radialMenuConfig.strokeWidth) - 5,
                circumference = 1 * Math.PI * radius,
                arcGap = circumference * ((this.state.radialMenuConfig.degSpace * this.state.radialMenuItems.length) / 360),
                maxWidth = ((
                    this.state.radialMenuConfig.strokeWidth < ((circumference / this.state.radialMenuItems.length) - arcGap) ?
                    this.state.radialMenuConfig.strokeWidth :
                    ((circumference / this.state.radialMenuItems.length) - arcGap)
                ) - 5);

            let items = [];
            for (let i = 0; i < this.state.radialMenuItems.length; i++) {
                const deg = (!this.state.radialMenuConfig.centerTop ? -(degWidth / 2) + -90 : -90) + (degWidth * i),
                    x = Math.round((radius / 2) * Math.cos(Math.PI * deg / 180)) + (radius / 2),
                    y = Math.round((radius / 2) * Math.sin(Math.PI * deg / 180)) + (radius / 2);

                const item = this.state.radialMenuItems[i];

                items.push(
                    <div key={i} 
                        className = {`item ${((this.state.hoverIndex == i) ? 'hover' : '')} ${((this.state.selectionIndex == i) ? 'selected' : '')}`}
                        style = {{
                            animationDuration: `${this.state.radialMenuConfig.selectTime}ms`,
                            left: `${x}px`,
                            top: `${y}px`,
                            width: `${this.state.radialMenuConfig.strokeWidth}px`,
                            height: `${this.state.radialMenuConfig.strokeWidth}px`,
                        }}>
                        <div className = {`itemChild ${this.state.radialMenuConfig.labels}`}
                            style = {{
                                width: `${maxWidth}px`,
                                height: `${maxWidth}px`,
                                backgroundColor: `${((this.state.radialMenuConfig.styleClass == 'animalCrossing') ? this.cssRGBA(i) : '')}`,
                            }}>
                            <div className = 'icon' style = {{backgroundImage: `url(${ (this.checkContrast( this.fillColor(i) ) == 'black' ? item.iconBlack : item.iconWhite) })`}} />
                            {this.makeLabel( item.name, maxWidth, i )}
                        </div>
                    </div>
                );
            }


            return <div className = 'items'>{items}</div>;
        })();
        
        // Current hover or selected item shown in the center of the circle
        const itemCenter = (() => {
            if (['center', 'centerAndInside', 'centerAndAbove'].includes(this.state.radialMenuConfig.labels) && (this.state.hoverIndex >= 0 || !this.state.interact)) {

                // Get item to show (and hold if selected)
                const item = (
                    this.state.interact ?
                    this.state.radialMenuItems[this.state.hoverIndex] :
                    this.state.radialMenuItems[this.state.selectionIndex]
                );

                return <div className = 'centerTitle'>
                    <div style = {{backgroundImage: `url(${item.iconWhite})`}} />
                    <p>{item.name}</p>
                </div>;
            }
        })();

        // Backgrounds for pie styles where vertices need to be created
        const menuBG = (() => {
            const width = this.state.radialMenuConfig.width;
            const styleClass = this.state.radialMenuConfig.styleClass;

            if (styleClass === 'circle') {
                const degWidth = (360 / this.state.radialMenuItems.length);
                let sections = [];

                // Calculate all the vertices
                for (let i = 0; i < this.state.radialMenuItems.length; i++) {
                    const
                        degStart = (this.state.radialMenuConfig.centerTop ? -(degWidth / 2) + -90 : -90) + (degWidth * i) + this.state.radialMenuConfig.degSpace,
                        degEnd = (this.state.radialMenuConfig.centerTop ? (degWidth / 2) - 90 : degWidth - 90) + (degWidth * i) - this.state.radialMenuConfig.degSpace,
                        x1 = Math.round(width * Math.cos(Math.PI * degStart / 180)) + (width / 2),
                        y1 = Math.round(width * Math.sin(Math.PI * degStart / 180)) + (width / 2),
                        x2 = Math.round(width * Math.cos(Math.PI * degEnd / 180)) + (width / 2),
                        y2 = Math.round(width * Math.sin(Math.PI * degEnd / 180)) + (width / 2);

                    sections.push(
                        <polygon key={i} 
                            className = {`${((this.state.hoverIndex == i) ? 'hover' : '')} ${((this.state.selectionIndex == i) ? 'selected' : '')}`}
                            style = {{animationDuration: `${this.state.radialMenuConfig.selectTime}ms`}}
                            fill = {this.fillColor(i)}
                            opacity = {this.fillOpacity(i)}
                            mask = 'url(#mask)' 
                            points = {` ${x1},${y1} 
                                        ${(width/2)},${(width/2)} 
                                        ${x2},${y2}`} />
                    );
                }

                return (
                    <div className='itemBG'>
                        <svg height={width} width={width}>
                            <defs>
                                <mask id='mask'>
                                    <circle 
                                        cx={width/2} 
                                        cy={width/2} r={width/2 - this.state.radialMenuConfig.strokeWidth/2} 
                                        stroke='white' 
                                        strokeWidth={this.state.radialMenuConfig.strokeWidth} 
                                        fill='none' />
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
                <div 
                    className = {
                        `radialMain 
                        ${ (this.state.menuOpen ? 'open' : 'closed') } 
                        ${ (this.state.testOpen ? 'testOpen' : '') } 
                        ${this.state.radialMenuConfig.styleClass} `
                    } 
                    style = {{
                        width: `${this.state.radialMenuConfig.width}px`,
                        height: `${this.state.radialMenuConfig.width}px`,
                    }} >
                    {menuBG}
                    {itemCenter}
                    {items}
                    {selector}
                </div>
            </div>
        );
    }
}

export default RadialMenu;