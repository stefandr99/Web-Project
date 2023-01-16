import axios from "axios";

export async function executeSparqlQuery(query: string, source: string) {

    try {
        const response = axios.post('http://localhost:4000/sparql/', {
            query: query,
            endpoint: source
        })

        return response;
    }
    
    catch(error) {
        console.log(error);
    }
}