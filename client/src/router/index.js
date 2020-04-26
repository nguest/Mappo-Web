export const instances = []; // active routes array

export const register = (comp) => instances.push(comp);
export const unregister = (comp) => instances.splice(instances.indexOf(comp), 1);

export const historyPush = (path) => {
  history.pushState({}, null, path);
  instances.forEach((instance) => instance.forceUpdate());
};

export const historyReplace = (path) => {
  history.replaceState({}, null, path);
  instances.forEach((instance) => instance.forceUpdate());
};

export const matchPath = (pathname, options) => {
  const { exact = false, path } = options;

  if (!path) {
    return {
      path: null,
      url: pathname,
      isExact: true,
    };
  }

  const exp = `^${path}`;
  const match = new RegExp(exp).exec(pathname);

  if (!match) return null;

  const url = match[0];
  const isExact = pathname === url;

  if (exact && !isExact) return null;

  return {
    path,
    url,
    isExact,
  };
};
