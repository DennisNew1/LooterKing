<template>
    <div class="modal-background" @click="onClickClose">
        <div class=modal-container>
        <div class="modal-close" @click="onClickClose">X</div>
        <h1 v-if="spell[firsttitle ]">
            {{ spell[firsttitle ]}}
        </h1>
        <h2 v-if="spell[secondtitle]">
            {{ spell[secondtitle] }}
        </h2>
        <table class="table" cellpadding="0" cellspacing="0" border="0">
            <tr class="table-row" v-for="(cat, index) in categories" :key="index">
                <td class="category">{{ cat }}:</td>
                <td class="value"> {{ spell[cat] }}</td>
            </tr>
        </table>
    </div>
    </div>
    
</template>
<script>
export default {
    props: {
        spell: {
            name: String,
            school: String,
            difficulty: String,
            cost: String,
            castingTime: String,
            range: String,
            effect: String,
            area: String
        }, 
        firsttitle: String,
        secondtitle: String,
    },
    computed: {
        school() {
            return this.spell.school.replaceAll(",", ", ");
        },
        categories() {
            if (this.spell) {
                var catList = Object.keys(this.spell);
                //console.log(catList.indexOf("name"));
                if (this.firsttitle && this.secondtitle && (catList.length > 0)) {
                    catList = this.removeItemOnce(catList, this.firsttitle);
                    catList = this.removeItemOnce(catList, this.secondtitle);
                }
                return catList;
            } else {
                return [];
            }

        }
    },
    methods: {
        onClickClose(e) {
            let classList = e.target.classList;
            if (classList.contains("modal-background") 
                || classList.contains("modal-close")) {
                this.$emit("close-modal");
            }
        },
        removeItemOnce(arr, value) {
        var index = arr.indexOf(value);
        if (index > -1) {
            arr.splice(index, 1);
        }
        return arr;
        },
    }       
}
</script>
<style>
    .modal-background {
        background-color: rgba(149, 149, 149, 0.65);
        width: 100%;
        height: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        top: 0;
        left: 0;
    }

    .modal-container {
        display: flex;    
        flex-direction: column;
        width: 50%;
        background-color: white;
        overflow-y: auto;
        padding: 10px;
    }

    .modal-close {
        cursor: pointer;
        align-self: flex-end;
        box-sizing: content-box;
        width: fit-content;
    }

    h1 {
        font-size: xx-large;
        margin: 0;
    }

    h2 {
        font-size: large;
        font-weight: normal;
        margin: 0 0 15px 0;
    }

    table {
        border: 0px solid black;
    }

    td {
        padding: 5px;
        
        font-size: medium;
    }

    @media screen and (max-width: 720px){
        .modal-container { 
            width: 90%;
            margin-top: 10%;
        }   

        .modal-background {
            align-items: flex-start;
        }
    }

</style>