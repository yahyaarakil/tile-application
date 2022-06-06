import { useState } from "react";

var counter = 0;//this needs to be fixed, global var.

export const GlazeItem = () => {

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

    let [applicaitonType, setAppType] = useState();
    let [waterContent, setWaterContent] = useState();
    let [density, setDensity] = useState();
    let [viscosity, setViscosity] = useState();


    let handleAppTypeChange = (e) => {
        setAppType(e.target.value);
    };

    let handleWaterContentChange = (e) => {
        setWaterContent(e.target.value);
    }

    let handleDensityChange = (e) => {
        setDensity(e.target.value);
    };

    let handleViscosityChange = (e) => {
        setViscosity(e.target.value);
    }


    let [paintId, setPaint] = useState();
    let handlePaintChange = (e) => {
        setPaint(e.target.value);
    };

    
    const Input = () => {

        if (counter < 8) {
            return <div className="newItem">
            <select onChange={handlePaintChange} className="btn">

                {
                    dropdownItems.map((item) =>
                        <option value={item.code}>{item.name + "-" + item.company}</option>)
                }
            </select>
        </div>;
        }else{
            return;
        }

        
    };

    const [inputList, setInputList] = useState([]);

    const onAddBtnClick = (e) => {
        if (counter < 8) {
            counter++;
            setInputList(inputList.concat(<Input />));
        }
        
    };

    const onRmvBtnClick = (e) => {
        if (counter > 0) {
            counter--;
            setInputList(inputList.slice(<Input />,-1));
        }
    };

    console.log(applicaitonType,waterContent,density,viscosity,paintId);

    return (
        <>
            <div>
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Material</h4>
                        <p className="card-text">
                            Select an Material and Grammage:
                        </p>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">

                                    <div className="row">
                                        <div className="col-6">
                                            <button className="btn btn-secondary" onClick={onAddBtnClick}>+</button>
                                        </div>
                                        <div className="col-6">
                                            <button className="btn btn-secondary" onClick={onRmvBtnClick}>-</button>
                                        </div>

                                    </div>
                                    {inputList}
                                </div>
                                <div className="col-6">
                                    <p>Application Type</p>
                                    <input onInput={handleAppTypeChange}
                                        type="text" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                    <p>Water Content</p>
                                    <input onInput={handleWaterContentChange}
                                        type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                    <p>Density</p>
                                    <input onInput={handleDensityChange}
                                        type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                    <p>Viscosity</p>
                                    <input onInput={handleViscosityChange}
                                        type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GlazeItem;