export const setCookie = (cname: string, cvalue: string, req?: any) => {
  const d = new Date();

  d.setTime(d.getTime() + 3 * 60 * 60 * 1000); // 3 hours
  let expires = "expires=" + d.toUTCString();

  if (typeof document !== "undefined") {
    // for client side rendering
    document.cookie =
      cname + "=" + cvalue + ";" + expires + ";domain=.localhost" + ";path=/";
  } else if (req?.headers?.cookie) {
    // for server side rendering
    req.headers.cookie =
      cname + "=" + cvalue + ";" + expires + ";domain=.localhost" + ";path=/";
  }
};

export const getCookie = (name: string, req?: any): string | null => {
  let cookies;

  if (typeof document !== "undefined") {
    cookies = document.cookie.split(";"); // for client side rendering
  } else if (req?.headers?.cookie) {
    cookies = req.headers.cookie.split(";"); // for server side rendering
  }

  if (!cookies) return null;

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(`${name}=`)) {
      return cookie.substring(name.length + 1);
    }
  }
  return null;
};

export const deleteCookie = (cname: string, req?: any) => {
  if (typeof document !== "undefined") {
    // for client side rendering
    document.cookie = cname + "=" + "" + ";max-age=0path=/";
  } else if (req?.headers?.cookie) {
    // for server side rendering
    req.headers.cookie = cname + "=" + "" + ";max-age=0path=/";
  }
};
