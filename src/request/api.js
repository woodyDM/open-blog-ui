export default{

    login:{path:'/api/login.json', method:'post'},
    logout:{path:'/api/logout.json', method:'post'},
    isAlive:{path:'/api/isAlive.json', method:'get'},

    article: {path:"/api/article/{id}",method:'get'},
    newArticle:{path:"/api/user/article.json",method:'post'},
    getWhenEditArticle:{path:'/api/user/article/{id}',method:'get'},
    editArticle:{path:'/api/user/article/{id}',method:'post'},
    articleList:{path:'/api/article/list/{userId}', method:'get'},
    
}