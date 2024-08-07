// 2024-06-08 09:40

const url = $request.url;
if (!$response.body) $done({});
let obj = JSON.parse($response.body);

if (url.includes(".guoguo.nbnetflow.ads.mshow")) {
  // 首页
  if (obj?.data) {
    const items = [
      "10", // 物流详情页 底部横图
      "52",
      "205", // 支付宝 小程序 主页右下角领红包动图
      "328", // 3位数为家乡版本
      "366",
      "369",
      "498", // 物流详情页 左上角
      "615",
      "616",
      "727",
      "793", // 支付宝 小程序 搜索框
      "954", // 支付宝 小程序 置顶图标
      "1017", // 关联淘宝包裹
      "1163", // 支付宝 小程序 物流详情地图页面左下角悬浮广告
      "1164", // 支付宝 小程序 物流详情地图页面左侧悬浮广告
      "1255", // 关联快手包裹
      "1275", // 果酱即将到期
      "1308", // 支付宝 小程序 横图
      "1316", // 头部 banner
      "1332", // 我的页面 横图
      "1340", // 查快递 小妙招
      "1372", // 你有一个5元红包待领
      "1382",
      "1391", // 支付宝 小程序 寄包裹
      "1410", // 导入拼多多、抖音快递
      "1411", // 图片识别功能升级通知
      "1428", // 幸运号
      "1524", // 抽现金
      "1525", // 幸运包裹
      "1562", // 自动识别物流截图查包裹
      "1607", // 查快递导包裹就找菜小鸟
      "1638", // 为你精选了一些商品
      "1910" // 618促销红包
    ];
    for (let i of items) {
      if (obj.data?.[i]) {
        delete obj.data[i];
      }
    }
  }
} else if (url.includes(".guoguo.nbnetflow.ads.show")) {
  // 我的页面
  if (obj?.data?.result?.length > 0) {
    // 29338 寄件会员
    // 29339 裹酱积分
    // 29577 生活服务
    // 33927 绿色能量
    // 36649 回收旧物
    // 37127 回收订单
    // 38241 寄件5折券
    // 38436 寄件6元券
    // 38480 寄件5折券
    obj.data.result = obj.data.result.filter(
      (i) =>
        !(
          i?.materialContentMapper?.adItemDetail ||
          (i?.materialContentMapper?.bgImg && i?.materialContentMapper?.advRecGmtModifiedTime) ||
          ["common_header_banner", "entertainment", "kuaishou_banner"]?.includes(i?.materialContentMapper?.group_id) ||
          ["29338", "29339", "29577", "32103", "33927", "36649", "37127", "38241", "38436", "38480"]?.includes(i?.id)
        )
    );
  }
} else if (url.includes(".nbfriend.message.conversation.list")) {
  // 消息中心
  if (obj?.data?.data?.length > 0) {
    obj.data.data = obj.data.data.filter((i) => i?.conversationId?.includes("logistic_message"));
  }
} else if (url.includes(".nbpresentation.pickup.empty.page.get")) {
  // 取件页面
  if (obj?.data?.result) {
    let ggContent = obj.data.result.content;
    if (ggContent?.middle?.length > 0) {
      ggContent.middle = ggContent.middle.filter(
        (i) =>
          ![
            "guoguo_pickup_empty_page_relation_add", // 添加亲友
            "guoguo_pickup_helper_feedback", // 反馈组件
            "guoguo_pickup_helper_tip_view" // 取件小助手
          ]?.includes(i?.template?.name)
      );
    }
  }
} else if (url.includes(".nbpresentation.protocol.homepage.get")) {
  // 首页
  if (obj?.data?.result?.dataList?.length > 0) {
    let newLists = [];
    for (let item of obj.data.result.dataList) {
      if (item?.type?.includes("kingkong")) {
        if (item?.bizData?.items?.length > 0) {
          for (let i of item.bizData.items) {
            i.rightIcon = null;
            i.bubbleText = null;
          }
        }
      } else if (item?.type?.includes("icons_scroll")) {
        // 顶部图标
        if (item?.bizData?.items?.length > 0) {
          let newBizs = [];
          for (let i of item.bizData.items) {
            const lists = [
              "618cjhb", // 超级红包
              "appCentreMore", // 更多
              "bgxq", // 包裹星球
              "cncy", // 填字赚现金
              "cngreen", // 绿色家园
              "cngy", // 免费领水果
              "cnhs", // 菜鸟回收
              "cnhy", // 菜鸟好友
              "dtxb", // 地图寻宝
              "gjjf", // 裹酱积分
              "jkymd", // 集卡赢免单
              "ljjq", // 领寄件券
              "ttlhb", // 天天领红包
              "xybg" // 幸运包裹
            ];
            if (lists?.includes(i?.key)) {
              continue;
            }
            newBizs.push(i);
          }
          item.bizData.items = newBizs;
          for (let i of item.bizData.items) {
            i.rightIcon = null;
            i.bubbleText = null;
          }
        }
      } else if (item?.type?.includes("banner_area")) {
        // 新人福利 幸运抽奖
        continue;
      } else if (item?.type?.includes("promotion")) {
        // 促销活动
        continue;
      }
      newLists.push(item);
    }
    obj.data.result.dataList = newLists;
  }
}

$done({ body: JSON.stringify(obj) });
