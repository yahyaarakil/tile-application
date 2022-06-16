import React, { useState, useEffect } from "react";

function BakerItem({ onChange }) {
    const [BakerName, setBakerName] = useState();
    const [BakingDuration, setBakingDuration] = useState();
    const [BakingTemp, setBakingTemperature] = useState();


    useEffect(() => {
        onChange(prevValue => ({
            ...prevValue,
            BakerName,
            BakingDuration:Number(BakingDuration),
            BakingTemp:Number(BakingTemp),
        }));
    }, [BakerName, BakingDuration, BakingTemp]);

    return (
        <div className="card" style={{marginBottom:"20px"}}>
            <div className="card-body">
                <h4 className="card-title">Baker</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <p>Baker Name</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setBakerName(e.target.value)} />
                            <p>Baking Duration</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setBakingDuration(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <p>Baking Temperature</p>
                            <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => setBakingTemperature(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BakerItem;