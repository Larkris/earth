// 2023-12-11 17:00

const url = $request.url;
const isResp = typeof $response !== "undefined";
let body = $response.body;

switch (isResp) {
  // 淘宝-开屏视频广告
  case /^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.cloudvideo\.video\.query/g.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.data?.duration) {
        obj.data.duration = "0";
      }
      if (obj?.data?.resources?.length > 0) {
        obj.data.resources = [];
      }
      if (obj?.data?.caches?.length > 0) {
        obj.data.caches = [];
      }
      if (obj?.data?.respTimeInMs) {
        obj.data.respTimeInMs = "3818332800000";
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`淘宝-开屏视频广告, 出现异常: ` + error);
    }
    break;
  // 淘宝-开屏图片广告
  case /^https:\/\/guide-acs\.m\.taobao\.com\/gw\/mtop\.taobao\.wireless\.home\.splash\.awesome\.get/g.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.data?.containers?.splash_home_base) {
        let splash = obj.data.containers.splash_home_base;
        if (splash?.base?.sections?.length > 0) {
          for (let items of splash.base.sections) {
            if ("taobao-splash" in items.bizData) {
              if (items?.bizData?.["taobao-splash"]?.data?.length > 0) {
                for (let item of items.bizData["taobao-splash"].data) {
                  item.waitTime = "0";
                  item.times = "0";
                  item.hotStart = "false";
                  item.haveVoice = "false";
                  item.hideTBLogo = "false";
                  item.enable4G = "false";
                  item.coldStart = "false";
                  item.waitTime = "0";
                  item.startTime = "3818332800000";
                  item.endTime = "3818419199000";
                  item.gmtStart = "2090-12-31 00:00:00";
                  item.gmtEnd = "2090-12-31 23:59:59";
                  item.gmtStartMs = "3818332800000";
                  item.gmtEndMs = "3818419199000";
                  if (item?.imgUrl) {
                    item.imgUrl = "";
                  }
                  if (item?.videoUrl) {
                    item.videoUrl = "";
                  }
                }
              }
            }
          }
        }
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`淘宝-开屏图片广告, 出现异常: ` + error);
    }
    break;
  // 淘宝-开屏活动
  case /^https:\/\/poplayer\.template\.alibaba\.com\/\w+\.json/g.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.res?.images?.length > 0) {
        obj.res.images = [];
      }
      if (obj?.res?.videos?.length > 0) {
        obj.res.videos = [];
      }
      if (obj?.enable) {
        obj.enable = false;
      }
      if (obj?.mainRes?.images?.length > 0) {
        obj.mainRes.images = [];
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`淘宝-开屏活动, 出现异常: ` + error);
    }
    break;
  // 小爱音箱-开屏广告
  case /^https:\/\/hd\.mina\.mi\.com\/splashscreen\/alert/g.test(url):
    try {
      let obj = JSON.parse(body);
      let data = [];
      for (let i = 0; i < obj.data.length; i++) {
        let ad = obj.data[i];
        ad.start = "3818332800000";
        ad.end = "3818419199000";
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
  // 小米商城-开屏广告
  case /^https:\/\/api\.m\.mi\.com\/v1\/app\/start/g.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.data?.skip_splash) {
        obj.data.skip_splash = true;
      }
      if (obj?.data?.splash) {
        delete obj.data.splash;
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`小米商城-开屏广告, 出现异常: ` + error);
    }
    break;
  // 小米商城-物流页推广
  case /^https:\/\/api\.m\.mi\.com\/v1\/order\/expressView/g.test(url):
    try {
      let obj = JSON.parse(body);
      if (obj?.data?.bottom?.ad_info) {
        delete obj.data.bottom.ad_info;
      }
      body = JSON.stringify(obj);
    } catch (error) {
      console.log(`小米商城-物流页推广, 出现异常: ` + error);
    }
    break;
  default:
    $done({});
}

$done({ body });