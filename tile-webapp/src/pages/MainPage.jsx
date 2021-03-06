
import img1 from '../images/20X90-RIOWOOD-BROWN.jpg';
import img2 from '../images/30X120-LUXEMBURG-scaled.jpg';
import img3 from '../images/PEGA-WOOD-MIX-30x120-091221-scaled.jpg';

export const MainPage = () => {
    let logOutLink = "http://localhost:3000/";
    let recipeLink = "http://localhost:3000/createrecipe";
    let unapprovedLink = "http://localhost:3000/unapprovedrecipes";
    let approvedLink = "http://localhost:3000/approvedrecipes";
    let manageusers = "http://localhost:3000/manageusers";
    let managematerials = "http://localhost:3000/managematerials";

    const AdminBar = () => {
        return (
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={manageusers}>Add/Update Users</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={managematerials}>Add/Update Material</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={approvedLink}>List Approved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={logOutLink}>Logout</a>
            </div>
        );
    };

    const ManagerBar = () => {
        return (
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={unapprovedLink}>List Unapproved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={approvedLink}>List Approved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={logOutLink}>Logout</a>
            </div>
        );
    };

    const RDBar = () => {
        return (
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={recipeLink}>Create Recipe</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={unapprovedLink}>List Unapproved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={approvedLink}>List Approved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={logOutLink}>Logout</a>
            </div>
        );
    };

    const UserBar = () => {
        return (
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={approvedLink}>List Approved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={logOutLink}>Logout</a>
            </div>
        );
    };

    const TestBar = () => {
        return (
            <div className="list-group list-group-flush">
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={manageusers}>Add/Update Users</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={managematerials}>Add/Update Material</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={recipeLink}>Create Recipe</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={unapprovedLink}>List Unapproved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={approvedLink}>List Approved Recipes</a>
                <a className="list-group-item list-group-item-action list-group-item-light p-3" href={logOutLink}>Logout</a>
            </div>
        );
    };

    function NavBarItems(props) {
        const option = props.option;
        if (option === 2) {
            return <AdminBar />
        }
        if (option === 1) {
            return <ManagerBar />
        }
        if (option === 3) {
            return <RDBar />
        }
        if (option === 4) {
            return <UserBar />
        }
        if (option === 4) {
            return <TestBar />
        }
    }

    var role = sessionStorage.getItem("role");
    console.log(role)
    return (
        <>
            <div className="d-flex" id="wrapper">
                <div className="border-end bg-white" id="sidebar-wrapper">
                    <NavBarItems option={parseInt(role)} />
                </div>
                <div id="page-content-wrapper">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-12" style={{
                                "display": "flex",
                                "justifyContent": "center"
                            }}>
                                <img src="https://www.termalseramik.com/wp-content/uploads/2022/01/logooo.png" alt="Termal Seramik Logo" />
                            </div>
                        </div>
                        <div id="items" className="carousel slide" data-bs-ride="true">
                            <div className="carousel-indicators">
                                <button type="button" data-bs-target="#items" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                                <button type="button" data-bs-target="#items" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#items" data-bs-slide-to="2" aria-label="Slide 3"></button>
                            </div>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src={img1} alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={img2} alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src={img3} alt="Third slide" />
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#items" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span>Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#items" data-bs-slide="next">
                                <span>Next</span>
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>

                            </button>

                        </div>

                        <p align="justify">Create your tile with given items and the program will handle the rest.</p>

                        <p align="justify">Ceramic is today's one of the most modern and technological decoration materials and it was used since the beginning of the history.</p>

                        <p align="justify">The foundations of ???TermaI Seramik??? were laid in S??????t - Bilecik in 1995, which started to produce ceramics so that customers with different needs and wishes can create the spaces of their dreams by bringing technology, nature and people together. The annual production capacity of Termal Seramik, which started production in its first factory in 1997 and in its second factory in 2005, reached 28,000,000 m2 with the commissioning of its new investment in December 2021.</p>

                        <p align="justify">New investments enabled Termal Seramik to produce Porcelain Floor Tiles of sizes such as 80x80, 60x60, 60x90, 30x120, 60x120, 75x150; Wall Tiles of sizes such as 30x90, 30x75 and Parquet Porcelain Tiles of sizes such as 15x60, 20x90, 30x120. Regular Porcelain Products of sizes such as 30x60, 45x45 and 33x33 and Wall Tiles of sizes such as 30x60, 10x20, 10x40 are being produced as well. Our factory is capable of offering all these products in ???rectified??? and ???non - rectified??? solution. Colored body and 20mm thick tile products are also offered to customers.</p>

                        <p align="justify">The products produced in Termal Seramik, which currently produces with approximately 1,300 people and has both national and international certifications, go through detailed production and control stages in accordance with the Total Quality Management.</p>

                    </div>





                </div>
            </div>
        </>
    )
}

