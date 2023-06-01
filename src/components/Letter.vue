<script>
import dxButton from 'devextreme-vue/ui/button';
import notify from 'devextreme/ui/notify';
export default {
    data(){
        return {
            subscribe: true,
            showEditIcons: true,
            showComments:false
        }
    },
    computed:{
        numberComents(){
            return this.letter.replies.length.toString();
        }
    },
    props: ["letter", "fromCircle"],
    components:{
        dxButton
    },
    methods:{
        updateLetter(id){
            notify("The letter has been edited.");
        },
        deleteLetter(id){
            notify("The letter has been deleted.");
        },
        toggleComments(){
            this.showComments = !this.showComments
        },
        reply()
        {
            notify("The reply has been send.")
        }
  },
  mounted(){
  }
}
</script>
<template>
    <div class="letter">
        <div class="letter-header">
            <div class="letter-infos">
                <span>Subject: {{ letter.subject }}</span>
                <span>published by {{ letter.writer_pseudo }}, at {{ letter.post_at }} in {{ letter.circle_name }}</span>
            </div>
        </div>
        <div class="letter-body">
            <span>{{ letter.content }}</span>
        </div>
        <div class="letter-bottom">
            <dxButton v-if="!fromCircle" @click="toggleComments()" id="comments" icon="comment" :text="numberComents"></dxButton>
        </div>
        <div v-if="showComments" class="comments">
            <Letter v-for="reply in letter.replies" :letter="reply" :fromCircle="fromCircle"></Letter>
        </div>
    </div>
</template>
<style>
.letter{
    display: flex;
    flex-direction: column;
    height: fit-content;
    width: 100%;
    box-shadow: rgba(255, 255, 255, 0.24) 0px 3px 8px;
    padding: 1em;
}
.letter-header
{
    display: flex;
    flex-direction: row;
    height: 100px;
    width: 100%;
    justify-content: space-between;
    text-align: left;
}
.letter-infos{
    width: fit-content;
    text-align: left;
}
.letter-body{
    background-color: rgba(255, 255, 255, 0.252);
    height: 100px;
    width: 100%;
    text-align: left;
    padding: 1em;
}
.letter-bottom{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    height: 60px;
}
#reply, #subscribe{
    width: fit-content;
    height: fit-content;
    background-color: rgb(46, 121, 24);

}
#reply:hover, #subscribe:hover{
    width: fit-content;
    background-color: rgb(68, 177, 35);
    
}
#comments{
    width: fit-content;
    height: fit-content;
    background-color: rgb(8, 69, 102);
}
#comments:hover{
    width: fit-content;
    background-color: rgb(12, 101, 149);
}

</style>