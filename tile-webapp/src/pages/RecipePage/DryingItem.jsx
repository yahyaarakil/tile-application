import React, { useState, useEffect } from "react";

function DryingItem({onChange}) {

    const [dryingTemp, setDryingTemp] = useState();
    const [dryingDuration, setDryingDuration] = useState();
    const [humidity, setHumidity] = useState();
    const [initialTemp, setInitialTemp] = useState();

    useEffect(() => {
        onChange(prevValue => ({
            ...prevValue,
            dryingTemp,
            dryingDuration,
            humidity,
            initialTemp,
        }));
    }, [dryingTemp, dryingDuration, humidity, initialTemp]);

    return (
        <div className="card" style={{marginBottom:"20px"}}>
            <div className="card-body">
                <h4 className="card-title">Dryer</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <p>Drying Temp</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setDryingTemp(e.target.value)} />
                            <p>Drying Duraton</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setDryingDuration(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <p>Humidity</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setHumidity(e.target.value)} />
                            <p>Initial Temperature</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setInitialTemp(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DryingItem;