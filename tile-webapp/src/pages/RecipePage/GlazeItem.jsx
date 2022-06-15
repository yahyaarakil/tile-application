import React, { useState, useEffect } from "react";

const MATERIAL_OPTIONS = [
    {
        "name": "red",
        "code": 1,
        "company": "dyo",
        "price": 123
    },
    {
        "name": "green",
        "code": 2,
        "company": "dyo",
        "price": 456
    },
    {
        "name": "blue",
        "code": 3,
        "company": "filli boya",
        "price": 789
    },
    {
        "name": "glaze a",
        "code": 4,
        "company": "glazemaster",
        "price": 789
    },
    {
        "name": "glaze b",
        "code": 5,
        "company": "glazemaster",
        "price": 789,
        "alternative": {
            "code": 4
        }
    },
    {
        "name": "clay a",
        "code": 6,
        "company": "clay",
        "price": 789
    }
]

function GlazeItem({ onChange }) {
    const [options, setOptions] = useState([{}]);

    const [applicationType, setApplicationType] = useState("");
    const [waterContent, setWaterContent] = useState("");
    const [density, setDensity] = useState("");
    const [viscosity, setViscosity] = useState("");

    useEffect(() => {
        onChange(form => ({
            ...form,
            options,
            applicationType,
            waterContent,
            density,
            viscosity
        }));
    }, [options, applicationType, waterContent, density, viscosity])

    function addOption() {
        if (options.length < 8) {
            setOptions([
                ...options,
                {}
            ])
        }
    }

    function removeOptions() { }

    function handleOption(value) {
        
    }

    const allOptions = <>
        {options.map((option, index) => (
            <div key={index}>
                <select className="form-select" onChange={null}>
                    {MATERIAL_OPTIONS.map((materialOptions) => <option>{materialOptions.name}</option>)}
                </select>
            </div>

        ))}
    </>

    return (
        <div className="card" >
            <div className="card-body">
                <div className="newItem">
                    <h4>Material</h4>
                    <p>Select material and grammage</p>
                    <div className="row">
                        <div className="col-6">
                            <button className="btn" onClick={addOption}>+</button>
                            <button className="btn" onClick={removeOptions}>-</button>
                            {allOptions}
                        </div>

                        <div className="col-6">
                            <p>Application Type</p>
                            <input onChange={e => setApplicationType(e.target.value)}
                                type="text" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            <p>Water Content</p>
                            <input onChange={e => setWaterContent(e.target.value)}
                                type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            <p>Density</p>
                            <input onChange={e => setDensity(e.target.value)}
                                type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            <p>Viscosity</p>
                            <input onChange={e => setViscosity(e.target.value)}
                                type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GlazeItem;


