import React, { useState, useRef } from "react";
import axios from "axios";
import BakerItem from './BakerItem';
import FormItem from './FormItem';
import DryingItem from './DryingItem';
import PaintItem from './PaintItem';
import GlazeItem from './GlazeItem';

export const RecipePage = () => {
    const [formState, setFormState] = useState({
        Name: "",
        Size: "",
        MoldShape: "",
        FormNo: "",
        BakerName: "",
        BakingDuration: "",
        BakingTemp: "",
        DryingTemp: "",
        DryingDuration: "",
        Humidity: "",
        InitialTemp: "",
        Materials: [],
        Paints: []
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formState)
        try {
            console.log("asdasdasd")
            console.log(formState)
            
            axios.post("http://localhost:8080/addrecipe",
                formState
                ,
                {
                    headers: {
                        "content-type": "application/json",
                        "token": sessionStorage.getItem("token")
                    }
                }
            )
                .then(function (response) {
                    if (response.status === 200) {

                        console.log("added the recipe");
                        window.alert('added the recipe');
                        window.location.reload();
                    }
                })

        } catch (err) {
            if (!err?.response) {
                console.log("No Server Response");
            }
            else {
                console.log("add Failed");
            }
        }

    }

    const uniqueIdCounter = useRef(0);

    function addGlaze() {
        setFormState(form => ({
            ...form,
            Materials: [...form.Materials, {
                id: ++uniqueIdCounter.current,
            }]
        }))
    }

    function addPaint() {
        setFormState(form => ({
            ...form,
            Paints: [...form.Paints, {
                id: ++uniqueIdCounter.current,
            }]
        }))
    }

    function paintChange(id, value) {
        setFormState(form => ({
            ...form,
            Paints: form.Paints.map((paint) => paint.id === id ? { id, ...value } : paint)
        }))
    }

    function glazeChange(id, value) {
        setFormState(form => ({
            ...form,
            Materials: form.Materials.map((glaze) => glaze.id === id ? { id, ...value } : glaze)
        }))
    }

    const allMaterials = formState.Materials.map((glaze) =>
        <GlazeItem key={glaze.id} onChange={(value) => glazeChange(glaze.id, value)} />
    );

    const allPaints = formState.Paints.map((paint, index) =>
        <PaintItem key={paint.id} onChange={(value) => paintChange(paint.id, value)} />
    );

    return (
        <div>
            <div className="row mb-4">
                <div className="col-4">
                    <button className="btn btn-success w-100" onClick={handleSubmit}>Save Recipe</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-primary w-100" onClick={addGlaze}>Add Glaze</button>
                </div>
                <div className="col-4">
                    <button className="btn btn-primary w-100" onClick={addPaint}>Add Paint</button>
                </div>
            </div>
            <div className="row">
                <div className="col-4">
                    <div>
                        <FormItem onChange={setFormState} />
                        <BakerItem onChange={setFormState} />
                        <DryingItem onChange={setFormState} />
                    </div>
                </div>
                <div className="col-4">
                    {allMaterials}
                </div>
                <div className="col-4">
                    {allPaints}
                </div>
            </div>
        </div>
    );
};

