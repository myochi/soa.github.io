<script>
export default {
  data() {
    return {
    }
  },
  props:["writer"],
}
</script>
<template>
    <div class="writer">
        <div class="writer-infos">
            <span><i class="dx-icon-user"></i>{{ writer.pseudo }}</span>
            <span><i class="dx-icon-bookmark"></i>{{ writer.title }}</span>
        </div>
        <div class="writer-circles">
            <span><i class="dx-icon-group"></i>Subscribed to:</span>
            <ul class="writer-ul">
                <li v-for="circle in writer.circles">{{ circle.name }}</li>
            </ul>
        </div>
    </div>
</template>
<style>
.writer{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 100px;
    width: 100%;
}
.writer-infos{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    text-align: left;
    height: 100px;
    width: 100%;
}
.writer-circles{
    display: flex;
    height: 100px;
    width: 100%;
    flex-direction: column;
    text-align: left;
}
.writer-ul{
    display: flex;
    flex-direction: column;
    list-style-type: circle;
    width: fit-content;
    margin-left: 10%;
    border: none;
}

.writer-circles span
{
    height: fit-content;
    width: fit-content;
    text-align: left;
}
</style>