const LAMBDA_BASE = "https://so076lfi46.execute-api.ap-northeast-1.amazonaws.com/Prod";

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
}