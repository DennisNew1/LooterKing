<template>
    <div class="container">
        <h1>Where to Adventurer?</h1>
        <RouterLink to="/loot">-> Looten</RouterLink>
        <RouterLink to="/items">-> Edit Items</RouterLink>
        <!--RouterLink to="/spells">Spells</RouterLink-->
    </div>
</template>
<script>

export default {
}
</script>
<style>
    a {
        color: black;
        text-decoration: none;
    }

    a:hover {
        color: grey;
    }

    .container {
        display: flex;
        color: black;

    }
    
</style>