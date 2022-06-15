import React, { useState } from "react";

const RECIPES = [
    {
        "ID": 1,
        "Name": "recipe",
        "Size": "3x3",
        "CreationDate": "2022-06-03T18",
        "CreateAdBy": "oguzkaganaltas@gmail.com",
        "MoldShape": "moldshape1",
        "BakerName": "baker1",
        "InitTemp": 25.5,
        "Humidity": 20,
        "DryingDuration": "00:00:50",
        "DryingTemp": 90,
        "BakingDuration": "00:01:20",
        "BakingTemp": 50,
        "PreviousVersion": null,
        "Approved": 0,
        "Comment": "very good"
    },
    {
        "ID": 4,
        "Name": "recipe",
        "Size": "3x3",
        "CreationDate": "2022-06-04T13",
        "CreatedBy": "oguzkaganaltas@gmail.com",
        "MoldShape": "moldshape1",
        "BakerName": "baker1",
        "InitTemp": 25.5,
        "Humidity": 20,
        "DryingDuration": "00:00:50",
        "DryingTemp": 90,
        "BakingDuration": "00:01:20",
        "BakingTemp": 50,
        "PreviousVersion": null,
        "Approved": 0,
        "Comment": "very good"
    },
    {
        "ID": 7,
        "Name": "recipe",
        "Size": "3x3",
        "CreationDate": "2022-06-04T13",
        "CreatedBy": "oguzkaganaltas@gmail.com",
        "MoldShape": "moldshape1",
        "BakerName": "baker1",
        "InitTemp": 25.5,
        "Humidity": 20,
        "DryingDuration": "00:00:50",
        "DryingTemp": 90,
        "BakingDuration": "00:01:20",
        "BakingTemp": 50,
        "PreviousVersion": null,
        "Approved": 0,
        "Comment": "very good"
    },
    {
        "ID": 10,
        "Name": "recipe",
        "Size": "3x3",
        "CreationDate": "2022-06-14T20",
        "CreatedBy": "oguzkaganaltas@gmail.com",
        "MoldShape": "moldshape1",
        "BakerName": "baker1",
        "InitTemp": 25.5,
        "Humidity": 20,
        "DryingDuration": "00:00:50",
        "DryingTemp": 90,
        "BakingDuration": "00:01:20",
        "BakingTemp": 50,
        "PreviousVersion": null,
        "Approved": 0,
        "Comment": "very good"
    }
]


function UnapprovedRecipes() {
    const [option, setOption] = useState("");
    const [visible = false, setVisible] = useState("");

    function handleButton() {
        setVisible(true)
    }

    function search(key) {
        for (let i = 0; i < RECIPES.length; i++) {
            if (RECIPES[i].ID.toString() === key) {
                return RECIPES[i];
            }
        }
    }

    function handleApproveButton() {
        console.log("approved")
    }


    function ShowRecipe(props) {
        const [comment, setComment] = useState("");

        function handleCommentButton() {
            console.log(comment)
        }

        if (props.visible) {

            let recipe = search(props.recipe.toString().split("-")[0]);
            return (
                <div className="newItem">
                    <div className="card">
                        <div className="card-body">
                            <h4 className="card-title">Selected Recipe</h4>
                            <div className="container">
                                <div className="row">
                                    <div className="col-4 d-flex flex-column">
                                        <label htmlFor="ID">ID:</label>
                                        <input id="ID" type="text" disabled={true} value={recipe.ID}></input>
                                        <label htmlFor="Name">Name:</label>
                                        <input id="Name" type="text" disabled={true} value={recipe.Name}></input>
                                        <label htmlFor="Size">Size:</label>
                                        <input id="Size" type="text" disabled={true} value={recipe.Size}></input>
                                        <label htmlFor="CreationDate">CreationDate:</label>
                                        <input id="CreationDate" type="text" disabled={true} value={recipe.CreationDate}></input>
                                        <label htmlFor="MoldShape">Mold Shape:</label>
                                        <input id="MoldShape" type="text" disabled={true} value={recipe.MoldShape}></input>
                                        <label htmlFor="BakerName">Baker Name:</label>
                                        <input id="BakerName" type="text" disabled={true} value={recipe.BakerName}></input>
                                        <label htmlFor="InitTemp">Init Temp:</label>
                                        <input id="InitTemp" type="text" disabled={true} value={recipe.InitTemp}></input>
                                        <label htmlFor="Humidity">Humidity:</label>
                                        <input id="Humidity" type="text" disabled={true} value={recipe.Humidity}></input>
                                        <label htmlFor="DryingDuration">Drying Duration:</label>
                                        <input id="Dryinbtn-outline-primaryagDuration" type="text" disabled={true} value={recipe.DryingDuration}></input>
                                        <label htmlFor="DryingTemp">Drying Temp:</label>
                                        <input id="DryingTemp" type="text" disabled={true} value={recipe.DryingTemp}></input>
                                        <label htmlFor="BakingDuration">Baking Duration:</label>
                                        <input id="BakingDuration" type="text" disabled={true} value={recipe.BakingDuration}></input>
                                        <label htmlFor="BakingTemp">Baking Temp:</label>
                                        <input id="BakingTemp" type="text" disabled={true} value={recipe.BakingTemp}></input>
                                        <label htmlFor="PreviousVersion">Previous Version:</label>
                                        <input id="PreviousVersion" type="text" disabled={true} value={recipe.PreviousVersion?recipe.PreviousVersion:""}></input>
                                        <label htmlFor="Approved">Approved:</label>
                                        <input id="Approved" type="text" disabled={true} value={recipe.Approved}></input>

                                    </div>

                                    <div className="col-6 d-flex flex-column">
                                        <label htmlFor="Comment">Comment:</label>
                                        <input id="Comment" type="text" value={comment} className="form-control" aria-describedby="basic-addon1" onChange={e => setComment(e.target.value)} /><br />
                                        <button className="btn btn-primary" onClick={handleCommentButton}>Add Comment</button><br />
                                        <button className="btn btn-success" onClick={handleApproveButton}>Approve</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }

    }

    return (
        <div className="card">
            <div className="card-body">
                <h4 className="card-title">Unapproved Recipes</h4>
                <div className="container">
                    <div className="row">
                        <div className="col-6">
                            <select className="form-select" onClick={e => setVisible(false)} onChange={e => setOption(e.target.value)}>
                                {RECIPES.map((recipes) => <option key={recipes.ID}>{recipes.ID + "-" + recipes.Name + " " + recipes.Size}</option>)}
                            </select>
                        </div>
                        <div className="col-6">
                            <button className="btn btn-primary btn-block" onClick={handleButton}>Show</button><br />
                        </div>
                    </div>
                </div>
            </div>

            <ShowRecipe visible={visible} recipe={option} />

        </div>
    );
}

export default UnapprovedRecipes;