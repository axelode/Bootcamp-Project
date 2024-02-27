// ########## OOP CONCEPT VERSION ##########

// class Testimoni {
//     constructor(name, testimoni, profile) {
//         this.name = name
//         this.testimoni = testimoni
//         this.profile = profile
//     }

//     render() {
//         const testimoniBox = document.getElementById("testimoni-box")
//         testimoniBox.innerHTML += `
//             <div class="card">
//                 <div class="image">
//                     <img
//                         src="${this.profile}"
//                         alt=""
//                         width="100%"
//                     />
//                 </div>
//                 <p>${this.testimoni}</p>
//                 <div class="name-bar">
//                     <h4>~ ${this.name}</h4>
//                 </div>
//             </div>
//         `
//     }
// }

// const testimoniData = [

//     new Testimoni("Laura", "Good, it's very good!", "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600"),
    
//     new Testimoni("Marco", "Mantep abangkuhh!", "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=600"),

//     new Testimoni("Dane", "11/10 abangkuhh!", "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600"),

//     new Testimoni("Bella", "Good job!", "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600"),

//     new Testimoni("Joe", "Menyala abangkuhh!", "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600"),

// ]

// testimoniData.forEach(Testimoni => Testimoni.render())






// ########## HOF VERSION ##########

const data = [
    {
        name: "Laura",
        testimoni: "Good, it's very good!",
        profile: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 3
    },
    {
        name: "Marco",
        testimoni: "Mantep abangkuhh!",
        profile: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 4
    },
    {
        name: "Dane",
        testimoni: "11/10 abangkuhh!",
        profile: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 2
    },
    {
        name: "Bella",
        testimoni: "Good job!",
        profile: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 5
    },
    {
        name: "Joe",
        testimoni: "Menyala abangkuhh!",
        profile: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600",
        rating: 2
    }
]

// show all data
function showAll() {
    let dataHTML = ""

    data.forEach(function (data) {
        dataHTML += `
            <div class="card">
                <div class="image">
                    <img
                        src="${data.profile}"
                        alt=""
                        width="100%"
                    />
                </div>
                <p>${data.testimoni}</p>
                <div class="name-bar">
                    <h4>~ ${data.name}</h4>
                </div>
                <div class="data-star">
                    <label>${data.rating}</label>
                    <img src="./assets/icons/star-black.svg" width="18px" />
                </div>
            </div>
        `
    })

    document.getElementById("testimoni-box").innerHTML = dataHTML
}

showAll()

// sort data by star
const sortData = (rating) => {
    let dataHtml = ""

    let dataFiltered = data.filter((data) => {
        return data.rating === rating
    })

    if(!dataFiltered.length) {
        dataHtml += "<h2>No data found!</h2>"
    }else {
        dataFiltered.forEach((data) => {
            dataHtml += `
                <div class="card">
                    <div class="image">
                        <img
                            src="${data.profile}"
                            alt=""
                            width="100%"
                        />
                    </div>
                    <p>${data.testimoni}</p>
                    <div class="name-bar">
                        <h4>~ ${data.name}</h4>
                    </div>
                    <div class="data-star">
                        <label>${data.rating}</label>
                        <img src="./assets/icons/star-black.svg" width="18px" />
                    </div>
                </div>
            `
        })
    }

    document.getElementById("testimoni-box").innerHTML = dataHtml
}