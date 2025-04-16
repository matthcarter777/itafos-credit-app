import axios, { AxiosError } from 'axios';
import { parseCookies, setCookie } from 'nookies';

let isRefreshing = false;
let failedRequestQueue = [];


export function setupApiClient(ctx = undefined) {
  let cookies = parseCookies(ctx);
  const basApi = process.env.NEXT_PUBLIC_API_URL;

  const api = axios.create({
    baseURL: basApi,
    headers: {
      Authorization: `Bearer ${cookies['nextauth.token']}`
    }
  });
  
  return api;
}