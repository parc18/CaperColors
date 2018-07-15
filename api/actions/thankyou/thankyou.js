import { getAPIData } from '../../ApiHttp';

export default async function thankyou(req, paymentId) {
  console.log(paymentId);
  const message = await getAPIData('thankyou', paymentId);
  console.log(message, 'RealOne');
  return {
    message: message.response.errorMsg,
    time: Date.now()
  };
}
