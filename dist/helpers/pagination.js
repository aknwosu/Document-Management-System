"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var Paginator = {
  paginate: function paginate(metaData) {
    var next = Math.ceil(metaData.count / metaData.limit);
    var currentPage = Math.floor(metaData.offset / metaData.limit + 1);
    var pageSize = metaData.limit > metaData.count ? metaData.count : metaData.limit;
    return {
      page_count: next,
      page: currentPage,
      page_size: Number(pageSize),
      total_count: metaData.count
    };
  }
};
exports.default = Paginator;