<script>
  import './layout.css';
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { goto } from "$app/navigation";
  import { handleCallback } from "$lib/app/userState.svelte";
  import ParticleBackground from "$lib/components/particleBackground.svelte";
    import Navbar from '../lib/components/Navbar.svelte';

  let { children } = $props();

  onMount(() => {
    const unlisten = listen("deep-link-received", (event) => {
      const parsed = new URL(event.payload);

      if (parsed.hostname === "oauth" && parsed.pathname === "/callback") {
        const code = parsed.searchParams.get("code");
        const state = parsed.searchParams.get("state");

        if (code && state) {
          handleCallback(code, state).then(() => goto("/home")).catch(console.error);
        }
      }
    });

    return () => unlisten.then((fn) => fn());
  });
</script>

<ParticleBackground />
<Navbar />
<div class="relative z-10 p-6">
  {@render children()}
</div>