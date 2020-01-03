export default{
    isLogin:function(loginUser){
      if(loginUser){
        const now = new Date().getTime();
        const loginTime = loginUser.loginTime;
        const left = loginUser.maxTime * 1000 + loginTime - now;
        console.log("user loged left "+(left/1000));
        return left > 0;
      }else{
        return false;
      }
    },
    hasUser:function(loginUser){
        return loginUser!=null && loginUser!=undefined;
    }
}