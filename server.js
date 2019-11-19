const jsonServer = require('json-server')
const path = require('path')
const express = require('express') // json-server 里面已经包含express
const server = jsonServer.create()
const router = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

const root = __dirname + '/build'
const port = process.env.LEANCLOUD_APP_PORT || 3004;

server.use(express.static(root, { maxAge: 86400000 })) //24*60*60*1000 = 86400000
server.use(middlewares)

// 配置路由
const reactRouterWhiteList = ['/create', '/edit/:itemId']
server.get(reactRouterWhiteList, (request, response) => {
    response.sendFile(path.resolve(root, 'index.html')) // 把路由指定到index.html
})

server.use(router)
server.listen(port, () => {
    console.log('JSON Server is running on ', port);
})
