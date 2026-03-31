<script>
  import { goto } from '$app/navigation';
  import { logout } from '$lib/app/userState.svelte';

  logout();
  goto('/login');
</script>