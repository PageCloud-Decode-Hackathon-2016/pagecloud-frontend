import errorHandler from './errorhandler'
export default function (node_Id) {
  $.getJSON('/api/bots',json => {
    if(errorHandler(node_Id, json)){
      return;
    }

    var botCount = json.data.categories.bot;
    var mobileCount = json.data.categories.mobile;
    var pcCount = json.data.categories.pc;
    var tabletCount = json.data.categories.tablet;

    var data = [{
      values: [botCount,mobileCount,pcCount,tabletCount],
      labels: ['Bots','Mobile','PC','Tablet'],
      type: 'pie',
      textfont:{
        size: 18,
      }
    }];

    var layout = {
      height: 400,
      width: 500
    };

    Plotly.newPlot(node_Id, data, layout);
  });
}
