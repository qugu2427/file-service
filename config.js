module.exports = {
    port: 3000,
    uploadOptions: {
        limits: { fileSize: 50 * 1024 * 1024 },
        safeFileNames: true,
        preserveExtension: true,
        abortOnLimit: true
    },
    limiterOptions: {
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 100 
    },
    uploadLimiterOptions: {
        windowMs: 10 * 60 * 1000, // 10 minutes
        max: 50,
        skipFailedRequests: true
    },
    mimeWhitelist: null, //when set to null all mimes will be accepted
    //mimeWhitelist: ["image/png", "image/jpg", "image/gif"],
    uploadWhitelist: ["::1"], //when set to null all ips will be accepted
    deleteWhitelist: ["::1"] //when set to null all ips will be accepted
}