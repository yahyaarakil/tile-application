import React, { useState, useEffect } from "react";

function DryingItem({onChange}) {

    const [DryingTemp, setDryingTemp] = useState();
    const [DryingDuration, setDryingDuration] = useState();
    const [Humidity, setHumidity] = useState();
    const [InitTemp, setInitialTemp] = useState();

    useEffect(() => {
        onChange(prevValue => ({
            ...prevValue,
            DryingTemp:Number(DryingTemp),
            DryingDuration:Number(DryingDuration),
            Humidity:Number(Humidity),
            InitTemp:Number(InitTemp),
        }));
    }, [DryingTemp, DryingDuration, Humidity, InitTemp]);

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