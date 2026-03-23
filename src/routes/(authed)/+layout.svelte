<script>
  import { goto } from '$app/navigation';
  import { userState } from '$lib/app/userState.svelte';

  let { children } = $props();

  $effect(() => {
    if (!userState.accessToken) {
      goto('/login');
    }
  });
</script>

{#if userState.accessToken}
  {@render children()}
{/if}