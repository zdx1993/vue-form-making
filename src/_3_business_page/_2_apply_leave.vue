<template>
    <div>
        <div class="dx-start-form">
            <start-form></start-form>
        </div>
    </div>
</template>

<script>
    import startForm from '../_1_custom_components/common/_1_process_start'
    export default {
        name: "leave",
        components: {
            startForm: startForm
        },
        data() {
            return {

            }
        },
        created() {

        },
        methods: {}
    }
</script>

<style lang="scss" scoped>
    .dx-start-form{
        width: 500px;
        margin: 50px auto 0;
    }
</style>