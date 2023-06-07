<template>
    <div>
        <SpellModal class="spell-modal" 
            v-show="isModal" 
            :spell="modalSpell"
            firsttitle="name"
            secondtitle="school"
            @close-modal="hideModal()"
            
            ></SpellModal>
        <div class="table-container">
            <input class="searchbar" placeholder="Try me!" v-model="searchString">
            <table class="spell-table"> 
            <tr>
                <th v-for="(cat, index) in categories" :key="index">
                    {{ cat }}
                </th>
            </tr>
            <tr class="spell-row" v-for="(spell, index) in filteredList" :key="index" @click="onClickSpell">
                <td  v-for="(cat, index) in categories" :key="index">
                    {{ spell[cat] }}
                </td>
            </tr>
        </table>    
        </div>
    </div>
        
</template>
<script lang="js">
import SpellModal from './SpellModal.vue';

export default {
    components: { SpellModal },
    data() {
        return {
            spellList: [],
            searchString: "",
            selectedTag: "Tag",
            hideColumns: ["effect"],
            isModal: false,
            modalSpell: {}
        }
    },
    mounted() {
        this.spellList = this.spellDB;
        //this.modalSpell = this.spellDB[0];
    },
    computed: {
        spellDB() {
            console.log(this.$store.state.spellList)
            return this.$store.state.spellList;
        },
        filteredList() {
            return this.searchList(this.searchString, this.spellList, this.selectedTag);
        },
        categories() {
            if (this.spellList.length > 0) {
                let catList = Object.keys(this.spellList[0]);
                this.hideColumns.forEach( cat => {
                    catList = this.removeItemOnce(catList, cat);
                });                
                return catList;
            } else {
                return [];
            }

        }        
    },
    methods: {
        searchList(keyword, searchableList, tag = "Tag") {
            // this is... temporary :D
            if (!keyword && tag === "Tag") {
                return searchableList;
            }
            let returnList = [];
            searchableList.forEach((item) => {
                if (keyword) {
                    let regex = new RegExp (keyword, "i" );
                    if (tag !== "Tag") {
                        if (item.name.search(regex) >= 0 && item.keywords.includes(tag)){
                            returnList.push(item);
                        }   
                    } else if (item.name.search(regex) >= 0){
                        returnList.push(item);
                    }   
                } else if (item.keywords.includes(tag)){
                    returnList.push(item);
                }             
            });
            return returnList;
        },
        removeItemOnce(arr, value) {
            var index = arr.indexOf(value);
            if (index > -1) {
                arr.splice(index, 1);
            }
            return arr;
    	},
        onClickSpell(e) {
            console.log(this.filteredList[e.target.parentNode.rowIndex-1].effect);
            this.showModal(this.filteredList[e.target.parentNode.rowIndex-1]);
        },
        showModal(spell) {
            this.modalSpell = spell;
            this.isModal = true;
        },
        hideModal() {
            this.isModal = false;
        }
    }
}
</script>
<style scoped>
    .table-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 25px;
    }

    .spell-row {
        cursor: pointer;
    }

    .spell-row:hover,
    .spell-row:active {
        background-color: lightgray;
    }

    th {
        font-weight: bold;
        text-align: left;
    }

    td, th {
       padding: 10px; 
    }

    table {
    border-collapse: collapse;
    }
    table td, table th {
        border: 1px solid black;
    }
    table tr:first-child th {
        border-top: 0;
    }
    table tr:last-child td {
        border-bottom: 0;
    }
    table tr td:first-child,
    table tr th:first-child {
        border-left: 0;
    }
    table tr td:last-child,
    table tr th:last-child {
        border-right: 0;
    }

    @media screen and (max-width: 1080px){
        td, th {
            font-size: x-large;
        }

        tr :nth-child(n+3), td :nth-child(n+3) {
            display: none;
        }

        tr :nth-child(2) {
            border-right: none;
        }
    }

</style>