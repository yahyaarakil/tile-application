import PaintItem from "./PaintItem";
import React, { useState } from "react";
import GlazeItem from "./GlazeItem";




const PaintInput = () => {
    return <PaintItem />;
};
const GlazeInput = () => {
    return <GlazeItem />;
};

const FormItem = () => {

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
    let handlePaintChange = (e) => {
        setPaint(e.target.value);
    };

    return (
        <>
            <div className="card" style={{ width: "28rem" }}>
                <div className="card-body">
                    <h4 className="card-title">Form</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <p>Product Name</p>
                                <input type="text" className="form-control" aria-describedby="basic-addon1" />
                                <p>Size</p>
                                <input type="text" className="form-control" aria-describedby="basic-addon1" />
                                <p>Mold Shape</p>
                                <select onChange={handlePaintChange} className="btn">

                                    {
                                        dropdownItems.map((item) =>
                                            <option value={item.code}>{item.name + "-" + item.company}</option>)
                                    }
                                </select>
                            </div>
                            <div className="col-6">
                                <p>Creation Date</p>
                                <input type="date" className="form-control" aria-describedby="basic-addon1" />
                                <p>Form No</p>
                                <input type="text" className="form-control" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}


const DryingItem = () => {
    return (
        <>
            <div className="card" style={{ width: "28rem" }}>
                <div className="card-body">
                    <h4 className="card-title">Dryer</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <p>Drying Temp</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                <p>Drying Duration</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            </div>
                            <div className="col-6">
                                <p>Humidity</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                <p>Initial Temperature</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}


const BakerItem = () => {
    return (
        <>
            <div className="card" style={{ width: "28rem" }}>
                <div className="card-body">
                    <h4 className="card-title">Baker</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <p>Baker Name</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                <p>Baking Duration</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            </div>
                            <div className="col-6">
                                <p>Baking Temperature</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export const RecipePage = () => {

    const [PaintInputList, setPaintInputList] = useState([]);
    const [glazeInputList, setGlazeInputList] = useState([]);

    const onAddPaintBtnClick = (e) => {
        setPaintInputList(PaintInputList.concat(<PaintInput key={PaintInputList.length} />));
    };

    const onAddGlazeBtnClick = (e) => {
        setGlazeInputList(glazeInputList.concat(<GlazeInput key={glazeInputList.length} />));
    };

    return (
        <>



            <div className="row">
                <div className="col-4">
                    <div>
                        <FormItem />
                        <DryingItem />
                        <BakerItem />
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <button class="btn btn-secondary" onClick={onAddGlazeBtnClick}>Add Glaze</button>
                        {glazeInputList}

                    </div>
                </div>
                <div className="col-4">
                    <div>
                        <button class="btn btn-secondary" onClick={onAddPaintBtnClick}>Add Paint</button>
                        {PaintInputList}
                    </div>
                </div>

            </div>

        </>
    );
};