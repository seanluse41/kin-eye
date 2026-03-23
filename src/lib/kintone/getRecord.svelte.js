import { kintoneRequest } from "./request.svelte.js";

export async function getRecord(subdomain, appId, recordId) {
  return kintoneRequest({
    url: `https://${subdomain}.cybozu.com/k/v1/record.json?app=${appId}&id=${recordId}`,
  });
}