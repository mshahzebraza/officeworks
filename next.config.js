module.exports = {
    reactStrictMode: true,
    env: {
        MONGO_URI: "mongodb://localhost:27017/OfficeWorks",
        LOCAL_URL: "http://localhost:3000",
        API: {
            INITIALIZE: "/api/initialize",
            CONNECT: "/api/connect",
            PO: "/api/po",
            PO_ITEM: "/api/po-item",
            PO_ITEM_SPEC: "/api/po-item-spec",
            MODULE: "/api/module",
            MWO: "/api/mwo",
            PROJECT: "/api/project",
            PROJECT_PART: "/api/project-part",
            PROJECT_ASSY: "/api/project-assembly",
            TRANSACTION: "/api/transaction",
            // INVENTORY: "http://localhost:3000/api/inventory",
        }
    }
}
