import axios from "axios";
import { useState, useEffect } from "react";

export const PaintItem = () => {

    const [materials, setMaterials] = useState([]);
    
    const getMaterials = async () => {
        try {
            const response = await axios.get('https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/materials');
            setMaterials(response.data);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getMaterials();
    }, []);

    

    let [paintId, setPaint] = useState();
    let [grammage, setGrammage] = useState();


    let handlePaintChange = (e) => {
        setPaint(e.target.value);
    };

    let handleGrammage = (e) => {
        setGrammage(e.target.value);
    }

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
                                    <input onInput={handleGrammage} type="number" step="0.01" className="form-control" placeholder="Grammage" aria-describedby="basic-addon1" />
                                </div>
                                <div className="col-6">
                                    <div className="dropdown">
                                        <select onChange={handlePaintChange} className="btn">
                                            {materials.map((item) => <option value={item.id}>{item.name + "-" + item.company}</option>)}
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

