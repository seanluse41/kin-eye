<script>
  import { onMount } from "svelte";
  import { listen } from "@tauri-apps/api/event";
  import { handleCallback } from "$lib/app/userState.svelte";

  let { children } = $props();

  onMount(() => {
    console.log("on mount")
    const unlisten = listen("deep-link-received", (event) => {
      const parsed = new URL(event.payload);
      console.log(event.payload)
      if (parsed.hostname === "oauth" && parsed.pathname === "/callback") {
        const code = parsed.searchParams.get("code");
        const state = parsed.searchParams.get("state");
        if (code && state) {
          handleCallback(code, state).catch(console.error);
        }
      }
    });

    return () => unlisten.then((fn) => fn());
  });
</script>

{@render children()}