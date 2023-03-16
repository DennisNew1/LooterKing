<script setup>
import CalcScreen from './components/CalcScreen.vue'
import ItemScreen from './components/ItemScreen.vue'
</script>

<template>
  <header>
    <button class="btn-switch" @click="onClickSwitch">Switch</button>
  </header>

  <main>
    <div class="main">
    <CalcScreen :db="itemList" v-if="this.showCalc"/>
    <ItemScreen :db="itemList" @changedItemList="onChangedItemList" v-if="this.showItems"/>
    </div>
  </main>
</template>

<script>
import db from "@/assets/database.json";

export default {
  data() {
    return {
        showCalc: true,
        showItems: false, 
        itemList: db
    }
  },
  methods: {
    onClickSwitch() {
      this.showCalc = !this.showCalc;
      this.showItems = !this.showItems;
    },
    onChangedItemList(newList) {
        this.itemList = newList;
    }
  },
}
</script>

<style>
    html {
        width:100%;
    }

    .btn-switch {
        position: absolute;
    }

    .main {
        box-sizing: border-box;
        padding: 20px;
        height: 90vh;
        width: 100%;   
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
</style>
