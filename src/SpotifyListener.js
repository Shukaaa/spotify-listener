import {Scraper} from "./tools/Scraper.js";

export async function getListener(artist_id) {
    const spotify_url = "https://open.spotify.com/artist/";
    const scraper = new Scraper(spotify_url + artist_id);
    const page = scraper.scrape().then((data) => {
        return data;
    });

    return await page.then(data => {
        // get all div elements
        let divs = data.match(/<div.*?>.*?<\/div>/g);
        // get all div elements that contains 'monthly listeners'
        let monthlyListenersDivs = divs.filter(div => div.includes("monthly listeners"));

        if (monthlyListenersDivs.length > 0) {
            // get the first div that contains 'monthly listeners'
            let monthlyListenersDiv = monthlyListenersDivs[0];
            // get the text of the div
            let monthlyListenersText = monthlyListenersDiv.match(/>.*?</g)[1];
            // remove the '>' and '<' characters, remove the ',' character, remove the ' monthly listeners' text
            let monthlyListeners = monthlyListenersText.replace(">", "").replace("<", "").replace(",", "").replace(" monthly listeners", "");

            // cast the string to a number
            return Number(monthlyListeners);
        } else {
            throw new Error("No monthly listeners found");
        }
    });
}
