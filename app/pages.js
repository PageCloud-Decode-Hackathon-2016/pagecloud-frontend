import errorHandler from './errorhandler'
import sortByKey from './sortByKey'
export default function (node_Id) {
  $.getJSON('/api/pages',json => {
    if(errorHandler(node_Id, json)){
      return;
    }
    sortByKey(json.data.pages,'hits');
    var $pages = $('#' + node_Id);
    var rootUrl, title, screenshotUrl, page, maxCount, pageJSON;

    pageJSON = json.data.pages;
    maxCount = json.data.pages[0].hits;
    rootUrl = "http://decode-2016.pagecloud.io/"

    for (let i = 0; i < pageJSON.length && i < 5; i++) {
      console.log("hits"+pageJSON[i].hits)
      console.log("maxCount:"+maxCount)
      screenshotUrl = rootUrl + getScreenshot(pageJSON[i].name);
      page = '<div class="pageDiv col-md-2"><div class="pageTitle">' + pageJSON[i].name + '</div><div class="pageScreenshot"><img style="width:' + ((pageJSON[i].hits/maxCount) * 100) + '%;" src="' + screenshotUrl + '"><div class="pageCount">Views: ' + pageJSON[i].hits + '</div></div></>';
      $pages.append(page);
    }

    function getScreenshot(name) {
      return "page_thumbnails" + name + "_small.jpg";
    }

  });
}
