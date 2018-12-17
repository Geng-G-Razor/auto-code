
const fs = require('fs')
const path = require('path')
const fileConfig = require('./autoFileConfig')
const program = require('commander')
const replace = require('replace-in-file')

const configFileName = `${fileConfig.fileName}.js`
const configMixinName = configFileName.replace('.js', '-mixin.js')
const configVueName = configFileName.replace('.js', '.vue')

const apiPath = path.join(__dirname, '../src/api', fileConfig.apiRelatviPath, configFileName)
const mixinPath = path.join(__dirname, '../src/mixins', configMixinName)
const vuePath = path.join(__dirname, '../src/pages', fileConfig.vueRelativePath, configVueName)

program.option('-d, --delete', 'remove generate files').parse(process.argv)

if (program.delete) {
  fs.unlinkSync(apiPath)
  fs.unlinkSync(mixinPath)
  fs.unlinkSync(vuePath)
  return
}

function replaceFile(dest) {
  let result
  if (dest.indexOf('.vue') > -1) {
    result = replace.sync({
      files: dest,
      from: fileConfig.vueReplaceFrom,
      to: fileConfig.vueReplaceTo,
    })
  } else if (dest.indexOf('-mixin.js') > -1) {
    result = replace.sync({
      files: dest,
      from: fileConfig.mixinReplaceFrom,
      to: fileConfig.mixinReplaceTo,
    })
  } else if (dest.indexOf('.js') > -1) {
    const testOptions = {
      files: dest,
      from: fileConfig.apiReplaceFrom,
      to: fileConfig.apiReplaceTo,
    }
    result = replace.sync(testOptions)
  }
  console.log('result', result)
}

function generateFile(source, dest) {
  fs.readFile(source, 'utf8', (err, data) => {
    if (err) {
      return console.log(err)
    }
    fs.writeFile(dest, data, 'utf-8', writeErr => {
      if (writeErr) {
        return console.log(writeErr)
      }
      replaceFile(dest)
      return true
    })
    return true
  })
}

const protoFileName = `${fileConfig.protoFileName}.js`

const defaultApiFile = protoFileName
const sourceApiFile = path.join(__dirname, '../src/api', defaultApiFile)
const destApiFile = path.join(apiPath)
generateFile(sourceApiFile, destApiFile)

const defaultMixinFile = protoFileName.replace('.js', '-mixin.js')
const sourceMinxinFile = path.join(__dirname, '../src/mixins', defaultMixinFile)
const destMixinFile = path.join(mixinPath)
generateFile(sourceMinxinFile, destMixinFile)

const defaultVueFile = protoFileName.replace('.js', '.vue')
const sourceVueFile = path.join(__dirname, '../src/pages', defaultVueFile)
const destVueFile = path.join(vuePath)
generateFile(sourceVueFile, destVueFile)

// delete generate files
