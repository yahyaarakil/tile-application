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


function PaintItem({ onChange }) {

    const [grammage, setGrammage] = useState("");
    const [material, setMaterial] = useState("");

    useEffect(() => {
        onChange(form => ({
            ...form,
            grammage,
            material
        }));
    }, [grammage, material])


    return (
        <div className="card">
            <div className="card-body">
                <div className="mb-5">
                    <h4 className="card-title">Paint</h4>
                    <p className="card-text">
                        Select a paint and Grammage:
                    </p>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <input onChange={e => setGrammage(e.target.value)}
                                    type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            </div>
                            <div className="col-6">
                                <select className="form-select" onChange={e=>setMaterial(e.target.value)}>
                                    {MATERIAL_OPTIONS.map((materialOptions) => <option key={materialOptions.code} value={materialOptions.code}>{materialOptions.name}</option>)}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PaintItem;