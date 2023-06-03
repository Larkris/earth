let okk = JSON.parse($response.body);
switch (true) {
  case /cainiao\.guoguo\.nbnetflow\.ads\.mshow/.test($request.url):
    const item = ["1316", "1332", "1275", "1308", "1340", "1382"];
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