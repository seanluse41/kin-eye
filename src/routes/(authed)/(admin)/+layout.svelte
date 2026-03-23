<script>
  import { goto } from '$app/navigation';
  import { userState } from '$lib/app/userState.svelte';

  let { children } = $props();

  $effect(() => {
    if (!userState.accessToken) {
      goto('/login');
    } else if (!userState.isAdmin) {
      goto('/home');
    }
  });
</script>

{#if userState.accessToken && userState.isAdmin}
  {@render children()}
{/if}