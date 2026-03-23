<script>
  import { openUrl } from '@tauri-apps/plugin-opener';
  import { getAuthUrl } from '$lib/app/userState.svelte';
</script>

<button onclick={() => openUrl(getAuthUrl())}>
  Connect Kintone
</button>