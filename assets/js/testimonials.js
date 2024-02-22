class Testimoni {
    constructor(name, testimoni, profile) {
        this.name = name
        this.testimoni = testimoni
        this.profile = profile
    }

    render() {
        const testimoniBox = document.getElementById("testimoni-box")
        testimoniBox.innerHTML += `
            <div class="card">
                <div class="image">
                    <img
                        src="${this.profile}"
                        alt=""
                        width="100%"
                    />
                </div>
                <p>${this.testimoni}</p>
                <div class="name-bar">
                    <h4>~ ${this.name}</h4>
                </div>
            </div>
        `
    }
}

const laura = new Testimoni("Laura", "Good, it's very good!", "https://images.pexels.com/photos/712513/pexels-photo-712513.jpeg?auto=compress&cs=tinysrgb&w=600")

const marco = new Testimoni("Marco", "Mantep abangkuhh!", "https://images.pexels.com/photos/769745/pexels-photo-769745.jpeg?auto=compress&cs=tinysrgb&w=600")

const dane = new Testimoni("Dane", "11/10 abangkuhh!", "https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=600")

const bella = new Testimoni("Bella", "Good job!", "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=600")

laura.render()
marco.render()
dane.render()
bella.render()