import { getAPIData } from '../../ApiHttp';

export default async function getCities(req, params) {
const message = await getAPIData('cities',params);
  return {
    message : message,
    time: Date.now()
  };
}
