<template>
    <div class="container">
        <div class="id"> # {{ item.id }}</div>
        <div class="label-container">
            <div class="label">Name</div>
            <input @focusout="onChangeInput" class="name" v-model="item.name"> 
        </div>
        <div class="label-container">
            <div class="label">Price</div>
            <input @focusout="onChangeInput" class="price" v-model="item.price">
        </div>
        <div class="label-container">
            <div class="label">Keywords</div>
            <input @focusout="onChangeInput" class="keywords" v-model="item.keywords"> 
        </div>
         
        
    </div>
</template>
<script>
export default {
    props: {
        item: {
            id: Number,
            name: String,
            price: Number,
            keywords: String            
        }
    },
    methods: {
        onChangeInput(event) {
            this.$emit('changeInput', this.item )
        }
    },
}
</script>
<style lang="css" scoped>
    .container {
        padding: 10px;
        gap: 20px;
        background-color: #e6ebf0;
    }

    input {
        height: 20px;
        font-size: 20px;
        background-color: white;
        width: 100%;
    }

    .label-container {
        width: 100%;
    }

    .label {
        font-size: 14px;
        margin-bottom: 5px;;
    }

    .id {
        align-self: flex-start;
    }
</style>