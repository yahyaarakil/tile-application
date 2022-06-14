import React, { useState } from "react";
import GlazeItem from "./GlazeItem";
import axios from "axios";

class FormItem extends React.Component {

    constructor() {
        super();
        this.state = {
            productName: null,
            size: null,
            moldShape: null,
            creationDate: 0,
            formNo: 0
        }
    }

    setProductName = (e) => {
        this.setState({ productName: e.target.value })
    }

    setSize = (e) => {
        this.setState({ size: e.target.value })
    }

    setMoldShape = (e) => {
        this.setState({ moldShape: e.target.value })
    }

    setCreationDate = (e) => {
        this.setState({ creationDate: e.target.value })
    }

    setFormNo = (e) => {
        this.setState({ formNo: e.target.value })
    }

    render() {
        return (
            <>
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Form</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <p>Product Name</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setProductName(e)} />
                                    <p>Size</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setSize(e)} />
                                    <p>Mold Shape</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setMoldShape(e)} />
                                </div>
                                <div className="col-6">
                                    <p>Creation Date</p>
                                    <input type="date" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setCreationDate(e)} />
                                    <p>Form No</p>
                                    <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setFormNo(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}


class DryingItem extends React.Component {
    constructor() {
        super();
        this.state = {
            dryingTemp: 0,
            humidity: 0,
            initialTemp: 0,
            dryingDuration: 0
        }
    }

    setDryingTemp = (e) => {
        this.setState({ dryingTemp: e.target.value })
    }

    setHumidity = (e) => {
        this.setState({ humidity: e.target.value })
    }

    setInitialTemp = (e) => {
        this.setState({ initialTemp: e.target.value })
    }

    setDryingDuration = (e) => {
        this.setState({ dryingDuration: e.target.value })
    }

    render() {
        return (
            <>
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Dryer</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <p>Drying Temp</p>
                                    <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setDryingTemp(e)} />
                                    <p>Drying Duration</p>
                                    <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setDryingDuration(e)} />
                                </div>
                                <div className="col-6">
                                    <p>Humidity</p>
                                    <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setHumidity(e)} />
                                    <p>Initial Temperature</p>
                                    <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setInitialTemp(e)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
}

class BakerItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bakerName: null,
            bakingTemp: 0,
            bakingDuration: 0
        }


    }

    setName = (e) => {
        this.setState({ bakerName: e.target.value })
    }

    setBakingTemp = (e) => {
        this.setState({ bakingTemp: e.target.value })
    }

    setBakingDuration = (e) => {
        this.setState({ bakingDuration: e.target.value })
    }

    render() {
        return (<>
            <div className="card" style={{ width: "28rem" }}>
                <div className="card-body">
                    <h4 className="card-title">Baker</h4>
                    <div className="container">
                        <div className="row">
                            <div className="col-6">
                                <p>Baker Name</p>
                                <input type="text" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setName(e)} />
                                <p>Baking Duration</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setBakingDuration(e)} />
                            </div>
                            <div className="col-6">
                                <p>Baking Temperature</p>
                                <input type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" onChange={e => this.setBakingTemp(e)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>);
    }
}

class PaintItem2 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            grammage: 0,
            materials: [],
            selectedMaterial: null
        }

        this.getMaterials();
    }

    getMaterials = async () => {
        let response = null;
        try {
            response = await axios.get('https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/materials');
        } catch (err) {
            console.error(err);
        }
        this.setState({ materials: response.data })
    }

    handlePaintChange = (e) => {
        this.setState({ selectedMaterial: e.target.value });
    };

    render() {
        return (
            <>
                <div className="paintitem">
                    <div className="card" style={{ width: "28rem" }}>
                        <div className="card-body">
                            <h4 className="card-title">Paint</h4>
                            <p className="card-text">
                                Select a paint and Grammage:
                            </p>
                            <div className="container">
                                <div className="row">
                                    <div className="col-6">
                                        <input type="number" step="0.01" className="form-control" placeholder="Grammage" aria-describedby="basic-addon1" />
                                    </div>
                                    <div className="col-6">
                                        <div className="dropdown">
                                            <select onChange={this.handlePaintChange} className="btn">
                                                {this.state.materials.map((item) => <option value={item.id}>{item.name + "-" + item.company}</option>)}
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
}

class GlazeItem2 extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            applicaitonType: 0,
            waterContent: 0,
            density: 0,
            viscosity:0,
            materials: [],
            counter: 0,
            inputList:[]
        }

        this.getMaterials();
    }
    
    setApplicaitonType = (e) => {
        this.setState({ applicaitonType: e.target.value });
    };
    setWaterContent = (e) => {
        this.setState({ waterContent: e.target.value });
    };
    setDensity = (e) => {
        this.setState({ density: e.target.value });
    };
    setViscosity = (e) => {
        this.setState({ viscosity: e.target.value });
    };


    getMaterials = async () => {
        let response = null;
        try {
            response = await axios.get('https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/materials');
        } catch (err) {
            console.error(err);
        }
        this.setState({ materials: response.data })
    }

    handlePaintChange = (e) => {
        this.setState({ selectedMaterial: e.target.value });
    };
            
    
    Input = () => {

        if (this.state.counter < 8) {
            return <div className="newItem">
            <select onChange={this.handlePaintChange} className="btn">

                {
                    this.state.materials.map((item) =>
                        <option value={item.code}>{item.name + "-" + item.company}</option>)
                }
            </select>
        </div>;
        }else{
            return;
        }

        
    };


    onAddBtnClick = (e) => {
        if (this.state.counter < 8) {
            this.state.counter++;
            this.setState({inputList: [...this.state.inputList, <this.Input />]});
            //this.state.inputList.concat(<this.Input />);
        }
        
    };

    onRmvBtnClick = (e) => {
        if (this.state.counter > 0) {
            this.state.counter--;
            this.setState({inputList: this.state.inputList.slice(<this.Input />,-1)});
            //this.state.inputList.slice(<this.Input />,-1);
        }
    };

    render(){
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
                                                <button className="btn btn-secondary" onClick={this.onAddBtnClick}>+</button>
                                            </div>
                                            <div className="col-6">
                                                <button className="btn btn-secondary" onClick={this.onRmvBtnClick}>-</button>
                                            </div>
    
                                        </div>
                                        {this.state.inputList}
                                    </div>
                                    <div className="col-6">
                                        <p>Application Type</p>
                                        <input onInput={this.setApplicaitonType}
                                            type="text" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                        <p>Water Content</p>
                                        <input onInput={this.setWaterContent}
                                            type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                        <p>Density</p>
                                        <input onInput={this.setDensity}
                                            type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                        <p>Viscosity</p>
                                        <input onInput={this.setViscosity}
                                            type="number" step="0.01" className="form-control" aria-describedby="basic-addon1" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    
}

const PaintInput = () => {
    return <PaintItem2 />;
};
const GlazeInput = () => {
    return <GlazeItem2 />;
};


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
                    <button className="btn btn-secondary" onClick={onAddGlazeBtnClick}>Add Glaze</button>
                    <button className="btn btn-secondary" onClick={onAddPaintBtnClick}>Add Paint</button>
                    <button className="btn btn-secondary">Save Recipe</button>
                    <div>
                        <FormItem/>
                        <BakerItem/>
                        <DryingItem/>
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        {glazeInputList}
                    </div>
                </div>
                <div className="col-4">
                    <div>
                        {PaintInputList}
                    </div>
                </div>
            </div>

        </>
    );
};