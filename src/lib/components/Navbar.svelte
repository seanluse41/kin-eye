<script>
    import {
        Navbar,
        NavBrand,
        NavLi,
        NavUl,
        NavHamburger,
    } from "flowbite-svelte";
    import { EyeSolid } from "flowbite-svelte-icons";
    import { userState } from "$lib/app/userState.svelte.js";
</script>

<Navbar color="primary" breakpoint="lg">
    <NavBrand href="/">
        <EyeSolid color="white" />
        <span
            class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >Kin-Eye</span
        >
    </NavBrand>
    <NavHamburger />
    <NavUl>
        <NavLi href="/home">Home</NavLi>
        <NavLi href="/reports">Reports</NavLi>
        {#if userState.isLoggedIn}
            <NavLi href="/logout">Log Out</NavLi>
        {:else}
            <NavLi href="/login">Log In</NavLi>
        {/if}
    </NavUl>
</Navbar>
