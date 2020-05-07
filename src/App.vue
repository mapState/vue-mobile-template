<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
  @import './assets/css/reset.css'
  /* 适配iphoneX顶部填充*/
@supports (top: env(safe-area-inset-top)){
  body,
  .header{
      padding-top: constant(safe-area-inset-top);
      padding-top: env(safe-area-inset-top);
  }
}
/* 判断iphoneX 将 footer 的 padding-bottom 填充到最底部 */
@supports (bottom: env(safe-area-inset-bottom)){
    body,
    .footer{
        padding-bottom: constant(safe-area-inset-bottom);
        padding-bottom: env(safe-area-inset-bottom);
    }
}
</style>
