import { createStore} from "vuex"

import { setItem,getItem} from "@/utils/localStorage"

const TOKEN_KEY = "TOKEN_BACK_KEY"

const store = createStore({
    state:{
        userInfo: getItem(TOKEN_KEY) || null
    },
    mutations:{
        setUser(state,data){
            state.userInfo = data
            setItem(TOKEN_KEY,data)
        }
    }
   
})


export default store