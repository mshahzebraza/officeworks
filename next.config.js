module.exports = {
  reactStrictMode: true,
  env: {
    MONGO_URI: 'mongodb://localhost:27017/OfficeWorks',
    API: {
      PO: "http://localhost:3000/api/po",
      PO_ITEM: "http://localhost:3000/api/po-item",
      PO_ITEM_SPEC: "http://localhost:3000/api/po-item-spec",
    }
  }
}
