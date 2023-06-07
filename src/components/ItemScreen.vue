<template>
    <div class="container">
        <div class="gallery-options">
            <input class="searchbar" placeholder="Try me!" v-model="searchString">
            <select class="selection" v-model="selectedTag" >
                <option v-for="(item, index) in tagList" :key="index" >{{item}}</option>
            </select>
            <button class="btn btn-info" @click="onPickFile">Upload JSON</button>
            <input
                type="file"
                style="display: none"
                ref="fileInput"
                accept=".json"
                @change="onFilePicked"/>
            <button @click="onDownloadJson">Export JSON</button> 
            <a id="downloadAnchorElem" style="display:none"></a>
        </div>
        <div class="gallery-container" >
            <div class="gallery-item" v-for="(item, index) in filteredList" :key="index">
            <LootItem class="loot-item" @changeInput="onChangeInput" :item="item"/>
        </div>
        </div>
        
    </div>
</template>
<script>
import LootItem from "./LootItem.vue";

export default {
    components: { LootItem },
    data() {
        return {
            testItem: {
                id: 1,
                name: "Dolch",
                price: 3,
                keywords: ["Waffe", "Schmiede", "Allgemein"]
            },
            itemList: [],
            searchString: "",
            selectedTag: "Tag"
        }
    },
    mounted() {
        this.itemList = this.db; 
    },
    computed: {
        filteredList() {
            return this.searchList(this.searchString, this.itemList, this.selectedTag);
        },
        db() {
            return this.$store.state.items;
        },
        tagList() {
            return this.$store.state.tagList;
        }
    },
    methods: {
        onPickFile () {
            this.$refs.fileInput.click()
        },
        onFilePicked (event) {
            const files = event.target.files;
            let filename = files[0].name;
            
            const fr = new FileReader();

            fr.onload = e => {
                const result = JSON.parse(e.target.result);
                const formatted = JSON.stringify(result, null, 2);
                this.itemList = result;
            }
            fr.readAsText(files.item(0));
        },
        onDownloadJson() {
            var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(this.itemList));
            var dlAnchorElem = document.getElementById('downloadAnchorElem');
            dlAnchorElem.setAttribute("href",     dataStr     );
            dlAnchorElem.setAttribute("download", "inventory.json");
            dlAnchorElem.click();
        },
        onChangeInput(item) {
            const foundId = this.itemList.findIndex(e => e.id === item.id);
            this.itemList[foundId] = item;
            this.$store.commit('setItem', item);
        },
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
        }
    },
}
</script>
<style lang="css" scoped>
    .container {
        gap: 20px;
    }

    .gallery-options {
        display: flex;
    }

    .gallery-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 20px;
        width: 100%;
    }

    @media screen and (max-width: 720px) {

        .gallery-container {
            flex-direction: column;
            border: 1px black;
        }

        .gallery-item {
            width: 100%;
        }
        .loot-item {
            width: 100%;
        }

    }
</style>