<template>
    <!-- element plus  表单验证注意项  -->
    <!-- form 必须使用 ref获取 form实例  需要绑定  :model="xxx" :rules="xxx" -->
    <!-- form 需要验证的字段 需要在 form-item 上声明 prop = “xxxx“   注意不是props -->
    <!-- form 需要验证的数据 必须是 mobel 中绑定的数据，  rules 与 model 与之配对 -->

    <div class="login-container">
        <el-form class="login-form" ref="ruleFormRef" :model="form" :rules="rules">
            <el-form-item>
                <div class="img-form">
                    <img class="login-img" src="@/assets/logo_index.png" alt />
                </div>
            </el-form-item>

            <el-form-item prop="name">
                <el-input v-model="form.name" placeholder="请输入手机号" />
            </el-form-item>
            <el-form-item prop="code">
                <el-input v-model="form.code" placeholder="请输入验证码" />
            </el-form-item>
            <el-form-item prop="isAgree">
                <el-checkbox v-model="form.isAgree">我已阅读并同意用户协议和隐私条款</el-checkbox>
            </el-form-item>

            <el-form-item>
                <el-button
                    :loading="isLoading"
                    class="login-btn"
                    type="primary"
                    @click="submitForm(ruleFormRef)"
                >登录</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    name: "my-login",
};
</script>

<script setup>
// import request from "@/utils/request";

import { reactive, ref, inject, useRouter } from "vue";

import { login } from "@/api/user"

// const { appContext } = getCurrentInstance();
// appContext.config.globalProperties.$message.success("聪明");
// ElMessage = appContext.config.globalProperties.$message;
// ElMessage({ message: "登录成功", type: "success" }, appContext);

const ruleFormRef = ref();
const ElMessage = inject("$message");
const isLoading = ref(false);
const Router = useRouter()


const form = reactive({
    name: "13911111111",
    code: "246810",
    isAgree: true
});

const checkIsAgree = (rule, value, callback) => {
    if (!value) {
        callback(new Error("请勾选同意用户协议"))
    } else {
        callback()
    }
}


const rules = reactive({
    name: [
        { required: true, message: "手机号不能为空", trigger: "change" },
        {
            pattern:
                /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/,
            message: "手机号格式不对",
            trigger: "blur",
        },
    ],
    code: [
        { required: true, message: "验证码不能为空", trigger: "blur" },
        {
            pattern: /^\d{6}$/,
            message: "验证码必须为6位数字",
            trigger: "blur",
        },
    ],
    isAgree: [{ validator: checkIsAgree, trigger: ["change", "blur"] }]
});


const onLogin = async () => {

    isLoading.value = true; // button loading

    try {
        const { data } = await login({
            mobile: form.name,
            code: form.code,
        });
        ElMessage({
            message: "登录成功",
            type: "success",
        });
        console.log(data);
        Router.push({
            name:"home"
        })
        

    } catch (err) {
        // console.log(err);
        ElMessage({
            showClose: true,
            message: "登录失败，用户名或密码错误",
            type: "error",
        });
    }
    isLoading.value = false;
};

const submitForm = async (formEl) => {
    if (!formEl) return;
    await formEl.validate(valid => {
        if (valid) {
            // 表单验证通过 valid 是有效的
            onLogin()
        } else {
            ElMessage({
                showClose: true,
                message: "请填写正确的信息",
                type: "warning",
            });
        }
    });
};
</script>


<style lang="less" scoped>
.login-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url("@/assets/login_bg.jpg") no-repeat;
    display: flex;
    justify-content: center;
    align-items: center;
    .login-form {
        background-color: #fff;
        width: 300px;
        padding: 20px 50px;
        .el-form-item__content {
            display: flex;
            justify-content: center;
            align-items: center;
            .login-btn {
                width: 100%;
            }
        }
        .img-form {
            width: 100%;
            display: flex;
            justify-content: space-around !important;
        }
        .login-img {
            height: 40px;
        }
    }
}
</style>
