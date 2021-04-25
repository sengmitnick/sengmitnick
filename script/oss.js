const qiniu = require('qiniu');
const fs = require('fs');
const glob = require("glob");

var bucket = 'sengmitnick';
var accessKey = 'accessKey';
var secretKey = 'secretKey';
var mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
var putPolicy = new qiniu.rs.PutPolicy({ scope: bucket });
var uploadToken = putPolicy.uploadToken(mac);

var config = new qiniu.conf.Config({ zone: qiniu.zone.Zone_z2 });

var formUploader = new qiniu.form_up.FormUploader(config);
var putExtra = new qiniu.form_up.PutExtra();

function uploaderFile(localFile) {
  return new Promise((resolve, reject) => {
    var key = localFile.replace('/root/code/blog/public/', '');
    // 文件上传
    console.log(`${key} start uploading`);
    formUploader.putFile(uploadToken, key, localFile, putExtra, function (respErr,
      respBody, respInfo) {
      if (respErr) {
        console.log(`${key} upload failed`);
        console.log(respErr);
        reject(respErr)
        return;
      }
      if (respInfo.statusCode == 200) {
        console.log(`${key} upload succeeded`);
        resolve(respInfo);
      } else {
        console.log(`${key} upload failed: ${respInfo.statusCode}`);
        console.log(respBody);
        reject(respInfo)
      }
    });
  })

}

glob("/root/code/blog/public/**/*.*", async function (er, files) {
  console.log(`start uploading`);
  for (const file of files) {
    const stats = fs.statSync(file)
    if (stats.isFile()) {
      await uploaderFile(file)
    }
  }
  console.log(`upload succeeded`);
})