import 'react-dat-gui/dist/index.css';

import React from "react";
import DatGui, {
    DatBoolean,
    // DatButton,
    DatColor,
    DatFolder,
    DatNumber,
    DatPresets,
    DatSelect,
    // DatString
  } from 'react-dat-gui';

class TestSettings extends React.Component {
    constructor(props) {
        super(props);

        this.controllerButtons = [
            '0: X button',
            '1: Circle button',
            '2: Square button',
            '3: Triangle button',
            '4: L1',
            '5: R1',
            '6: L2 trigger',
            '7: R2 trigger',
            '8: Share button',
            '9: Options button',
            '10: Left trigger (pushed in)',
            '11: Right trigger (pushed in)',
            '12: D-pad up',
            '13: D-pad down',
            '14: D-pad left',
            '15: D-pad right',
            '16: Playstation button'
        ];

        this.state = {
            data: {
                radialMenuConfig: props.radialMenuConfig,
                itemCount: props.itemCount,
                activeButton: props.activeButton,
                activeButtonName: this.controllerButtons[props.activeButton],
                showHelp: true
            },
            hover: false,
            menuOpen: true
        }

        this.handleUpdate = ((newData) => {
            const activeButton = Number(String(newData.activeButtonName).split(':')[0]);
            newData.activeButton = activeButton;
            
            if (newData.itemCount != this.state.data.itemCount) {
                this.props.itemCountCallback(newData.itemCount);
            } else if (activeButton != this.state.data.activeButton) {
                this.props.activeButtonCallback(activeButton);
            } else {
                this.props.radialMenuConfigCallback(newData.radialMenuConfig);
            }

            this.setState({data: newData});
        });
    }

    hover(hover) {
        this.props.menuTestOpen(hover);
        this.setState({hover: hover});
    }

