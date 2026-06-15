/*
彩云天气 SVIP 解锁重写脚本
*/

let obj = JSON.parse($response.body);

if ($request.url.indexOf("/v2/user") !== -1) {
    if (obj.result) {
        // 解锁主要 VIP 属性
        obj.result.is_vip = true;
        obj.result.vip_type = "svip";
        obj.result.vip_expired_at = 4092599349; // 2100年过期时间戳
        obj.result.is_primary_user = true;
        
        // 激活各种高级权益
        if (obj.result.svip_info) {
            obj.result.svip_info.is_svip = true;
            obj.result.svip_info.expired_at = 4092599349;
        }
        if (obj.result.vip_info) {
            obj.result.vip_info.is_vip = true;
            obj.result.vip_info.expired_at = 4092599349;
            obj.result.vip_info.svip_expired_at = 4092599349;
        }
    }
}

$done({ body: JSON.stringify(obj) });
