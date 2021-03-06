import KineduApi from '../api/kinedu';


class KineduService {
  
  static instance: KineduService;

  static getInstance(): KineduService {
    if (!KineduService.instance) KineduService.instance = new KineduService();
    return KineduService.instance;
  }

  /* API Endpoints */
  getMilestones = (skillsNumber: number) => KineduApi.getMilestones(skillsNumber);
}

export default KineduService;
