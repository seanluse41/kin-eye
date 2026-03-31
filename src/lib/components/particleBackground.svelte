<script>
  import { onMount } from "svelte";
  import { tsParticles } from "@tsparticles/engine";
  import { loadSlim } from "@tsparticles/slim";
  import config from "../data/particlejs-config.json";

  onMount(async () => {
    await loadSlim(tsParticles);
    try {
      await tsParticles.load({ id: "tsparticles", options: config });
    } catch (error) {
      console.error("Failed to load particles:", error);
    }
  });
</script>

<div id="tsparticles" class="fixed inset-0 z-0"></div>