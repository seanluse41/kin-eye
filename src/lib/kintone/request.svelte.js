// $lib/kintone/request.js
// use this wrapper for all requests because it will auto retry if oauth token has failed ok
import { fetch } from "@tauri-apps/plugin-http";
import { userState, refreshAccessToken } from "$lib/app/userState.svelte.js";

export async function kintoneRequest(options) {
  console.log('token:', userState.accessToken);
  console.trace();
  const doRequest = () => fetch(options.url, {
    method: options.method ?? "GET",
    headers: {
      "Authorization": `Bearer ${userState.accessToken}`,
      "Content-Type": "application/json",
      ...options.headers,
    },
    body: options.body ? JSON.stringify(options.body) : undefined,
  });

  let res = await doRequest();
  console.log(res)

  if (res.status === 401) {
    await refreshAccessToken();
    res = await doRequest();
  }
  if (!res.ok) {
    const err = await res.json();
    console.error('Kintone API error:', res.status, err);
    throw new Error(`Kintone ${res.status}: ${err.message || JSON.stringify(err)}`);
  }
  return res.json();
}