import { getAPIData } from '../../ApiHttp';

export default async function getEvents(req, city) {
const message = await getAPIData('events',city);
  return {
    message : message,
    time: Date.now()
  };
}
