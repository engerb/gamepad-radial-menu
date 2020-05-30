import React from "react";
import DatGui, { DatBoolean, DatColor, DatNumber, DatString } from 'react-dat-gui';

class TestSettings extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            data: {
                package: 'react-dat-gui',
                power: 9000,
                isAwesome: true,
                feelsLike: '#2FA1D6',
            }
        }

        this.handleUpdate = newData =>
            this.setState(prevState => ({
            data: { ...prevState.data, ...newData }
        }));
    }

    render() {
        const { data } = this.state;

        return (
            <DatGui data={data} onUpdate={this.handleUpdate}>
                <DatString path='package' label='Package' />
                <DatNumber path='power' label='Power' min={9000} max={9999} step={1} />
                <DatBoolean path='isAwesome' label='Awesome?' />
                <DatColor path='feelsLike' label='Feels Like' />
            </DatGui>
        );
    }
}

export default TestSettings;