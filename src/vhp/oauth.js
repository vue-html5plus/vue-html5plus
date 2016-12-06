

class OAuth {

    constructor(type, fn, context) {
        this.auths = null
        this.type = type
        this.OAuthCallBack = function () {
            return fn.apply(context, arguments)
        }
        this.start()
    }

    start(){
        this.getService(this.type, (idAuth)=>{
            this.getOAuthInfo(idAuth,()=>{
                this.OAuthCallBack(null, idAuth)
            })
        })
    }

    


    //获取登录信息
    getOAuthInfo(auth, getInfoCallBack) {
        this._OAuthLogin(auth, ()=>{
            auth.getUserInfo(() => {
                getInfoCallBack && getInfoCallBack(auth)
            }, () => {
                return this.OAuthCallBack.apply(null, arguments) 
            })
        })
    }

    //服务进行注销 
    // _OAuthLogout(auth, logoutCallBack) {
    //     auth.logout()
    // }

    //服务进行登录
    _OAuthLogin(auth, loginCallBack) {
        if (!auth.authResult) {
            auth.login(() => {
                loginCallBack && loginCallBack()
            }, () => {
                return this.OAuthCallBack.apply(null, arguments)
            });
        } else {
            loginCallBack && loginCallBack()
        }
    }


    //通过id 获取服务
    _getService(id, CallBack) {
        for (let i in this.auths) {
            if (id === this.auths[i].id) {
                CallBack && CallBack(this.auths[i])
                return this.auths[i]
            }
        }
    }

    //获取服务  
    getService(id, Callback) {
        if (this.auths === null) {
            return this._getHtml5PlusServices((err, data) => {
                if (err) {
                    return this.OAuthCallBack.apply(null, arguments)
                }
                this.auths = data;
                this._getService(id, Callback)
            })
        }
        this._getService(id, Callback)
    }

    //获取设备授权登录认证服务列表
    _getHtml5PlusServices(CallBack) {
        plus.oauth.getServices((services) => { 
            CallBack(null, services)
        }, (err) => {
            CallBack(err, null)
        })
    }

}

var getOAuth = function(_op, _context){
	for(var i in _op){
        new OAuth(i, _op[i], _context)
	}
}

export {
    getOAuth
}