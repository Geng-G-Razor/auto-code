### 一个命令行工具，可以根据配置文件，基于模板文件，生成新的页面，可以自定义页面文件名，页面标题，页面接口,页面路径，关联文件路径等
* 使用  node autoFile.js
* 删除  node autoFile.js -d
* 通过'commnader'来接受命令行参数
* 通过'replace-in-file'来进行页面替换
* 通过fs.readFile,fs.writeFile,fs.unlinkSync来进行文件读写删除操作
