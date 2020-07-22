import api from '../index'
import urls from './urls'

export default {
    //params传参
    postlogin(params) {  //params来自vue输入数据
        //return出去一个promise
        params = {
            userid: params.userid,
            password: params.password,
            verifycode:params.verifycode
        }
        return api.post(urls.postlogin, params)
    },
    register(params) {//注册新用户
        params = {  //params是添加到url的请求字符串中的，用于get请求。
            userid: params.userid,
            password: params.password,
            username: params.username,
            question:params.question,
            ans:params.ans
        }
        return api.post(urls.register, params)
    },
    logout() {  //退出登录
        return api.get(urls.logout)
    },
    userinfo() {//获取用户登录信息
        //return出去一个promise
        return api.get(urls.userinfo)
    },
    getwebinfo(params){
        params={
            webname:params
        }
        return api.get(urls.getwebinfo,params)
    },
    edituserinfo(params){
        params={
            userid:params.userid,
            username:params.username
        }
        return api.post(urls.edituserinfo,params)
    },
    updateAvatar(params){
        return api.post(urls.updateAvatar,params)
    },
    updatepassword(params){
        params={
            oldpwd:params.oldpwd,
            newpwd:params.newpwd,
            confirmpwd:params.confirmpwd,
            userid:params.userid
        }
        return api.post(urls.updatepassword,params)
    },
    share(params){
        params={
            userid:params.userid,
            title:params.title,
            context:params.context,
            img:params.img,
            sent:params.sent,
            createtime:params.createtime
        }
        return api.post(urls.share,params)
    },
    getmyshare(params){
        params={
            userid:params
        }
        return api.post(urls.getmyshare,params)
    },
    getshareinfos(){
        return api.post(urls.getshareinfos)
    },
    getsharedetail(params){
        params={id:params}
        return api.post(urls.getsharedetail,params)
    },
    getuserinfo(params){
        params={userid:params}
        return api.post(urls.getuserinfo,params)
    },
    comment(params){
        params={
            userid:params.userid,
            articleid:params.articleid,
            context:params.context,
            time:params.time
        }
        return api.post(urls.comment,params)
    },
    getcomments(params){
        params={articleid:params}
        return api.post(urls.getcomments,params)
    },
    like(params){
        params={
            userid:params.userid,
            articleid:params.articleid
        }
        return api.post(urls.like,params)
    },
    unlike(params){
        params={
            userid:params.userid,
            articleid:params.articleid
        }
        return api.post(urls.unlike,params)
    },
    isliked(params){
        params={
            userid:params.userid,
            articleid:params.articleid
        }
        return api.post(urls.isliked,params)
    },
    delcomment(params){
        params={
            userid:params.userid,
            id:params.id
        }
        return api.post(urls.delcomment,params)
    },
    searchtest(params){
        params={info:params}
        return api.get(urls.searchtest,params)
    },
    searcharticles(params){
        params={info:params}
        return api.get(urls.searcharticles,params)
    },
    getreward(params){
        params={
            userid:params
        }
        return api.post(urls.getreward,params)
    },
    getmylikes(params){
        params={userid:params}
        return api.post(urls.getmylikes,params)
    },
    delarticle(params){
        params={
            id:params
        }
        return api.post(urls.delarticle,params)
    },
    comothers(params){
        params={
            userid:params.userid,
            articleid:params.articleid,
            authorid:params.authorid,
            context:params.context,
            time:params.time,
            commentid:params.commentid,
            authorname:params.authorname,
        }
        return api.post(urls.comothers,params)
    },
    getresponse(params){
        params={
            articleid:params
        }
        return api.post(urls.getresponse,params)
    },
    findpassword(params){
        params={
            newpwd:params.newpwd,
            confirmpwd:params.confirmpwd,
            userid:params.userid
        }
        return api.post(urls.findpassword,params)
    },
    follow(params){
        params={
            followid:params.followid,
            userid:params.userid,
            followname:params.followname
        }
        return api.post(urls.follow,params)
    },
    unfollow(params){
        params={
            followid:params.followid,
            userid:params.userid
        }
        return api.post(urls.unfollow,params)
    },
    isfollow(params){
        params={
            followid:params.followid,
            userid:params.userid
        }
        return api.post(urls.isfollow,params)
    },
    editshare(params){
        params={
            id:params.id,
            userid:params.userid,
            title:params.title,
            context:params.context,
            img:params.img,
            sent:params.sent,
            createtime:params.createtime
        }
        return api.post(urls.editshare,params)
    },
    getmyfollow(params){
        params={
            userid:params
        }
        return api.post(urls.getmyfollow,params)
    },
    getmycomments(params){
        params={
            userid:params
        }
        return api.post(urls.getmycomments,params)
    },
    delresponse(params){
        params={
            userid:params.userid,
            id:params.id
        }
        return api.post(urls.delresponse,params)
    }
}