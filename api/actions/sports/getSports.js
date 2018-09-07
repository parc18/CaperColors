import { getAPIData } from '../../ApiHttp';

export default async function getSports(req, params) {
const message = await getAPIData('sports',params);
  return {
    message : message,
    time: Date.now()
  };
}
