let okk = JSON.parse($response.body);
switch (true) {
  case /cainiao\.guoguo\.nbnetflow\.ads\.mshow/.test($request.url):
    const item = ["958", "1273", "1275", "1308", "1316", "1332", "1340", "1382", "1391"];
    for (let i of item) {
      if (okk.data?.[i]) {
        delete okk.data[i];
      }
    }
    break;
  default:
    break;
}
$done({ body: JSON.stringify(okk) });