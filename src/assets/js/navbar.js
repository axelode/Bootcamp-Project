function renderNav(btnOne, btnTwo, btnThree, btnFour) {
    document.getElementById("nav").innerHTML = `
        <div class="container-fluid z-index-100">
            <a class="navbar-brand me-5" href="#">
                <img src="/assets/icons/brandred.png" alt="" width="50px">
            </a>

            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>

            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="/">${btnOne}</a>
                    </li>

                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="/addProject">${btnTwo}</a>
                    </li>
                    
                    <li class="nav-item">
                        <a class="nav-link fw-bold" href="/testimonials">${btnThree}</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <a href="/contactMe">
                        <button class="btn btn-dark fw-bold">${btnFour}</button>
                    </a>
                </div>
            </div>
        </div>
    `
}

renderNav("Home", "Add Project", "Testimonials", "Contact Me")