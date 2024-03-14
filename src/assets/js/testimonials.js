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

// const data = [
//     {
//         name: "Laura",
//         testimoni: "Good, it's very good!",
//         profile: "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 3
//     },
//     {
//         name: "Marco",
//         testimoni: "Mantep abangkuhh!",
//         profile: "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 4
//     },
//     {
//         name: "Dane",
//         testimoni: "11/10 abangkuhh!",
//         profile: "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 2
//     },
//     {
//         name: "Bella",
//         testimoni: "Good job!",
//         profile: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 5
//     },
//     {
//         name: "Joe",
//         testimoni: "Menyala abangkuhh!",
//         profile: "https://images.pexels.com/photos/1121796/pexels-photo-1121796.jpeg?auto=compress&cs=tinysrgb&w=600",
//         rating: 2
//     }
// ]


// get data from API
const getDataApi = () => {
    return new Promise((resolve, reject) => {
        const apiKey =  "https://api.npoint.io/1465052a4f4453fb4ba3"
    
        const xhr = new XMLHttpRequest()
    
        xhr.open("GET", apiKey)
    
        xhr.onload = () => {
            if(xhr.status === 200) {
                resolve(JSON.parse(xhr.response))
            }else {
                reject("Error Loading Data!")
            }
        }

        xhr.onerror = () => reject("Network Error!")
    
        xhr.send()
    })
}

// show all data
const showAllData = async () => {
    try {
        const response = await getDataApi()

        let dataHtml = ""

        if(!response.data.length) {
            dataHtml += "<h3>No Data Found!</h3>"
        } else {
            for(let i = 0; i < response.data.length; i++) {
                dataHtml += `
                    <div class="card mb-4 shadow p-3" style="width: 400px;">
                        <div class="mb-3 overflow-hidden rounded" style="height: 200px;">
                            <img
                                src="${response.data[i].image}"
                                class="card-img-top"
                                alt="Poster"
                            />
                        </div>
                        <p>${response.data[i].comment}</p>
                        <div class="d-flex justify-content-end">
                            <h6 class="fw-bold">~ ${response.data[i].author}</h6>
                        </div>
                        <div class="d-flex justify-content-end gap-2">
                            <label>${response.data[i].rate}</label>
                            <img src="./assets/icons/star-black.svg" width="18px" />
                        </div>
                    </div>
                `
            }
        }

        document.getElementById("testimoni-box").innerHTML = dataHtml

    } catch (error) {
        console.log(error)
    }
}

showAllData()

// sort data by star
const sortData = async (rating) => {
    try {
        const response = await getDataApi()

        let dataHtml = ""

        const dataFiltered = response.data.filter((data) => {
            return data.rate === rating
        })

        if(!dataFiltered.length) {
            dataHtml += "<h3>No Data Found!</h3>"
        } else {
            for(let i = 0; i < dataFiltered.length; i++) {
                dataHtml += `
                    <div class="card mb-4 p-3 shadow" style="width: 400px;">
                        <div class="mb-3 overflow-hidden rounded" style="height: 200px;">
                            <img
                                src="${dataFiltered[i].image}"
                                class="card-img-top"
                                alt="Poster"
                                width="100%"
                            />
                        </div>
                        <p>${dataFiltered[i].comment}</p>
                        <div class="d-flex flex-column align-items-end">
                            <h6 class="fw-bold">~ ${dataFiltered[i].author}</h6>
                            <div class="d-flex gap-2">
                                <label>${dataFiltered[i].rate}</label>
                                <img src="./assets/icons/star-black.svg" width="18px" />
                            </div>
                        </div>
                    </div>
                `
            }
        }

        document.getElementById("testimoni-box").innerHTML = dataHtml

    } catch (error) {
        console.log(error)
    }
}