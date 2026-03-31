<script>
  import { openUrl } from '@tauri-apps/plugin-opener';
  import { getAuthUrl, userState } from '$lib/app/userState.svelte';
  import { Alert } from "flowbite-svelte";

</script>

<button onclick={() => openUrl(getAuthUrl())}>
  Connect Kintone
</button>

{#if userState.isLoggedIn}
  <p>Logged in ✓</p>
  <pre>{JSON.stringify(userState, null, 2)}</pre>
{/if}

<div class="p-8">
  <Alert>
    <span class="font-medium">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
</div>