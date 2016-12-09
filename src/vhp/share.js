let __shares = (function () {
    let shares
    return newShares => {
        if (newShares) {
            shares = newShares
        }
        return shares
    }
})()

let __shareKv = {
    wxhy: 'WXSceneSession',     //微信好友
    wxpyq: 'WXSceneTimeline',   //微信朋友圈
    qq: 'qq',                   //QQ好友
    sinaweibo: 'sinaweibo',     //新浪微博
}



class Share {

    constructor(type, fn, op, context) {
        this.config = {
            type, //分享平台
            fn, //结果回调
            op, //需要分享的内容配置
            context, //上下文
        }
        this._initCallback()
        this.start()
    }

    _initCallback() {
        this.ShareCallBack = function (...arg) {
            return this.config.fn.apply(this.config.context, arg)
        }
    }

    start() {
        this.getService(this.config.type, (idShare) => {
            this.sendShare(idShare, () => {
                this.ShareCallBack(null, idShare)
            })
        })
    }

    sendShare(share, sendCallBack) {
        let message = this._getShareInfo(share)
        share.send(message, () => {
            sendCallBack()
        }, (err) => {
            this.ShareCallBack(err, share)
        })
    }

    //分享信息
    _getShareInfo(share) {

        let op = {
            extra: {
                scene: __shareKv[this.config.type]
            },
            href: this.config.op.href,
            title: this.config.op.title, //
            content: this.config.op.content, //

            pictures: [this.config.op.img],
            thumbs: [this.config.op.img],
        }

        if (!op.href) {
            delete op.title
            delete op.content
        }
        return op
    }


    //获取授权
    _getAuth(share, authCallBack) {
        if (!share.authenticated) {
            share.authorize(() => {
                authCallBack()
            }, (...err) => {
                return this.ShareCallBack.apply(null, err)
            });
        } else {
            authCallBack()
        }
    }

    //通过id 获取服务
    _getService(id, CallBack) {
        if(!!~id.toString().indexOf('wx')){
            id = 'weixin'
        } 
        let shares = __shares()
        for (let i in shares) {
            console.log(JSON.stringify(shares[i]))
            if (id === shares[i].id) {
                CallBack && CallBack(shares[i])
                return shares[i]
            }
        }
    }


    //获取服务  
    getService(id, Callback) {
        if (__shares()) {
            return this._getService(id, Callback)
        }
        this._getHtml5PlusServices((data) => {
            __shares(data)
            this._getService(id, Callback)
        })
    }


    //获取设备分享服务列表
    _getHtml5PlusServices(CallBack) {
        plus.share.getServices((services) => {
            CallBack(services)
        }, (err) => {
            this.ShareCallBack(err, null)
        })
    }

}

var sendShare = function (...arg) {
    return new Share(...arg)
}

export {
    sendShare
}