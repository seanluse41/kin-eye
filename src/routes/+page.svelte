<script>
  import { openUrl } from '@tauri-apps/plugin-opener';
  import { getAuthUrl, userState } from '$lib/app/userState.svelte';
  import { Alert, Button } from "flowbite-svelte";

</script>

<Button onclick={() => openUrl(getAuthUrl())}>
  Connect Kintone
</Button>

{#if userState.accessToken}
  <p>Logged in ✓</p>
  <pre>{JSON.stringify(userState, null, 2)}</pre>
{/if}

<div class="p-8">
  <Alert>
    <span class="font-medium text-5xl">Info alert!</span>
    Change a few things up and try submitting again.
  </Alert>
</div>