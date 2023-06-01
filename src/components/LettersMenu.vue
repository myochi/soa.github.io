<script>
import DxList from 'devextreme-vue/ui/list';
import Letter from './Letter.vue';
import axios from 'axios';
export default {
  data() {
    return {
      lettersListId: [],
      lettersList: [],
      allLetters: [],
      charged: null,
      fields: ["circle_name", "writer_pseudo", "subject"],
      showReplies: false
    }
  },
  components:{
    DxList,
    Letter
  },
  methods:{
    toggleComments(){
      this.showReplies=!this.showReplies;
    },
    async getAllReplies(letterId){
      var list = await axios.get("http://localhost:5000/letters/replies/"+letterId)
      .then((res)=>{
        return res.data;
      })
      var repliesList = []
      for (var i = 0; i < list.length; i++)
      {
        repliesList.push(list[i]);
      }
      return repliesList;
    },
    async getCircleWriterNames(circle_id, writer_id)
    {
      var names = []
      var name = await axios.get("http://localhost:5000/circles/"+circle_id)
      .then((res) => {
        return res.data
      })
      var pseudo = await axios.get("http://localhost:5000/writers/"+writer_id)
      .then((res) => {
        return res.data
      })
      names.push(name[0].name)
      names.push(pseudo[0].pseudo)
      return names
    },
    DFS(letter, i, id_marked){
      id_marked.push(letter.id);
      var objLetter = {
            "id": letter.id,
            "circle_id": letter.circle_id,
            "writer_id": letter.writer_id,
            "post_at": letter.post_at,
            "updated_at": letter.updated_at,
            "content": letter.content,
            "subject": letter.subject,
            "replies": [],
            "circle_name": letter.circle_name,
            "writer_pseudo": letter.writer_pseudo
          };
      if (this.lettersListId[i].replies.length == 0)
      {
        return objLetter;
      }
      else
      {
        for (var j = 0; j < this.lettersListId[i].replies.length; j++)
        {
          if (!id_marked.includes(this.lettersListId[i].replies[j]))
          {
            var k = 0
            for (k; k < this.lettersListId.length; k++)
            {
              if (this.lettersListId[k].id == this.lettersListId[i].replies[j])
              {
                break;
              }
            }
            objLetter.replies.push(this.DFS(this.lettersListId[k], k, id_marked));
            return objLetter;
          }
        }
      }
    },
    getLettersFromId(){
      var id_marked = []
      for (var i = 0; i < this.lettersListId.length; i++)
      {
        if (!id_marked.includes(this.lettersListId[i].id))
        {
          this.lettersList.push(this.DFS(this.lettersListId[i], i, id_marked));
        }
      }
    },
    async getLettersList(){
        var list = await axios.get("http://localhost:5000/letters")
        .then((res)=>{
          return res.data
        })
        for(var i= 0; i < list.length; i++)
        {
          var objLetter = {
            "id": list[i].id,
            "circle_id": list[i].circle_id,
            "writer_id": list[i].writer_id,
            "post_at": list[i].post_at,
            "updated_at": list[i].updated_at,
            "content": list[i].content,
            "subject": list[i].subject,
            "replies": [],
            "circle_name": undefined,
            "writer_pseudo": undefined
          }
          var names_c_w = await this.getCircleWriterNames(objLetter.circle_id, objLetter.writer_id);
          
          objLetter.circle_name = names_c_w[0];
          objLetter.writer_pseudo = names_c_w[1];

          var repliesList = await this.getAllReplies(objLetter.id);
          for (var j = 0; j < repliesList.length; j++)
          {
            objLetter.replies.push(repliesList[j].id)
          }
          this.lettersListId.push(objLetter);
        }
        this.getLettersFromId();
        this.charged = true;
    }
  },
  mounted(){
    this.getLettersList();
  }
}
</script>
<template>
<div>
    <div class="list-container">
        <DxList v-if="charged"
        :data-source="lettersList"
        height="750px"
        :search-enabled="true"
        searchMode="contains"
        :searchExpr=fields
        >
            <template #item="{ data }">
                <div>
                  <Letter v-if="charged" :letter="data" :from-circle="false"></Letter>
                </div>
            </template>
        </DxList>
    </div>
</div>
</template>