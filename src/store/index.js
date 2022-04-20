import { createStore} from "vuex";
import deal from "@/store/modules/deal";
import user from "@/store/modules/user"
import toast    from "@/store/modules/toast";
import opportunity from "@/store/modules/opportunity";
export default  createStore({


    modules :{
        deal,
        user,
        toast,
        opportunity

    }

})