import 'react-dat-gui/dist/index.css';

import React from "react";
// import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';
import DatGui, {
    DatBoolean,
    DatButton,
    DatColor,
    DatFolder,
    DatNumber,
    DatPresets,
    DatSelect,
    DatString
  } from 'react-dat-gui';

class TestSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                radialMenuConfig: props.radialMenuConfig,
                itemCount: props.itemCount,
                activeButton: props.activeButton
            }
        }

        this.controllerButtons = {
            numbers: [...Array(17).keys()],
            names: [
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
            ]
        }

        // this.handleButtonClick = (() => {
        //     this.props.menuToggleCallback();
        // });

        this.handleUpdate = ((newData) => {
            // Item count or radiel menu config?
            if (newData.itemCount != this.state.data.itemCount) {
                this.props.itemCountCallback(newData.itemCount);
            } else if (newData.activeButton != this.state.data.activeButton) {
                this.props.activeButtonCallback(newData.activeButton);
            } else {
                this.props.radialMenuConfigCallback(newData.radialMenuConfig);
            }


            this.setState({data: newData});
        });
    }

    render() {
        const { data } = this.state;

        return (
            <DatGui data={data} onUpdate={this.handleUpdate}>
                
                <DatNumber label='Item count' path='itemCount' min={3} max={10} step={1} />
                <DatBoolean label='Toggle open' path='radialMenuConfig.toggle' />
                {/* <DatString label='Controller button' path='activeButton' /> */}
                <DatSelect label='Controller button' path='activeButton' options={this.controllerButtons.numbers}/>
                {/* <DatButton label='Toggle menu' onClick={this.handleButtonClick} /> */}
                
                <DatFolder title='Menu config'>
                    {/* <DatSelect label='Menu class' path='radialMenuConfig.styleClass' options={['circle', 'octo', 'animalCrossing']}/> */}
                    <DatSelect label='Labels' path='radialMenuConfig.labels' options={['center', 'above', 'inside']}/>
                    <DatNumber label='Menu width' path='radialMenuConfig.width' min={300} max={1000} step={1} />
                    <DatNumber label='Menu thickness' path='radialMenuConfig.strokeWidth' min={50} max={500} step={1} />
                    <DatNumber label='Item gap' path='radialMenuConfig.degSpace' min={0} max={2} step={0.1} />
                    <DatNumber label='Selection confirmation (ms)' path='radialMenuConfig.selectTime' min={0} max={1000} step={1} />
                    <DatNumber label='Selection radius' path='radialMenuConfig.selectionRadius' min={0.2} max={0.9} step={0.1} />
                    <DatBoolean label='Center first item' path='radialMenuConfig.centerTop' />
                </DatFolder>
                <DatFolder title='Selector config'>
                    <DatSelect label='Selector class' path='radialMenuConfig.selectorStyle.styleClass' options={['dot', 'shadow', 'animalCrossing']}/>
                    <DatNumber label='Menu thickness' path='radialMenuConfig.selectorStyle.width' min={1} max={500} step={1} />
                    <DatBoolean label='Show selector' path='radialMenuConfig.selectorStyle.showSelector' />
                </DatFolder>
            </DatGui>
        );
    }
}

export default TestSettings;