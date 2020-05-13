<template>
    <div id="page">
        <div style="width: 100%" class="flex-container column">
            <video id="video" src="https://cdn.zuitiankeji.com/js5k9-l6u77.mp3" controls="controls" hidden="hidden" autoplay="autoplay"  loop="loop"> </video>

            <img  id="img" class="play" style="transform: translate(-1584.4%, 121.5%) scale(1)" :src="sound" @click="play()">

        </div>
    </div>
</template>


<script>
 export default {
    data() {
        return {
            sound: require('../../static/img/miu.png'),
    }   },
    methods:{
        play(){
                let vo = document.getElementById("video")
                if(this.sound == require('../../static/img/miu.png')){
                    this.sound = require('../../static/img/miu.png')
                    vo.autoplay = true
                    vo.play()
                }
                else{
                    this.sound = require('../../static/img/miu.png')
                    vo.pause()
                }

            }
    }
        
}
</script>