import { getAPIData } from '../../ApiHttp';

export default async function payment(req) {
  const message = await getAPIData('payment', '', req.body);
  return {
    message: message.response.errorMsg,
    time: Date.now()
  };
}
