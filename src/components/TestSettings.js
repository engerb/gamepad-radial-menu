import React from "react";
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';

class TestSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                package: 'react-dat-gui',
                itemCount: props.itemCount,
                isAwesome: true,
                feelsLike: '#2FA1D6',
            }
        }

        this.handleUpdate = ((newData) => {
            // Item count or radiel menu config?
            if (newData.itemCount != this.state.itemCount) {
                this.props.itemCountCallback(newData.itemCount);
            } else {
                // ...
            }


            this.setState({data: newData});
        });
    }

    render() {
        const { data } = this.state;

        return (
            <DatGui data={data} onUpdate={this.handleUpdate}>
                <DatString path='package' label='Package' />
                <DatNumber path='itemCount' label='Item count' min={3} max={10} step={1} />
                <DatBoolean path='isAwesome' label='Awesome?' />
                <DatColor path='feelsLike' label='Feels Like' />
            </DatGui>
        );
    }
}

export default TestSettings;