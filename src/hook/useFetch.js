import {
    reactive,
    isReactive,
    ref,
    isRef,
    unref,
    toRefs,
    watchEffect
} from "vue"

function timeout() {
    return new Promise((resolve, reject) => {

        setTimeout(() => {
            if (Math.random() > 0.4) {
                resolve()
            } else {
                reject(new Error("Random Error"))
            }
        }, 500)
    })
}

export default function (api, params = reactive({}),isLoading = ref(true)) {

    // const result = reactive({})
    // const error = reactive({})
    const result = ref(null)
    const error = ref(null)

    async function doFetch() {
        
        // 当用户 点击 重试 retry，时 清空上一次的 value
        result.value = null
        error.value = null
            const {
                page,
                status,
                channel_id,
                date,
                loading,
            } = toRefs(params)
            
            const newParams = {
                page: page ?.value,
                status: status ?.value,
                channel_id:channel_id?.value,
                begin_pubdate:date?.value[0],
                end_pubdate:date?.value[1],
                per_page: 10,
            }
            // console.log(newParams);
        try {
            const {
                data: {
                    data
                }
            } = await api(newParams)

            // await 之后的代码会推入 微任务 队列
            result.value = data

            console.log(result.value);
            isLoading.value = false
            //  result.value = data.results  // results 是数组， 但经过 reactive 后
            // results 变成了 propx obj  响应式 obj Array 
            // console.log(typeof result.value.results); // propx obj
            // console.log( result.value.results);

        } catch (err) {
            error.error = err
        }
    }

    if (isReactive(params)) {
        watchEffect(doFetch)
    } else {
        doFetch()
    }
    // console.log("最终结果", result);
    return {
        result,
        error,
        retry: doFetch
    }
}