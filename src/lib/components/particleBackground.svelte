<script>
    import { onMount } from "svelte";
    import { tsParticles } from "tsparticles-engine";
    import { loadSlim } from "tsparticles-slim";
    import config from "../data/particlesjs-config.json";

    onMount(async () => {
        await loadSlim(tsParticles);

        try {
            await tsParticles.load("tsparticles", config);
        } catch (error) {
            console.error("Failed to load particles:", error);
        }
    });
</script>

<div id="tsparticles" class="fixed inset-0 z-0 bg-white"></div>