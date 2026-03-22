import { kintoneRequest } from "./request";

export async function postRecord(subdomain, appId, record = {}) {
  return kintoneRequest({
    url: `https://${subdomain}.cybozu.com/k/v1/record.json`,
    method: "POST",
    body: { app: appId, record },
  });
}