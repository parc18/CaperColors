import { getAPIData } from '../../ApiHttp';

export default async function getEventPrices(req, eventId) {
  const message = await getAPIData('prices', eventId);
  return {
    message,
    time: Date.now()
  };
}
