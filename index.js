
const baseurl = 'https://restwine.azurewebsites.net/api/Wine';
Vue.createApp({
    data() {
        return {
            Wines : [],
            allwnines : [],
            deleteId : 0,
            deleteMessage: "",
            idToGetBy : -1,
            singleWine : null,
            addData : {"id":0, "manufacturer":null,  "year": 0, "price": 0, "ratinng": 0},
            updateData : {"id":0, "manufacturer":null,  "year": 0, "price": 0, "ratinng": 0},
            addMessage : "",
            updateMessage: "",
            manufacturerFilter: '',

             }
    },
    methods : {
        async getAllWines(){
            try {
                const response = await axios.get(baseurl);
                this.Wines = await response.data;
                this.allwnines = this.Wines;
            } catch (ex) {
                alert(ex.message);
            }
        },
        async getWineById(id){
            const url = baseurl + "/" + id;
            try {
                const response = await axios.get(url);
                this.singleWine = await response.data;
            } catch (ex) {
                alert(ex.message);
            }
        },
        async deleteWine(deleteId){
            const url = baseurl + "/" + deleteId;
            try {
                response = await axios.delete(url);
                this.deleteMessage = response.status + " " + response.statusText;
                this.getAllWines();
            } catch (ex) {
                alert(ex.message);
            }
        },
        async addWine(){
            try {
                response = await axios.post(baseurl, this.addData);
                this.updateMessage = "response " + response.status + " " + response.statusText;
                this.getAllWines();
                this.addData = {"id":0, "manufacturer":null,  "year": 0, "price": 0, "ratinng": 0};
            } catch (ex) {
                alert(ex.message);
            }
        },
        async updateWine(){
            const url = baseurl + "/" + this.updateData.id;
            try {
                response = await axios.put(url, this.updateData);
                this.updateMessage = "response " + response.status + " " + response.statusText;
                this.getAllWines();
                this.updateData = {"id":0, "manufacturer":null,  "year": 0, "price": 0, "ratinng": 0};
            } catch (ex) {
                alert(ex.message);
            }
        },
        sortbyRating() {
            this.Wines.sort((a, b) => b.ratinng - a.ratinng);
            console.log(this.Wines);
        },
        sortbyPrice() {
            this.Wines.sort((a, b) => b.price - a.price);
            console.log(this.Wines);
        },
        sortbyYear() {
            this.Wines.sort((a, b) => b.year - a.year);
        },
        filterByManufacturer() {
            this.Wines = this.allwnines.filter(wine => wine.manufacturer.toLowerCase().startsWith(this.manufacturerFilter.toLowerCase()));
        },
    },
    created() {
        this.getAllWines();
    }
}).mount('#app')