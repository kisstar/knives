import { isString } from 'lodash-es';

export const isIPv4 = (ip: unknown): boolean => {
  if (!isString(ip)) {
    return false;
  }

  return !!ip.match(/^((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)($|(?!\.$)\.)){4}$/);
};

export const isIPv6 = (ip: unknown): boolean => {
  if (!isString(ip)) {
    return false;
  }

  return !!ip.match(/^(([\da-fA-F]{1,4})($|(?!:$):)){8}$/);
};

export const isIP = (ip: unknown): boolean => {
  return isIPv4(ip) || isIPv6(ip);
};

// 判断是否是合法的域名
export const isDomain = (domain: unknown): boolean => {
  if (!isString(domain)) {
    return false;
  }

  // 简单的域名正则验证
  const pattern = /^(?!-)[A-Za-z0-9-]+(\.[A-Za-z0-9-]+)*(\.[A-Za-z]{2,})$/;

  return pattern.test(domain);
};
