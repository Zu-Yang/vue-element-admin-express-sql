<template>
  <div class="game-container">
    <div class="game-wrap" ref="game">
      <div class="bird" ref="bird"></div>
      <div class="mask-wrap" v-show="!begin">
        <span class="countdown" v-show="gameState">{{ countdown === 0 ? '开始' : countdown }}</span>
        <span class="tips" v-show="!begin && !gameState">{{ !begin ? '准备游戏' : '游戏结束' }}</span>
        <div class="btn-start-pause">
          <button @click="beginHandler" v-show="!gameState">{{ begin ? '暂停' : '开始' }}</button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      // Number and location of pipelines
      numAndLocal: [300, 400, 500, 600, 700, 800, 900, 1000],
      timerArr: [],
      gameState: false,
      countdown: 3,// 3秒倒计时
      clickFlag: true,
      begin: false,
      // 背景初始位置
      gameBg: {
        x: 0
      },
      bird: {
        speedX: 5, //小鸟在X轴的速度
        SpeedY: 0, //小鸟在Y轴的速度
        //小鸟坐标
        x: 100, //小鸟初始位置在绝对定位的位置
        y: 300,
      },
      pipeImgs: [
        require("../../../assets/game/up-pipe.png"),
        require("../../../assets/game/down-pipe.png")
      ]
    }
  },
  methods: {
    /* 初始化 */
    resetHandler() {
      const game = document.querySelector('.game-wrap')
      const bird = document.querySelector('.bird')
      game.addEventListener('click', this.clickHandler)
      game.style.backgroundPositionX = '0px'
      bird.style.top = '300px'
      this.gameBg.x = 0
      this.countdown = 3
      this.bird = {
        speedX: 5, //小鸟在X轴的速度
        SpeedY: 0, //小鸟在Y轴的速度
        //小鸟坐标
        x: 100, //小鸟初始位置在绝对定位的位置
        y: 300,
      }
      // 清除所有管道
      const pipeElements = document.querySelectorAll('.game-wrap .pipe')
      pipeElements && pipeElements.forEach((ele) => {
        ele.remove()
      })
      // 清除定时器
      this.timerArr.forEach((timer) => {
        clearInterval(timer)
        this.timerArr = []
      })
      // 重新创建管道
      this.numAndLocal.forEach(item => {
        this.creatPipe(item)
      })
    },
    /* 开始倒计时 */
    countdownHandler() {
      var timer = setInterval(() => {
        console.log('countdownHandler');
        if (this.countdown > 0) {
          this.countdown -= 1
        } else {
          this.countdown = 3
          this.gameState = false
          clearInterval(timer)
        }
      }, 1000)
    },
    /* 开始游戏 */
    beginHandler() {
      var timer = setTimeout(() => {
        this.begin = true
        clearInterval(timer)
      }, 4000)
      this.gameState = true
      this.countdownHandler()
      this.resetHandler()
      this.init()
    },
    clickHandler() {
      const bird = document.querySelector('.bird')
      this.bird.SpeedY = 0
      if (this.clickFlag && this.begin) {
        this.clickFlag = false
        this.bird.SpeedY -= 8
        this.bird.y += this.bird.SpeedY
        bird.style.top = this.bird.y + 'px'
        var timer = setTimeout(() => {
          this.clickFlag = true
        }, 100)
        this.timerArr.push(timer)
      }
    },
    init() {
      const game = document.querySelector('.game-wrap')
      const bird = document.querySelector('.bird')
      this.initTimer = setInterval(() => {
        console.log('init');
        if (this.begin) {
          // 背景向左运动
          this.gameBg.x -= 5
          game.style.backgroundPositionX = this.gameBg.x + 'px'
          // 小鸟下坠
          this.bird.SpeedY += 1
          this.bird.y += this.bird.SpeedY
          bird.style.top = this.bird.y + 'px'

          // 超出顶部、超出底部
          if (this.bird.y < 0 || this.bird.y + bird.offsetHeight > 600) {
            this.begin = false
            this.gameState = false
            clearInterval(this.initTimer)
          }
        }
      }, 30)
    },
    creatPipe(pipeX) {
      const game = document.querySelector('.game-wrap')
      let upHeight = 200 + parseInt(Math.random() * 100) // 上管道 200~300
      let downHeight = 600 - upHeight - parseInt(Math.random() * 100) - 100 // 下管道50~300

      //创建上管道
      let upPipe = document.createElement('div')
      upPipe.classList.add('pipe')
      upPipe.style.position = 'absolute'
      upPipe.style.top = '0px'
      upPipe.style.left = pipeX + 'px'
      upPipe.style.width = '52px'
      upPipe.style.height = upHeight + 'px'
      upPipe.style.background = "url(" + this.pipeImgs[0] + ") no-repeat center bottom"
      game.appendChild(upPipe)

      //创建下管道
      let downPipe = document.createElement('div')
      downPipe.classList.add('pipe')
      downPipe.style.position = 'absolute'
      downPipe.style.bottom = '0px'
      downPipe.style.left = pipeX + 'px'
      downPipe.style.width = '52px'
      downPipe.style.height = downHeight + 'px'
      downPipe.style.background = "url(" + this.pipeImgs[1] + ") no-repeat center top"
      game.appendChild(downPipe)

      // 管道运动
      var timer = setInterval(() => {
        if (this.begin) {
          pipeX -= 2
          if (pipeX < -52) { //管道移出最左侧时回到原位，实现不间断效果
            pipeX = 800;
          }
          upPipe.style.left = pipeX + 'px'
          downPipe.style.left = pipeX + 'px'

          var upCrash = this.bird.x < pipeX + 42 && this.bird.x + 34 > pipeX && this.bird.y + 10 < upHeight // 上管道碰撞
          var downCrash = this.bird.x < pipeX + 42 && this.bird.x + 34 > pipeX && 600 - this.bird.y - 42 < downHeight // 下管道碰撞

          if (downCrash || upCrash) {
            this.begin = false
            this.gameState = false
            clearInterval(this.initTimer)
          }
        }
      }, 30)
      this.timerArr.push(timer)
    }
  },
  mounted() {

  },
  beforeDestroy() {
    // 清除定时器&监听事件
    const game = document.querySelector('.game-wrap')
    game.removeEventListener('click', this.clickHandler)
    clearInterval(this.initTimer)
    this.timerArr.forEach((timer) => {
      clearInterval(timer)
      this.timerArr = []
    })
  }
}
</script>

<style lang="scss" scoped>
$path: '../../../assets/game/';

@keyframes bird {
  0% {
    background-position-x: 0px;
  }

  100% {
    background-position-x: -156px;
  }

}

.game-container {
  width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  .game-wrap {
    width: 100%;
    height: 600px;
    position: relative;
    background-image: url($path+"bg.png");
    overflow: hidden;

    .bird {
      position: absolute;
      width: 52px;
      height: 45px;
      top: 300px;
      left: 100px;
      // transform: translateY(-50%);
      background-image: url($path+"bird.png");
      z-index: 8;
      animation: bird .5s steps(3, end) infinite;
    }

    .mask-wrap {
      width: 100%;
      height: 100%;
      position: absolute;
      background-color: rgba(0, 0, 0, .5);
      z-index: 11;

      .countdown {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 120px;
        transform: translate(-50%, -50%);
        color: #fff;
      }

      .tips {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 30px;
        transform: translate(-50%, -50%);
        color: #fff;
      }

      .btn-start-pause {
        position: absolute;
        top: 65%;
        left: 50%;
        /* font-size: 120px; */
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%);
      }

    }
  }
}
</style>