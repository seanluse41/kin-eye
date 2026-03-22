<script>
  import { onMount } from "svelte";
  import { onOpenUrl } from "@tauri-apps/plugin-deep-link";
  import { handleCallback } from "$lib/app/userState.svelte";

  let { children } = $props();

  onMount(() => {
    const unlistenPromise = onOpenUrl((urls) => {
      for (const url of urls) {
        const parsed = new URL(url);
        if (parsed.hostname === "oauth" && parsed.pathname === "/callback") {
          const code = parsed.searchParams.get("code");
          const state = parsed.searchParams.get("state");
          if (code && state) {
            handleCallback(code, state).catch(console.error);
          }
        }
      }
    });

    return () => unlistenPromise.then((fn) => fn());
  });
</script>

{@render children()}