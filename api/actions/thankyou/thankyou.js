import { getAPIData } from '../../ApiHttp';

export default async function thankyou(req, paymentId) {
  const message = await getAPIData('thankyou', paymentId);
  return {
    message: message.response.errorMsg,
    time: Date.now()
  };
}
