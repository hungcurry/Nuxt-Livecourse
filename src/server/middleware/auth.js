export default defineEventHandler((event) => {
  // 特別注意 server / middleware 能攔截的只有站內的 Request
  // 也就是 api/hello.js 這種站內 API 會被攔截到
  // console.log(event.node.req.url)
})
