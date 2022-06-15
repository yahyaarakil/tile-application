import React from "react";
import axios from "axios";

class UserItem extends React.Component {

    constructor() {
        super();
        this.state = {
            recipes: [],
            selectedRecipe: null,
            selectedRecipeObject: null,
            visible:false
        }
        this.getRecipes();

    }

    setName = (e) => {
        this.setState({ name: e.target.value })
    }

    getRecipes = async () => {
        let response = null;
        try {
            response = await axios.get('https://aeb157f3-dd85-42fc-9779-3a4328d5a230.mock.pstmn.io/recipes2');
        } catch (err) {
            console.error(err);
        }
        this.setState({ recipes: response.data });
    }

    handleRecipeChange = (e) => {
        this.setState({ selectedRecipe: e.target.value });
        console.log(e.target.value)
    };

    handleSubmit = () => {
        var item = this.state.recipes.find(item => item.ID.toString() === this.state.selectedRecipe);
        this.setState({ selectedRecipeObject: item });
        this.setState({ visible: true });
    };

    showRecipe = (args)  =>{
        if(args.visible){
            return (
                <>
                    <div className="row">
                        <div className="col-6">
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                            <p>{args.object.ID}</p>
                        </div>
                        <div className="col-6">
                            <p>asdasdasd</p>
                        </div>
                    </div>
                </>
            );
        }
        return<></>;
        
    }

    render() {
        return (
            <>
                <div className="card" style={{ width: "28rem" }}>
                    <div className="card-body">
                        <h4 className="card-title">Approved Recipes</h4>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <div className="dropdown">
                                        <select onChange={this.handleRecipeChange} className="btn">
                                            {this.state.recipes.map((item) => <option value={item.ID}>{item.Name + "-" + item.ID}</option>)}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-6">
                                    <p>Operations</p>
                                    <button className="btn btn-secondary btn-block" onClick={this.handleSubmit}>Show</button><br />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="card" style={{ width: "28rem" }}>
                        <div className="card-body">
                            <h4 className="card-title">Selected Recipe</h4>
                            <div className="container">
                                <this.showRecipe visible={this.state.visible} object = {this.state.selectedRecipeObject}/>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        );
    }
}

export const ApprovedRecipes = () => {
    return (
        <>
            <div className="d-flex flex-column align-items-center justify-content-center">
                <UserItem />
            </div>
        </>
    );
};
