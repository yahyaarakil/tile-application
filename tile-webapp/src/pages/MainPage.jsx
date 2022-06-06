export const MainPage = () => {

    let logOutLink = "http://localhost:3000/login";
    let profileLink = "http://localhost:3000/profile";
    let recipeLink = "http://localhost:3000/createrecipe";

    return (
        <>
            <div className="d-flex" id="wrapper">
                <div className="border-end bg-white" id="sidebar-wrapper">
                    <div className="list-group list-group-flush">
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href={recipeLink}>Recipes</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href={profileLink}>Profile</a>
                        <a className="list-group-item list-group-item-action list-group-item-light p-3" href={logOutLink}>Logout</a>
                    </div>
                </div>
                <div id="page-content-wrapper">
                    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation"><span className="navbar-toggler-icon"></span></button>
                        </div>
                    </nav>
                    <div className="container-fluid">
                        <h1 className="mt-4">Ceramic Tile Generator</h1>
                        <p>Create your tile with given items and the program will handle the rest.</p>
                        <p>
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Molestias commodi temporibus doloremque aperiam unde numquam soluta ab excepturi nemo error saepe maxime, laudantium consequuntur suscipit omnis ipsam eligendi voluptatum dignissimos. Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum sed quisquam ipsa! Inventore aperiam distinctio iste nihil officia laboriosam est a enim minus, quisquam, incidunt sed qui non labore praesentium iure, eveniet velit atque repellendus officiis iusto dolorum nulla magni. Eaque sunt neque odio ipsa, id culpa iure rem incidunt praesentium dolore porro doloremque quae pariatur. Debitis tenetur, eaque eveniet aliquid quam fugiat harum ex quaerat eos ad distinctio, iusto vel excepturi ipsum! Praesentium, consequatur accusantium. Vitae dolore corporis quisquam perferendis ipsum laborum tenetur nam vel suscipit, iste error blanditiis, maxime aperiam. Quasi laboriosam labore, maiores illo sint voluptate aliquid!
                        </p>
                    </div>
                        <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel" >
                            <ol className="carousel-indicators">
                                <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                                <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            </ol>
                            <div className="carousel-inner">
                                <div className="carousel-item active">
                                    <img className="d-block w-100" src="https://www.termalseramik.com/wp-content/uploads/2022/01/PEGA-WOOD-MIX-30x120-091221-scaled.jpg" alt="First slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="https://www.termalseramik.com/wp-content/uploads/2022/01/MONTGOMERY-BLACK-30X120.jpg" alt="Second slide" />
                                </div>
                                <div className="carousel-item">
                                    <img className="d-block w-100" src="https://www.termalseramik.com/wp-content/uploads/2022/01/30X120-LUXEMBURG-scaled.jpg" alt="Third slide" />
                                </div>
                            </div>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </div>
                    </div>
                </div>
        </>
    )
}

