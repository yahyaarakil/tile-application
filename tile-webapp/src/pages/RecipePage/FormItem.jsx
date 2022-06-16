import React, { useState, useEffect } from "react";

function FormItem({ onChange }) {
    const [productName, setProductName] = useState("");
    const [size, setSize] = useState("");
    const [moldShape, setMoldShape] = useState("");
    const [creationDate, setCreationDate] = useState("");
    const [formNo, setFormNo] = useState("");

    useEffect(() => {
        onChange(prevValue => ({
            ...prevValue,
            productName,
            size,
            moldShape,
            creationDate,
            formNo
        }));
    }, [productName, size, moldShape, creationDate, formNo]);

    return (

        <div className="card" style={{marginBottom:"20px"}}>
            <div className="card-body">
                <h4 className="card-title">Form</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <p>Product Name</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setProductName(e.target.value)} />
                            <p>Size</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setSize(e.target.value)} />
                            <p>Mold Shape</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setMoldShape(e.target.value)} />
                        </div>
                        <div className="col-6">
                            <p>Creation Date</p>
                            <input type="date" className="form-control" aria-describedby="basic-addon1" onChange={e => setCreationDate(e.target.value)} />
                            <p>Form No</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setFormNo(e.target.value)} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default FormItem;