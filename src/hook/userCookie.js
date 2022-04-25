import CryptoJS from "crypto-js";

export default function () {
    const setCookie = (name, code, vaildTime) => {
        // const code_cookie = shallowReadonly(code)
        const ciphertsts = CryptoJS.AES.encrypt(code, "secre key");
        // console.log(ciphertsts);

        let exdate = new Date(); //  获取时间

        //有效时间
        exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * vaildTime); //  保存的天数
        // 字符串拼接cookie
        // console.log(document.cookie);

        window.document.cookie =
            'mobile' + '=' + name + ';path=/;expires=' + exdate.toGMTString()
        window.document.cookie =
            'code' + '=' + ciphertsts + ';path=/;expires=' + exdate.toGMTString()
        // console.log(document.cookie);

    };

    const getCookie = () => {
        if ((document.cookie ?? "") !== "") {
            const userInfo = {};
            // console.log(document.cookie);
            let arr = document.cookie.split("; "); // 这里显示的格式需要切割

            while (arr.length) {
                let [name, value] = arr.shift().split("=")
                if(name === "code"){
                    let  bytes = CryptoJS.AES.decrypt(
                        value.toString(),
                        'secre key'
                      )
                      value =  bytes.toString(CryptoJS.enc.Utf8)
                    //   console.log(value);
                }
                userInfo[name] = value
            }
            return userInfo
        }
    };

    const clearCookie = () => {
        setCookie("", "", -1); // 修改2值都为空，天数为负1天就好了
    };

    return {
        setCookie,
        getCookie,
        clearCookie,
    };
}