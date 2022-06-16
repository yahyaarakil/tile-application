import React, { useState, useEffect } from "react";
import axios from "axios";

function GlazeItem({ onChange }) {
    const [applicationType, setApplicationType] = useState("");
    const [waterContent, setWaterContent] = useState("");
    const [density, setDensity] = useState("");
    const [viscosity, setViscosity] = useState("");
    const [material, setMaterial] = useState("");
    const [MATERIAL_OPTIONS, setMaterials] = useState([]);

    useEffect(() => {
        onChange({
            code:Number(material),
            info:{
                amount:Number(31),
                applicationType,
                waterContent:Number(waterContent),
                density:Number(density),
                viscosity:Number(viscosity)
            }
            
        });
    }, [material, applicationType, waterContent, density, viscosity])

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
        <div className="card " style={{marginBottom:"20px", "height":"420px" }}>
            <div className="card-body">
                <div className="newItem">
                    <h4>Material</h4>
                    <p>Select material and grammage</p>
                    <div className="row">
                        <div className="col-6">
                            <p>Material</p>
                            <select className="form-select" onChange={e => setMaterial(e.target.value)}>
                                <option key={-1}>select</option>
                                {MATERIAL_OPTIONS.map((materialOptions) => <option key={materialOptions.code} value={materialOptions.code}>{materialOptions.name}</option>)}
                            </select>
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


