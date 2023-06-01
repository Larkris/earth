// 2023-03-11 09:50

if (!$response.body) $done({});
const url = $request.url;
var body = $response.body;

function getCube(p) {
  if (/^https:\/\/hd\.mina\.mi\.com\/splashscreen\/alert/.test(p)) {
    return "小爱音箱-开屏广告";
  }
  if (/^https:\/\/api\.m\.mi\.com\/v1\/app\/start$/.test(p)) {
    return "小米商城-开屏广告";
  }
}

switch (getCube(url)) {
  case "小爱音箱-开屏广告":
    try {
      let obj = JSON.parse(body);
      let data = [];
      for (let i = 0; i < obj.data.length; i++) {
        let ad = obj.data[i];
        ad.start = "2208960000000";
        ad.end = "2209046399000";
        ad.stay = 1;
        ad.maxTimes = 1;
        data.push(ad);
      }
      obj.data = data;
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`小爱音箱-开屏广告, 出现异常: ` + error);
    }
    break;
  case "小米商城-开屏广告":
    try {
      let obj = JSON.parse(body);
      obj.code = 0;
      obj.data.skip_splash = true;
      delete obj.data.splash;
      obj.info = "ok";
      obj.desc = "成功";
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`小米商城-开屏广告, 出现异常: ` + error);
    }
    break;
  default:
    break;
}

$done({ body });