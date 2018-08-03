import { getAPIData } from '../../ApiHttp';

export default async function getEvents(req, params) {
const message = await getAPIData('events',params);
  return {
    message : message,
    time: Date.now()
  };
}
