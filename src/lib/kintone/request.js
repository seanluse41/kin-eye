// $lib/kintone/request.js
// use this wrapper for all requests because it will auto retry if oauth token has failed ok
import { fetch } from "@tauri-apps/plugin-http";
import { userState, refreshAccessToken } from "$lib/app/userState.svelte";

export async function kintoneRequest(options) {
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

  if (res.status === 401) {
    await refreshAccessToken();
    res = await doRequest();
  }

  return res.json();
}