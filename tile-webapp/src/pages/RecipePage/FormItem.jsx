import React, { useState, useEffect } from "react";

function FormItem({ onChange }) {
    const [Name, setProductName] = useState("");
    const [Size, setSize] = useState("");
    const [MoldShape, setMoldShape] = useState("");
    const [FormNo, setFormNo] = useState("");

    useEffect(() => {
        onChange(prevValue => ({
            ...prevValue,
            Name,
            Size,
            MoldShape,
            FormNo:Number(FormNo)
        }));
    }, [Name, Size, MoldShape, FormNo]);

    return (

        <div className="card" style={{ marginBottom: "20px" }}>
            <div className="card-body">
                <h4 className="card-title">Form</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <p>Product Name</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setProductName(e.target.value)} />
                            <p>Size</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setSize(e.target.value)} />

                        </div>
                        <div className="col-6">
                            <p>Mold Shape</p>
                            <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => setMoldShape(e.target.value)} />
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