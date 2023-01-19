import { callApi } from '../helpers/apiHelper';

class FighterService {
  #endpoint = 'fighters.json';

  async getFighters() {
    try {
      const apiResult = await callApi(this.#endpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }

  async getFighterDetails(id) {
    // The service has details for fighters in differentiated files
    const myEndpoint = `details/fighter/${id}.json`;
    try {
      const apiResult = await callApi(myEndpoint);
      return apiResult;
    } catch (error) {
      throw error;
    }
  }
}

export const fighterService = new FighterService();
