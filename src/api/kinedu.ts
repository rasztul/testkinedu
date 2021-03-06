import axios from 'axios';
import { KINEDU_API_URL, KINEDU_API_TOKEN } from '../config';

const ClientInstance = () => {
  
  const authHeader= {'Authorization': `Token ${ KINEDU_API_TOKEN }`};
  
  return axios.create({
    baseURL:KINEDU_API_URL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...authHeader
    },
  });

};


export interface IKineduApi {
  getMilestones(skillsNumber: number): any;
}

const KineduApi: IKineduApi = {
  getMilestones: (skillsNumber) => ClientInstance().get(`/skills/${ skillsNumber }/milestones`)
};

export default KineduApi;