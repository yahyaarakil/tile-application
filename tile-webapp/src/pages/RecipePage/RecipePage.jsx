import React, { useState, useEffect } from "react";
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

    const submit = async () => {
        console.log(formState);
    }

    function addGlaze() {
        setFormState(form => ({
            ...form,
            glazes: [...form.glazes, {

            }]
        }))
    }

    function addPaint() {
        setFormState(form => ({
            ...form,
            paints: [...form.paints, {

            }]
        }))
    }


    function glazeChange(index, attr) {
        setFormState(form => ({
            ...form,
            glazes: form.glazes.map((glaze, targetIndex) => index === targetIndex ? {
                ...attr
            } : glaze)
        }))
    }

    const allGlazes = formState.glazes.map((material, index) =>
        <GlazeItem key={index} onChange={setFormState} />
    );

    const allPaints = formState.paints.map((material, index) =>
        <PaintItem onChange={setFormState} key={index} />
    );

    return (
        <div className="newItem">
            <div className="row">
                <div className="col-4">
                    <button className="btn btn-primary w-100" onClick={submit}>Save Recipe</button>
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






