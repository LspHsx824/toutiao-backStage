<script setup>

import { reactive, ref, watch, markRaw, defineEmits, getCurrentInstance, nextTnextTick } from "vue"

import useFetch from "@/hook/useFetch"

import { getArticles, getArticleChannels, deleteArticle } from "@/api/article"

import { ArrowRight, Edit, Delete, Picture } from '@element-plus/icons-vue'

import { ElMessage, ElMessageBox } from 'element-plus'


const { ctx: that } = getCurrentInstance()

//自定义事件必须小写，否则 会出现黄色警告
const emits = defineEmits(['current-change'])


const loading = ref(true) // 数据加载 loading 显示

// 中间值 储存 table articles channel 的数据
const tableData = reactive({})
const channelData = reactive({})

const status = ref(null)

const date = ref([]) //  选择时间范围
const curPag = ref(1)  // 当前页码
const channel_id = ref(null) //频道id
const params = reactive({}) // 数据请求 params 参数 对象


watch(params, () => {

    if (loading.value) return
    loading.value = true
})

params.date = date
params.page = curPag
params.status = status
params.channel_id = channel_id

const { result, error, retry } = useFetch(getArticles, params, loading)

const { result: chanenl, } = useFetch(getArticleChannels,)
/**
 *!tableData.value = result.value
 *  
 * !这是错误的写法， result 是有响应式的， result.value 会丢失响应式
 * !这种写法 等价于 { name } = reactive({ mame:"这个值结构会丢失响应式" })
 * !结构响应式 obj 会丢失 响应式 才 传值和传值的概念
 * * */
tableData.value = result
channelData.value = chanenl

// 状态按钮 文本 类型 数据封装
const checkedStatus = markRaw([
    { type: 'info', label: '草稿' },
    { type: '', label: '待审核' },
    { type: 'success', label: '审核通过' },
    { type: 'warning', label: '审核失败' },
    { type: 'danger', label: '已删除' },
])


// 编辑按钮 修改文章内容
const handleEdit = (a, b) => {
    console.log(a, b);
}

const deleteArticleById = articleId => {

    // 后端返回 大数字 数据 
    // console.log(articleId.toString())

    ElMessageBox.confirm(
        '你确定要删除吗?',
        'Warning',
        {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
        }
    )
        .then(() => {

            deleteArticle(articleId.toString())

            /**
             * ! 没有效果
             * nextTnextTick(that.$forceUpdate)
             *   that.$forceUpdate() 
             */
            loading.value = true

            const { result } = retry()
            tableData.value = result

            ElMessage({
                type: 'success',
                message: 'Delete completed',
            })

        })
        .catch(() => {
            ElMessage({
                type: 'info',
                message: 'Delete canceled',
            })
        })
}


const onSubmit = () => {
    loading.value = true
    setTimeout(() => loading.value = false, 300)
}


//页码跳转 修改内容
const changePagesData = page => {
    // const { result }= useFetch(getArticles, { page,per_page:10 })
    curPag.value = page
    tableData.value = result
}


</script>

<template>
    <div class="form-container">
        <el-card class="box-card">
            <template #header>
                <div class="card-header">
                    <el-breadcrumb :separator-icon="ArrowRight" class="nav">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item :to="{ path: '/' }">内容管理</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
            </template>

            <el-form label-width="120px">
                <el-form-item label="状态">
                    <el-radio-group v-model="status">
                        <el-radio :label="null">全部</el-radio>

                        <el-radio :label="0">草稿</el-radio>

                        <el-radio :label="1">待审核</el-radio>

                        <el-radio :label="2">审核通过</el-radio>

                        <el-radio :label="3">审核失败</el-radio>

                        <el-radio :label="4">已删除</el-radio>
                    </el-radio-group>
                </el-form-item>

                <el-form-item label="频道">
                    <el-select v-model="channel_id" placeholder="请选择">
                        <template v-if="channelData.value">
                            <el-option label="全部" :value="null" />
                            <el-option
                                v-for="(item,index) in channelData.value.channels"
                                :key="index"
                                :label="item.name"
                                :value="item.id"
                            />
                            <!-- <el-option label="Zone two" value="beijing" /> -->
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label="日期">
                    <div class="block">
                        <el-date-picker
                            type="daterange"
                            v-model="date"
                            start-placeholder="Start Date"
                            end-placeholder="End Date"
                            format="YYYY-MM-DD"
                            value-format="YYYY-MM-DD"
                        />
                    </div>
                </el-form-item>

                <el-form-item>
                    <el-button type="primary" :disabled="loading" @click="onSubmit">筛选</el-button>
                </el-form-item>
            </el-form>
        </el-card>

        <el-card class="box-table" v-loading="loading">
            <template #header>
                <div class="card-header">
                    共找到
                    <el-tag class="queryR" type="info" round>{{ tableData.value?.total_count || 0 }}</el-tag>条数据
                </div>
            </template>
            <template v-if="tableData.value">
                <el-table
                    :data="tableData.value.results"
                    class="table-comtainer"
                    stripe
                    style="width: 100%"
                >
                    <el-table-column label="封面">
                        <template #default="scope">
                            <!-- <img :src="scope.row.cover.images[0]" alt=""> -->
                            <!-- {{ scope.row.cover.images }} -->
                            <!-- {{ scope.row.status }} -->
                            <el-image :src="scope.row.cover.images[0]" class="img" lazy>
                                <template #error>
                                    <div class="image-slot">
                                        <el-icon class="picture-icon">
                                            <Picture />
                                        </el-icon>
                                    </div>
                                </template>
                            </el-image>
                        </template>
                    </el-table-column>
                    <el-table-column prop="title" label="标题" />
                    <el-table-column prop="status" label="状态">
                        <template #default="{ row }">
                            <el-tag
                                :type="checkedStatus[row.status].type"
                                size="large"
                            >{{ checkedStatus[row.status].label }}</el-tag>
                        </template>
                    </el-table-column>
                    <el-table-column prop="pubdate" label="发布时间" />
                    <el-table-column label="操作">
                        <template #default="{ row }">
                            <!-- <el-button type="primary" :icon="Edit" circle /> -->
                            <el-button type="primary" circle>
                                <template #icon>
                                    <el-icon>
                                        <component :is="Edit"></component>
                                    </el-icon>
                                </template>
                            </el-button>
                            <el-button
                                type="danger"
                                @click="deleteArticleById(row.id)"
                                :icon="Delete"
                                circle
                            />
                        </template>
                    </el-table-column>
                </el-table>

                <el-pagination
                    class="Pagination"
                    background
                    layout="prev, pager, next"
                    :total="tableData.value.total_count"
                    v-model:current-page="curPag"
                    @current-change="changePagesData"
                />
            </template>
            <template v-else>
                <h3>正在努力加载中.....</h3>
            </template>
        </el-card>
        <!-- {{tableData.value}} -->
    </div>
</template>

<style lang="less" scoped>
.form-container {
    padding: 20px 40px 0 40px;
    // background-color: skyblue;
}
.box-table {
    margin-top: 20px;
    .img {
        width: 100%;
        height: 100px;
        display: flex;
        justify-content: center;
        align-items: center;
        .picture-icon {
            font-size: 50px;
        }
    }
    .Pagination {
        display: flex;
        justify-content: flex-end;
        margin: 15px 0 0 0;
    }
}
.queryR {
    width: auto;
    padding: 10px;
    margin-right: 10px;
}
.el-card {
    // padding-bottom: 10px !important;
}
</style>
