
//层叠柱状图

    let svgAttr = {width:1000,height:500};
    let marge = {top:60,bottom:60,left:60,right:60};
    let grc = [295,474,1633,2795,2541,2307,2257,2166,2137,2037,2080,1875];
    let notgrc = [807,657,1611,2512,2295,2130,1926,1806,1647,1719,1386,1303];
    let rank = ['一级人才', '二级人才', '三级人才', '四级人才', '五级人才', '六级人才', '七级人才', '八级人才', '九级人才', '十级人才', '十一级人才', '十二级人才'];
 
    let svg = d3.select('#container-stack-up').append('svg').style('width', svgAttr.width).style('height', svgAttr.height);
    let g = svg.append('g').attr('transform', 'translate('+marge.top+','+marge.left+')');
 
    //X轴比例尺
    let xScale = d3.scaleBand().domain(rank).rangeRound([0, svgAttr.width-marge.left-marge.right]);
    let xAxis = d3.axisBottom(xScale);
    //Y轴比例尺
    let yScale = d3.scaleLinear().domain([0, 5500]).range([svgAttr.height-marge.top-marge.bottom, 0]);
    let yAxis = d3.axisLeft(yScale);
 
    g.append('g').attr('transform', 'translate('+0+','+(svgAttr.height-marge.bottom-marge.top)+')').call(xAxis)
        .selectAll('text').attr('transform', 'rotate(45 -20 20)');
    g.append('g').attr('transform', 'translate(0,0)').call(yAxis)
        .selectAll('line').attr('stroke-width', '0.5px').attr('x1', 0).attr('x2', function () {
        return svgAttr.width-marge.left-marge.right;
    });
 
    let nationType = g.append('g').attr('transform', 'translate(0,-50)');
    nationType.append('rect').attr('width', '20px').attr('height', '20px').attr('fill', '#FA7F6F');
    nationType.append('rect').attr('transform', 'translate(100, 0)').attr('width', '20px').attr('height', '20px').attr('fill', '#9AC9DB');
    nationType.append('text').attr('transform', 'translate(25, 15)').text('留在希腊');
    nationType.append('text').attr('transform', 'translate(125, 15)').text('流入外国');
 
    //留在希腊柱体
    let rectWidth = 50;
    let wRect = g.selectAll('.rect').data(grc).enter().append('g');
    wRect.append('rect').attr('x', function (d, i) {
        return xScale(rank[i]) + rectWidth/4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;
    }).attr('fill', '#FA7F6F').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#C82423');
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#FA7F6F');
    }).on('click', function () {
        alert("这些人才选择留在希腊");
    })
        .transition().duration(1000).delay(function(d,i){
        return i*100;
    })
        //.ease(d3.easeBack)
        .attr("y",function(d){
            return yScale(d);
        })
        .attr("height",function(d){
            return svgAttr.height-marge.top-marge.bottom-yScale(d);
        });
 
    //流入外国柱体
    let oRect = g.selectAll('.rect').data(notgrc).enter().append('g');
    oRect.append('rect').attr('x', function (d, i) {
        return xScale(rank[i]) + rectWidth/4;
    }).attr('y', function (d, i) {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('width', function () {
        return rectWidth;
    }).attr('height', function () {
        return 0;
    }).attr('fill', '#9AC9DB').attr('cursor', 'pointer').on('mouseover', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#CB7730');
    }).on('mouseout', function (d, i) {
        d3.select(this).transition().duration(100).attr('fill', '#9AC9DB');
    }).on('click', function () {
        alert('这些人才选择流入外国！');
    })
        .transition().duration(1000).delay(function(d,i){
        return i*100;
    })
        //.ease(d3.easeBack)
        .attr("y",function(d, i){
            //留在希腊的位置（柱体左上角的y轴坐标）减去流入外国的高度
            let grc_y = yScale(grc[i]);
            return grc_y - (svgAttr.height-marge.top-marge.bottom-yScale(d));
        })
        .attr("height",function(d, i){
            return svgAttr.height-marge.top-marge.bottom-yScale(d);
        });
 
    //流入外国柱体顶部绘制文字
    oRect.append('text').attr('x', function (d, i) {
        return xScale(rank[i]) + rectWidth/4;
    }).attr('y', function () {
        let min = yScale.domain()[0];
        return yScale(min);
    }).attr('font-size', '12px').attr('fill', '#404040')
        .text(function (d, i) {
            let total = grc[i] + d;
            return total;
        }).transition().duration(1000).delay(function (d, i) {
        return i*100;
    })//.ease(d3.easeBack)
        .attr('x', function (d, i) {
        return xScale(rank[i])+rectWidth/2;
    }).attr('y', function (d, i) {
        let grc_y = yScale(grc[i]);
        return grc_y - (svgAttr.height-marge.top-marge.bottom-yScale(d)) - 1;
    });
