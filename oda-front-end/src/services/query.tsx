import axios from "axios";

export function executeSparqlQuery(query: string, source: string) {

    axios.post('http://localhost:4000/sparql', {
        query: query,
        source: source
    })
    .then((response) => {
        console.log(response.data);
    })
    .catch((error) => {
        console.log(error);
    });
}