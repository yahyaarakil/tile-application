import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import BakerItem from './BakerItem';
import FormItem from './FormItem';
import DryingItem from './DryingItem';
import PaintItem from './PaintItem';
import GlazeItem from './GlazeItem';

export const RecipePage = () => {
    const [formState, setFormState] = useState({
        productName: "",
        size: "",
        moldShape: "",
        creationDate: "",
        formNo: "",
        bakerName: "",
        bakingDuration: "",
        bakingTemp: "",
        dryingTemp: "",
        dryingDuration: "",
        humidity: "",
        initialTemp: "",
        glazes: [],
        paints: []
    });

    const uniqueIdCounter = useRef(0);


    const submit = async () => {
        console.log(formState);
    }

    function addGlaze() {
        setFormState(form => ({
            ...form,
            glazes: [...form.glazes, {
                id: ++uniqueIdCounter.current,
            }]
        }))
    }

    function addPaint() {
        setFormState(form => ({
            ...form,
            paints: [...form.paints, {
                id: ++uniqueIdCounter.current,
            }]
        }))
    }

    function paintChange(id, value) {
        setFormState(form => ({
            ...form,
            paints: form.paints.map((paint) => paint.id === id ? {id, ...value} : paint)
        })) 
    }

    function glazeChange(id, value) {
        setFormState(form => ({
            ...form,
            glazes: form.glazes.map((glaze) => glaze.id === id ? {id, ...value} : glaze)
        })) 
    }

    const allGlazes = formState.glazes.map((glaze) =>
        <GlazeItem key={glaze.id} onChange={(value) => glazeChange(glaze.id, value)} />
    );

    const allPaints = formState.paints.map((paint, index) =>
        <PaintItem key={paint.id} onChange={(value) => paintChange(paint.id, value)}  />
    );

    return (
        <div>
            <div className="row mb-4">
                <div className="col-4">
                    <button className="btn btn-success w-100" onClick={submit}>Save Recipe</button>
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
                    {allGlazes}
                </div>
                <div className="col-4">
                    {allPaints}
                </div>
            </div>
        </div>
    );
};






