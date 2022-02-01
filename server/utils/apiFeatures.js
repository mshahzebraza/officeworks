// Code Copied from : https://github.com/techinfo-youtube/Hotel-room-booking-app/blob/main/server/utils/apiFeatures.js
class APIFeatures {
  /* 
      1. this.query is initially set externally and usually equally to complete collection
      2. executing 'this.search()' method replaces this.query with an improvised filtered result (w.r.t location)
      3. executing 'this.filter()' also method replaces this.query. But instead of filtering the 'location' field, 'this.filter' filters the data w.r.t all the query-params other than 'location' (which is already done) and 'page'(which is used for pagination only)
      4. 'this.pagination' uses to 'page' query-param to return specific data set.
  */
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  search() {
    const location = this.queryStr.location // creating a query structure for location
      ? {
        address: {
          $regex: this.queryStr.location,
          $options: "i",
        },
      }
      : {};
    console.log(location);
    this.query = this.query.find({ ...location });
    return this;
  }

  filter() {
    const queryStrCopy = { ...this.queryStr };
    // Remove fields
    const removeFields = ["location", "page"]; // immutable operation on queryStrCopy
    removeFields.forEach((el) => delete queryStrCopy[el]);
    this.query = this.query.find(queryStrCopy);
    console.log(queryStrCopy);
    return this;
  }

  pagination(resPerPage) {
    const currentPage = Number(this.queryStr.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    this.query = this.query.limit(resPerPage).skip(skip);
    return this;
  }
}

export default APIFeatures;