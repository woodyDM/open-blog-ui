
module.exports={
    // transpileDependencies: [
    //     'vue-echarts',
    //     'resize-detector'
    // ],
    devServer:{
        port:8088,
        proxy:{
            '/api':{
                target:'http://localhost:8080',
                changeOrigin:true,
                ws: true,
                pathRewrite:{
                    '/api':'/api'
                }
            }
        }
    },
    configureWebpack: {
        externals: {
            vue: 'Vue',
            'element-ui': 'ELEMENT',

        },
    },
}

