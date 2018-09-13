export const setCookie = (cname, cvalue, exdays) => {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  const expires = `${'expires='} ${d.toUTCString()}`;
  if (typeof document !== 'undefined') {
    document.cookie = `${cname} ${'='} ${cvalue} ${';'}  ${expires}  ${';path=/'}`;
  }
};

export const getCookie = cname => {
  const name = `${cname} ${'='}`;
  let ca = '';
  if (typeof document !== 'undefined') {
    ca = document.cookie.split(';');
  }
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
};

export const checkCookie = cname => {
  const user = getCookie(cname);
  if (user === '') {
    return false;
  }
  return true;
};
