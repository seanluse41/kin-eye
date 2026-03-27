<script>
  import { openUrl } from '@tauri-apps/plugin-opener';
  import { getAuthUrl, userState } from '$lib/app/userState.svelte';
</script>

<button onclick={() => openUrl(getAuthUrl())}>
  Connect Kintone
</button>

{#if userState.accessToken}
  <p>Logged in ✓</p>
  <pre>{JSON.stringify(userState, null, 2)}</pre>
{:else}
  <p>Not logged in</p>
  <button onclick={login}>Connect Kintone</button>
{/if}
