<template>
    <div class="main">
        <div class="input-container">
            <div class="input-item"> 
                <div class="label">Max Items</div>
                <input type="number" id="count" v-model="maxItems"> 
            </div> 
            <div class="input-item">
                <div class="label">Max Worth </div>
                <input type="number" id="amount" v-model="amount">
            </div>
            <button @click="onLoot">Loot!</button>
        </div>
        <div v-if="outputList.length != 0" class="loot-list">
            <div class="luck">Luck: {{ luckPercentage }}%</div>
            <div class="loot-list-item" v-for="(item, index) in outputList" :key="index">
                <div>{{ item.count }} x </div>
                <div>{{ item.name }} </div>
            </div>
        </div>
       
    </div>
</template>
<script>
import db from "@/assets/database.json";

export default {
    data() {
        return {
            items: db,
            amount: 2,
            outputList: [],
            outputAmount: 0,
            maxItems: 3,   
            luckPercentage: 0,   
        }
    },
    mounted() {
        console.log("im here");
        console.log(this.items);
    },
    methods: {
        onLoot() {
            console.log("amount is " + this.amount);            
            let lootList = []
            let lootAmount = 0;
            let nothingFound = 0;

            try {
                while (lootAmount < this.amount) {
                    const maxAmount = this.round(this.amount - lootAmount);
                    console.log(maxAmount);
                    let loot = this.items[Math.floor(Math.random()*this.items.length)];
                    console.log("found " + loot.name + " " + loot.price);

                    if (loot.price <= maxAmount) {
                        lootAmount = this.round(lootAmount + loot.price);

                        let lootID = lootList.findIndex((a) =>a === loot);
                        if (lootID >= 0) {
                            lootList[lootID].count += 1;
                        } else {
                            loot.count = 1;
                            lootList.push(loot);
                            console.log("added "+ loot.name);
                        }                        
                    } else {
                        nothingFound++;
                    }
                    
                    if (nothingFound >= 500) {
                        console.log("nothingFound stop")
                        break;
                    }

                    if (lootList.length === this.maxItems) {
                        console.log("maxItems stop, rest amount: " + maxAmount);
                        console.log("items are worth " + lootAmount + "L");
                        break;
                    }
                } 
            } catch(e) {
                console.log(e);
            }

        
            this.outputList = lootList;
            this.outputAmount = lootAmount
            this.luckPercentage = this.round(this.outputAmount / this.amount * 100);
            console.log(this.outputList);
            
        }, 
        /** floors the number to the second decimal */
        round(number) {
            return Math.floor(number * 100) / 100;
        }
    },
    
}
</script>
<style lang="css">

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

    .main {
        box-sizing: border-box;
        padding: 20px;
        height: 90vh;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;
        gap: 50px;

    }

    .input-container {
        height: auto;
        width: 100%;
        display: flex;
        justify-content: center;
        height: fit-content;
        gap: 15px;
    }

    .input-item {
        display: flex;
        gap: 15px;
        align-items: center;
        height: fit-content;
    }

    .loot-list {
        display: flex;
        flex-direction: column;
    }

    .loot-list-item {
        display: flex;
        flex-direction: row;
        gap: 15px;
    }

    @media screen and (max-width: 1200px) {
        .main {
            padding: 10px;
        }

        .input-container {
            flex-direction: column;
            align-items: start;
        }

        .input-item {
            width: 100%;
        }

        input {
            width: 60%;
        }

        .label {
            width: 40%;
        }

        button {
            margin: 0;
            width: 100%;
        }
    }
</style>