    render() {
        const { data } = this.state;
        const showHelp = (
            this.state.data.showHelp ?
            <div className = 'helpBox'>
                <p className = 'mainInstructions'>Plug in PS4 controller, open the menu by {((this.state.data.radialMenuConfig.toggle) ? 'pressing' : 'holding')} <span>{this.controllerButtons[ this.state.data.activeButton ].split(':')[1]}</span>, hold right thumb-stick in direction of  desired selection then {((this.state.data.radialMenuConfig.toggle) ? 'press the button again.' : 'release the button.')}</p>
                
                <p className = 'details'>You can select from 3 main presets for the menu. You can choose <a href = 'https://www.w3.org/TR/gamepad/standard_gamepad.svg' target = '_blank' >the button</a> to activate the menu. You can also check <i>Button toggle</i> to either press once or hold the button to open the menu.</p>
                
                {this.state.hover ?
                <p className = 'warning'>Radial menu is open for you to see while you make changes. Be sure to move mouse outside of here for actual controller testing when ready.</p>
                : null}
            </div>
            : null
        );

        const presets = [{
            Circle_1: {  
                radialMenuConfig: {
                    toggle: this.state.data.radialMenuConfig.toggle,
                    deadZone: this.state.data.radialMenuConfig.deadZone,
                    selectionRadius: this.state.data.radialMenuConfig.selectionRadius,

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
                
                itemCount: this.state.data.itemCount,
                activeButton: this.state.data.activeButton,
                activeButtonName: this.state.data.activeButtonName,
                showHelp: this.state.data.activeButtonName
            },
            Circle_2: {  
                radialMenuConfig: {
                    toggle: this.state.data.radialMenuConfig.toggle,
                    deadZone: this.state.data.radialMenuConfig.deadZone,
                    selectionRadius: this.state.data.radialMenuConfig.selectionRadius,

                    width: 650,
                    degSpace: 0.3,
                    selectTime: 400,
                    strokeWidth: 100,
                    centerTop: true,
                    labels: 'inside',
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

                itemCount: this.state.data.itemCount,
                activeButton: this.state.data.activeButton,
                activeButtonName: this.state.data.activeButtonName,
                showHelp: this.state.data.activeButtonName
            },
            AnimalCrossing: {  
                radialMenuConfig: {
                    toggle: this.state.data.radialMenuConfig.toggle,
                    deadZone: this.state.data.radialMenuConfig.deadZone,
                    selectionRadius: this.state.data.radialMenuConfig.selectionRadius,

                    width: 460,
                    degSpace: 0.5,
                    selectTime: 400,
                    strokeWidth: 110,
                    centerTop: true,
                    labels: 'above',
                    styleClass: 'animalCrossing',
                    
                    hoverColor: '#FEFBE3',
                    inactiveColor: '#000000',
                    selectionColor: '#12C2A2',
                    hoverSelectionColor: '#12C2A2',
                    disabledColor: '#515151',

                    floatingLabelColor: '#12C2A2',
                    floatingLabelText: '#FEFBE3',
                    floatingLabelOpacity: 1,

                    hoverOpacity: 1,
                    inactiveOpacity: 0.65,
                    selectionOpacity: 1,
                    hoverSelectionOpacity: 1,
                    disabledOpacity: 0.3,
                    
                    selectorStyle: {
                        width: 70,
                        styleClass: 'hand',
                        showSelector: true,
                    }
                },

                itemCount: this.state.data.itemCount,
                activeButton: this.state.data.activeButton,
                activeButtonName: this.state.data.activeButtonName,
                showHelp: this.state.data.activeButtonName
            },
              
        }];

        return (
            <div className = 'configMain' >
                <div style = {(this.state.menuOpen ? null : {display: 'none'})}
                    onMouseEnter = { () => this.hover(true) }
                    onMouseLeave = { () => this.hover(false) } >
                    <DatGui data={data} onUpdate={this.handleUpdate}>
                        <DatPresets label="Presets" options={presets} onUpdate={this.handleUpdate} />
                        <DatSelect label='Controller button' path='activeButtonName' options={this.controllerButtons}/>
                        <DatBoolean label='Button toggle' path='radialMenuConfig.toggle' />
                        <DatFolder title='Functionality'>
                            <DatNumber label='Item count' path='itemCount' min={3} max={10} step={1} />
                            {/* <DatSelect label='Controller button' path='activeButtonName' options={this.controllerButtons}/> */}
                            {/* <DatBoolean label='Button toggle' path='radialMenuConfig.toggle' /> */}
                            <DatNumber label='Selection radius' path='radialMenuConfig.selectionRadius' min={0.2} max={0.9} step={0.1} />
                            <DatNumber label='Dead zone' path='radialMenuConfig.deadZone' min={0.05} max={0.9} step={0.01} />
                        </DatFolder>
                        
                        <DatFolder title='Style'>
                            <DatSelect label='Menu class' path='radialMenuConfig.styleClass' options={['circle', 'octo', 'animalCrossing']}/>
                            <DatSelect label='Labels' path='radialMenuConfig.labels' options={['center', 'above', 'inside', 'centerAndInside', 'centerAndAbove']}/> 
                            <DatNumber label='Menu width' path='radialMenuConfig.width' min={300} max={1000} step={1} />
                            <DatNumber label='Menu thickness' path='radialMenuConfig.strokeWidth' min={50} max={500} step={1} />
                            <DatNumber label='Item gap' path='radialMenuConfig.degSpace' min={0} max={2} step={0.1} />
                            <DatNumber label='Selection confirmation (ms)' path='radialMenuConfig.selectTime' min={0} max={1000} step={1} />
                            <DatBoolean label='Center first item' path='radialMenuConfig.centerTop' />

                            <DatFolder title='Colours'>
                                <DatColor label='Unselected' path='radialMenuConfig.inactiveColor' />
                                <DatNumber label='...Opacity' path='radialMenuConfig.inactiveOpacity' min={0} max={1} step={0.01} />
                                <DatColor label='Hover' path='radialMenuConfig.hoverColor' />
                                <DatNumber label='...Opacity' path='radialMenuConfig.hoverOpacity' min={0} max={1} step={0.01} />
                                <DatColor label='Selected' path='radialMenuConfig.selectionColor' />
                                <DatNumber label='...Opacity' path='radialMenuConfig.selectionOpacity' min={0} max={1} step={0.01} />
                                <DatColor label='Selected hover' path='radialMenuConfig.hoverSelectionColor' />
                                <DatNumber label='...Opacity' path='radialMenuConfig.hoverSelectionOpacity' min={0} max={1} step={0.01} />
                                <DatColor label='Disabled' path='radialMenuConfig.disabledColor' />
                                <DatNumber label='...Opacity' path='radialMenuConfig.disabledOpacity' min={0} max={1} step={0.01} />

                                <DatColor label='Floating label' path='radialMenuConfig.floatingLabelColor' />
                                <DatColor label='Text' path='radialMenuConfig.floatingLabelText' />
                                <DatNumber label='...Opacity' path='radialMenuConfig.floatingLabelOpacity' min={0} max={1} step={0.01} />
                            </DatFolder>

                            <DatFolder title='Selector style'>
                                <DatSelect label='Selector class' path='radialMenuConfig.selectorStyle.styleClass' options={['dot', 'shadow', 'animalCrossing']}/>
                                <DatNumber label='Width' path='radialMenuConfig.selectorStyle.width' min={1} max={500} step={1} />
                                <DatBoolean label='Show selector' path='radialMenuConfig.selectorStyle.showSelector' />
                            </DatFolder>
                        </DatFolder>
                        <DatBoolean label='Show help info' path='showHelp' />
                    </DatGui>

                    {showHelp}
                </div>
                <div 
                    className = 'toggleMenu'
                    onClick = { () => this.setState({menuOpen: !this.state.menuOpen}) } >
                        <p>{(this.state.menuOpen ? 'Collapse menu 🔼' : 'Open menu 🔽')}</p>
                </div>
            </div>
        );
    }
}

export default TestSettings;