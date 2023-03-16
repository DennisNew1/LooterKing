<template>
    <div class="container">
        <div class="gallery-options">
            <input class="searchbar" placeholder="Try me!" v-model="searchString">
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
        <div class="item-gallery">
            <div v-for="(item, index) in filteredList" :key="index">
                <LootItem @changeInput="onChangeInput" :item="item"/>
            </div>
        </div>
    </div>
</template>
<script>
import LootItem from "./LootItem.vue";

export default {
    components: { LootItem },
    props: ['db'],
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
        }
    },
    mounted() {
        this.itemList = this.db; 
    },
    computed: {
        filteredList() {
            return this.searchList(this.searchString, this.itemList);
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

            this.$emit("changedItemList", this.itemList);
        },
        searchList(keyword, searchableList) {
            // this is... temporary :D
            console.log("searcching");
            if (keyword) {
                let returnList = [];
                searchableList.forEach((item) => {
                    let regex = new RegExp (keyword, "i" );
                    if (item.name.search(regex) >= 0){
                        returnList.push(item);
                    }
                    
                });
                return returnList;
            } else {
                return searchableList;
            }
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

    .item-gallery {
        display: flex;
        flex-wrap: wrap;
        gap: 20px;
        
    }
</style>