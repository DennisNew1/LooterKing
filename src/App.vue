<script setup>
import { RouterView } from 'vue-router'
import BurgerMenu from './components/BurgerMenu.vue';
</script>

<template>
  <header>
    <!--button class="btn-switch" @click="onClickSwitch">Switch</button-->
  </header>

  <main>
    <div class="main">
    <BurgerMenu class="menu"></BurgerMenu>
    <RouterView></RouterView>
    
    <!--CalcScreen :items="itemList" :tagList="tagList" v-if="this.showCalc"/>
    <ItemScreen :db="itemList" :tagList="tagList" @changedItemList="onChangedItemList" v-if="this.showItems"-->
    </div>
  </main>
</template>

<script>
import db from "@/assets/database.json";
import spells from "@/assets/spells.json";

export default {
    data() {
        return {
            showCalc: true,
            showItems: false, 
            itemList: db
        }
    },
    computed: {
        tagList() {
            var tags = new Set();
            tags.add("Tag");
            this.itemList.forEach (item => {
                if (item.keywords.length > 0) {
                    item.keywords.forEach(tag => tags.add(tag));
                }
            });
            return tags;
        }
    },
    created() {
        this.$store.commit('setItems', db);
        this.$store.commit('setTags', this.tagList);
        this.$store.commit('setSpells', spells);
    },
}
</script>

<style>
    html {
        width:100%;
    }

    body {
        margin: 0;
    }

    .main {
        box-sizing: border-box;
        padding: 50px 20px 20px 20px;
        width: 100%;   
    }

    .menu {
        position: fixed;
    }

    *{
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        font-size: 24px;    
    }

    input {
        background-color: #e6ebf0;
        border: none;
        text-decoration: none;
        color: black;
        padding: 15px;
        cursor: pointer;
        box-sizing: border-box;
        height: 50px;
    }

    /* Buttons styles start */
    button {
        display: block;
        border: none;
        box-sizing: border-box;
        padding: 15px;
        margin: 0;
        text-decoration: none;
        background: #e6ebf0;
        color: black;
        line-height: 1;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out, transform 150ms ease;
        appearance: none;
        -webkit-appearance: none;
        -moz-appearance: none;
        margin-left: 15px;
        height: 50px;
    }

    button:hover,
    button:focus {
        background: #0053ba;
    }

    button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }

    .container {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        gap: 50px;
    }

    select {
        border-radius: 0;
        background: #e6ebf0;
        border: none;
        height: 50px;
        margin-left: 15px;
        padding: 0 15px;
    }

    @media screen and (max-width: 1200px) {
        .btn-switch {
            width: 100%;
            left: 0;
            bottom: 0;
            margin-left: 0;
        }

    }
</style>
