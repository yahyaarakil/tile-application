import { useState } from "react";

export const PaintItem = () => {

    let dropdownItems = [
        {
            "name": "red",
            "code": 1,
            "company": "company a",
            "price": 123
        },
        {
            "name": "green",
            "code": 2,
            "company": "company a",
            "price": 456
        },
        {
            "name": "blue",
            "code": 3,
            "company": "company b",
            "price": 789
        }
    ];

    let [paintId, setPaint] = useState();
    let [grammage, setGrammage] = useState();


    let handlePaintChange = (e) => {
        setPaint(e.target.value);
    };

    let handleGrammage = (e) =>{
        setGrammage(e.target.value);
    }

    console.log(paintId, grammage);

    // function doasd(){
    //     const Material = require("../../db/models/material");
    //     let m = new Material({});
    //     m.save()
    // } to save;

    return (
        <>
            <div>
                <div class="card" style={{ width: "28rem" }}>
                    <div class="card-body">
                        <h4 class="card-title">Paint</h4>
                        <p class="card-text">
                            Select a paint and Grammage:
                        </p>
                        <div class="container">
                            <div class="row">
                                <div class="col-6">
                                    <input onInput={handleGrammage} type="number" step="0.01" class="form-control" placeholder="Grammage" aria-describedby="basic-addon1" />
                                </div>
                                <div class="col-6">
                                    <div class="dropdown">
                                        <select onChange={handlePaintChange} class="btn btn-secondary">
                                            {dropdownItems.map((item) => <option value={item.code}>{item.name+"-"+item.company}</option>)}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


        </>
    );
}
export default PaintItem;