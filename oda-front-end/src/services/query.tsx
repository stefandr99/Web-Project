import axios from "axios";
import { APILink } from "../env";

export async function executeSparqlQuery(query: string, source: string) {
  try {
    const response = await axios.post(`https://${APILink}/sparql/`, {
      query: query,
      endpoint: source,
    });

    return response;
  } catch (error) {
    console.log(error);
  }
}
