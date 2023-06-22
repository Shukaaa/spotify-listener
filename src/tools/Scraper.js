import axios from "axios";

export class Scraper {
    constructor(url) {
        this.url = url;
    }

    async scrape() {
        return await axios.get(this.url)
            .then(response => response.data)
            .catch(() => { throw new Error("Artist not found.") });
    }
}
