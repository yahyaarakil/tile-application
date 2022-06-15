import React, { useState, useEffect } from "react";

function DryingItem({onChange}) {

    const [dryingTemperature, setDryingTemp] = useState();
    const [dryingDuration, setDryingDuration] = useState();
    const [humidity, setHumidity] = useState();
    const [initialTemperature, setInitialTemp] = useState();

    useEffect(() => {
        onChange(prevValue => ({
            ...prevValue,
            dryingTemperature,
            dryingDuration,
            humidity,
            initialTemperature,
        }));
    }, [dryingTemperature, dryingDuration, humidity, initialTemperature]);

    return (
        <div className="card" >
            <div className="card-body">
                <h4 className="card-title">Dryer</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <p>Drying Temp</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setDryingTemp(e)} />
                            <p>Drying Duraton</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setDryingDuration(e)} />
                        </div>
                        <div className="col-6">
                            <p>Humidity</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setHumidity(e)} />
                            <p>Initial Temperature</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setInitialTemp(e)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DryingItem;