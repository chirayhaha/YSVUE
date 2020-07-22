module.exports = {
    devServer: {
        host:"0.0.0.0",//要设置当前访问的ip 否则失效
        proxy: {
            '/api':{
                target:'http://localhost:3000',
                changeOrigin:true,
                ws:true,
            }
        }
    }
}