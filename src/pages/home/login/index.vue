<template>
<div class="bg-white w-full h-full">
    <div class="flex items-center justify-between" style="height: 100%;margin-right: 14%;margin-left: 14%;" >
        <div class="title relative ">
            <div class="background" style="width: 450px;height: 200px;">
            </div>
            <div class="titleText absolute font-black text-5xl w-full">
                <h1>Sign In to</h1>
                <h1>Open the World</h1>        
            </div>
        </div>
        <div class="form flex flex-col items-center bg-red-200 relative top-7" style="width: 400px;height: 480px;">
            <input class="mt-12" type="text">
            <input class="mt-8" type="password">
            <div  class="loginButton flex items-center justify-center cursor-pointer mt-16" style="">
                <span class="font-semibold">Sign In</span>
            </div>
        </div>
    </div>
</div>
</template>

<script setup lang='ts'>

</script>

<style scoped>
.background{
    z-index: -1;
    background-image:linear-gradient(0deg,#a18cd1 0%, #fbc2eb 100%);
    filter: blur(70px);
}
.titleText{
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.form input{
    width: 300px;
    height: 50px;
    border-radius: 14px;
    padding-left: 15px;
    padding-top: 15px;
    padding-bottom: 15px;
    outline-color: var(--primary-color);
    background-color: antiquewhite;
}
.loginButton{
    width: 300px;
    height: 40px;
    background-color: var(--primary-color);
    border-radius: 14px;
}
</style>
