module.exports.createHost = function(opts) {
    const code = Math.random().toString(36).slice(2,8)
    return {
        hostIp: opts.ip,
        code
    }
}