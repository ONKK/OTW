//https://gitlab.com/isous/loonresource/-/raw/main/Script/ColorfulClouds/ColorfulClouds_shared_membership.js
// 2024-09-28 22:05:37
const url = $request.url;
let header = $request.headers;

if (typeof $response === "undefined") {
  const cyTK = $argument.cy_device_token;
  header["device-token"] = cyTK
  if (compareVersions(header.version, "7.19.0") > 0) {
    header["authorization"] = "Bearer " + cyTK;
  }
  $done({ headers: header });
} else {
  let obj = JSON.parse($response.body);
  if (url.includes("/api/v1/user_detail")) {
    // 新版本 我的页面
    if (obj?.vip_info?.show_upcoming_renewal) {
      obj.vip_info.show_upcoming_renewal = false;
    }
    if (obj?.vip_info?.svip) {
      if (obj?.vip_info?.svip) {
        obj.vip_info.svip.is_auto_renewal = true;
        obj.vip_info.svip.expires_time = "3742732800";
      }
    }
  } else if (url.includes("/v1/vip_info")) {
    // 我的页面
    if (obj?.vip) {
      obj.vip.expires_time = "4030000000";
    }
    if (obj?.vip) {
      obj.svip.expires_time = "4030000000";
    }
    if (obj?.show_upcoming_renewal) {
      obj.show_upcoming_renewal = false;
    }
  } else if (url.includes("/v2/user")) {
    // 我的页面
    if (obj?.result) {
      obj.result.svip_given = 730;
      obj.result.is_phone_verified = true;
      obj.result.is_xy_vip = true;
      obj.result.vip_expired_at = 4030000000.16;
      obj.result.is_vip = true;
      obj.result.xy_svip_expire = 4030000000.16;
      if (obj?.result?.wt) {
        if (obj.result.wt.vip) {
          obj.result.wt.vip.enabled = true;
          obj.result.wt.vip.expired_at = 4030000000.16;
          obj.result.wt.vip.svip_expired_at = 4030000000.16;
        }
        obj.result.wt.svip_given = 730;
      }
      obj.result.is_primary = true;
      obj.result.xy_vip_expire = 4030000000.16;
      obj.result.svip_expired_at = 4030000000.16;
      obj.result.vip_type = "s";
    }
  }
  $done({ body: JSON.stringify(obj) });
}

function compareVersions(t, r) {
  const e = t.split(".").map(Number);
  const n = r.split(".").map(Number);
  for (let t = 0; t < Math.max(e.length, n.length); t++) {
    const r = e[t] || 0;
    const i = n[t] || 0;
    if (r > i) return 1;
    if (r < i) return -1;
  }
  return 0;
}