// 要生成的文件名，必填，会自动生成 test.js test.vue test-mixin.js
const fileName = 'paymentRange'
const fileNameCn = '支付范围'

// 要取的模版在什么地方，这个是写死的，也可以做成可配置，但是相应的repalces配置也要写
const protoFileName = 'protoCode'

// 生成的vue文件，相对路径 ['/', 'login', 'managementCenter', 'merchantCenter', 'marketActivity', 'system', 'selfHelpPurchase']
const vueRelativePath = 'merchantCenter'

// 生成api文件的相对路径 ['/', 'business', 'common', 'manangementCenter', 'marketActivity', 'system', 'selfHelpPurchase']
// 为了配置灵活，就不用数组来取，而是用字符串
const apiRelatviPath = '/business'

// api js文件接口前缀
const apiHeader = 'ops/store-distance' || `ops/${fileName}`

const opsProtoStr = `/ops/${protoFileName}`
const apiProtoStr = `${protoFileName}Api`
module.exports = {
  fileName,
  protoFileName,
  vueRelativePath,
  apiRelatviPath,

  // api js文件需要替换的内容
  apiReplaceFrom: () => new RegExp(opsProtoStr, 'g'),
  apiReplaceTo: apiHeader,

  // vue 文件需要替换的内容
  vueReplaceFrom: [
    /新增proto配置/g,
    /编辑proto配置/g,
    `@/api/${protoFileName}`,
    `${protoFileName}-mixin`,
    /proto-file/g,
  ],
  vueReplaceTo: [
    `新增${fileNameCn}`,
    `编辑${fileNameCn}`,
    `@/api${apiRelatviPath}/${fileName}`,
    `${fileName}-mixin`,
    `${fileName}`,
  ],

  // mixin.js 文件需要替换的内容
  mixinReplaceFrom: [() => new RegExp(apiProtoStr, 'g'), `@/api/${protoFileName}`],
  mixinReplaceTo: [`${fileName}Api`, `@/api${apiRelatviPath}/${fileName}`],
}
