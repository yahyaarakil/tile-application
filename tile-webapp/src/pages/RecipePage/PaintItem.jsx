import React, { useState, useEffect } from "react";
import axios from "axios";

function PaintItem({ onChange }) {

    const [grammage, setGrammage] = useState("");
    const [material, setMaterial] = useState("");
    const [MATERIAL_OPTIONS, setMaterials] = useState([]);



    useEffect(() => {
        onChange(form => ({
            ...form,
            grammage,
            material
        }));
    }, [grammage, material])

    useEffect(() => {
        const fetchMaterials = async () => {
            try {
                let response = await axios.get("http://localhost:8080/materials",
                    {
                        headers: {
                            "content-type": "application/json",
                            "token": sessionStorage.getItem("token")
                        },
                    });
                setMaterials(response.data);
            }
            catch (error) {
                console.log(error);
            }
        };
        fetchMaterials();
    }, []);

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
                                <select className="form-select" onChange={e => setMaterial(e.target.value)}>
                                    <option key={-1}>select</option>
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