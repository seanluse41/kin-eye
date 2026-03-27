import { kintoneRequest } from "./request.svelte.js";

export async function getRecord(subdomain, appId, recordId) {
  const url = `https://${subdomain}.cybozu.com/k/v1/record.json?app=${appId}&id=${recordId}`;
  return kintoneRequest({ url });
}