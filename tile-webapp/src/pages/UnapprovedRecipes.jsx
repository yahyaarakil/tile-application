import React, { useState, useEffect} from "react";
import axios from "axios";

function UnapprovedRecipes() {
    const [option, setOption] = useState("");
    const [visible = false, setVisible] = useState("");
    const [RECIPES, setRecipes] = useState([]);


    useEffect(() => {
        const fetchRecipes = async () => {
            try {
                let response = await axios.get("http://localhost:8080/recipes",
                    {
                        headers: {
                            "content-type": "application/json",
                            "token": sessionStorage.getItem("token")
                        },
                    });
                setRecipes(response.data);
                console.log(response.data)

            }
            catch (error) {
                console.log(error);
            }
        };
        fetchRecipes();
     }, []);
    function handleButton() {
        setVisible(true)
    }

    function search(key) {
        for (let i = 0; i < RECIPES.length; i++) {
            if (RECIPES[i].id.toString() === key) {
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
                                        <input id="ID" type="text" disabled={true} value={recipe.id}></input>  
                                        <label htmlFor="Name">Name:</label>
                                        <input id="Name" type="text" disabled={true} value={recipe.name}></input>  
                                        <label htmlFor="Size">Size:</label>
                                        <input id="Size" type="text" disabled={true} value={recipe.size}></input>  
                                        <label htmlFor="CreationDate">CreationDate:</label>
                                        <input id="CreationDate" type="text" disabled={true} value={recipe.creationDate}></input>  
                                        <label htmlFor="MoldShape">Mold Shape:</label>
                                        <input id="MoldShape" type="text" disabled={true} value={recipe.moldShape}></input>  
                                        <label htmlFor="BakerName">Baker Name:</label>
                                        <input id="BakerName" type="text" disabled={true} value={recipe.bakerName}></input>  
                                        <label htmlFor="InitTemp">Init Temp:</label>
                                        <input id="InitTemp" type="text" disabled={true} value={recipe.initTemp}></input>  
                                        <label htmlFor="Humidity">Humidity:</label>
                                        <input id="Humidity" type="text" disabled={true} value={recipe.humidity}></input>  
                                        <label htmlFor="DryingDuration">Drying Duration:</label>
                                        <input id="DryingDuration" type="text" disabled={true} value={recipe.dryingDuration}></input>  
                                        <label htmlFor="DryingTemp">Drying Temp:</label>
                                        <input id="DryingTemp" type="text" disabled={true} value={recipe.dryingTemp}></input>  
                                        <label htmlFor="BakingDuration">Baking Duration:</label>
                                        <input id="BakingDuration" type="text" disabled={true} value={recipe.bakingDuration}></input>  
                                        <label htmlFor="BakingTemp">Baking Temp:</label>
                                        <input id="BakingTemp" type="text" disabled={true} value={recipe.bakingTemp}></input>  
                                        <label htmlFor="PreviousVersion">Previous Version:</label>
                                        <input id="PreviousVersion" type="text" disabled={true} value={recipe.previousVersion?recipe.previousVersion:""}></input>  
                                        <label htmlFor="Approved">Approved:</label>
                                        <input id="Approved" type="text" disabled={true} value={recipe.approved}></input>  
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
                            <option key={-1}>select</option>
                                {RECIPES.map((recipes) => <option key={recipes.id}>{recipes.id + "-" + recipes.name + " " + recipes.size}</option>)}
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