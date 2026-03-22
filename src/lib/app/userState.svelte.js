const LAMBDA_BASE = "https://so076lfi46.execute-api.ap-northeast-1.amazonaws.com/Prod";
import { postRecord } from "$lib/kintone/postRecord.svelte.js";
import { getRecord } from "$lib/kintone/getRecord.svelte.js";

const IDENTITY_APP_ID = 86;

const KINTONE = {
  clientId: "l.1.28a9dtnvnbfnl4vemf7hzeit255kiqpk",
  clientSecret: "a283esk9xwoup9jwb33cxjbd1a5wd7frb0wfnfbj3oaivlgl7f0srjrx3fr5olkt",
  subdomain: "sean",
  domain: "cybozu.com",
};

export const userState = $state({
  accessToken: null,
  refreshToken: null,
  expiresAt: null,
  pendingState: null,
  loginName: null,
  displayName: null,
});

export function getAuthUrl() {
  const state = crypto.randomUUID();
  userState.pendingState = state;

  const params = new URLSearchParams({
    response_type: "code",
    client_id: KINTONE.clientId,
    redirect_uri: `${LAMBDA_BASE}/callback`,
    state,
    scope: "k:app_record:read k:app_record:write",
  });

  return `https://${KINTONE.subdomain}.${KINTONE.domain}/oauth2/authorization?${params}`;
}

export async function handleCallback(code, state) {
  if (state !== userState.pendingState) {
    throw new Error("State mismatch — possible CSRF");
  }
  userState.pendingState = null;

  const res = await fetch(`${LAMBDA_BASE}/exchange`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      code,
      redirectUri: `${LAMBDA_BASE}/callback`,
      clientId: KINTONE.clientId,
      clientSecret: KINTONE.clientSecret,
      subdomain: KINTONE.subdomain,
      domain: KINTONE.domain,
    }),
  });

  const tokens = await res.json();
  userState.accessToken = tokens.access_token;
  userState.refreshToken = tokens.refresh_token;
  userState.expiresAt = Date.now() + tokens.expires_in * 1000;
  const identity = await resolveIdentity(tokens.access_token);
  userState.loginName = identity.loginName;
  userState.displayName = identity.displayName;
}

async function resolveIdentity(accessToken) {
  const { id } = await postRecord(KINTONE.subdomain, IDENTITY_APP_ID);
  const { record } = await getRecord(KINTONE.subdomain, IDENTITY_APP_ID, id);
  const creatorField = Object.values(record).find(f => f.type === "CREATOR");
  return {
    loginName: creatorField.value.code,
    displayName: creatorField.value.name,
  };
}

export async function refreshAccessToken() {
  const res = await fetch(`${LAMBDA_BASE}/refresh`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      refreshToken: userState.refreshToken,
      clientId: KINTONE.clientId,
      clientSecret: KINTONE.clientSecret,
      subdomain: KINTONE.subdomain,
      domain: KINTONE.domain,
    }),
  });
  const tokens = await res.json();
  userState.accessToken = tokens.access_token;
  userState.refreshToken = tokens.refresh_token;
  userState.expiresAt = Date.now() + tokens.expires_in * 1000;
}