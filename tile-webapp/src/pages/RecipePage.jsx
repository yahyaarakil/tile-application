import PaintItem from "./PaintItem";
import React, { useState } from "react";


const Input = () => {
    return <PaintItem />;
};

export const RecipePage = () => {

    const [inputList, setInputList] = useState([]);

    const onAddBtnClick = (e) => {
        setInputList(inputList.concat(<Input key={inputList.length} />));
    };

    return (
        <>
            <div>
                <button class="btn btn-secondary" onClick={onAddBtnClick}>Add Paint</button>
                {inputList}
            </div>
        </>
    );
};