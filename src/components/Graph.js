import React from 'react';
import * as d3 from "d3";
import data from './shop.json';

export class Graph extends React.Component {
  componentDidMount(){
    //d3.json("../../src/components/buildings.json").then((data) => {
      console.log(data);
      data.forEach((d) => {
        d.revenue = +d.revenue;
      })
      console.log(data)

      const margin = { left: 100, right:10, top:10, bottom: 100}
      const width = 600 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      const svg = d3.select("#chart-area")
        .append("svg")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom);

      var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")")

      const x = d3.scaleBand()
        .domain(data.map((d) => {return d.month}))
        .range([0, width])
        .paddingInner(0.3)
        .paddingOuter(0.3)

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, (d) => {
          return d.revenue;
        })])
        .range([height, 0]);

      const xAxisCall = d3.axisBottom(x);
      g.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0, " + height + ")")
        .call(xAxisCall)
        .selectAll("text")

      const yAxisCall = d3.axisLeft(y)
        .tickFormat((d) => {
          return d + "$";
        });
      g.append("g")
        .attr("class", "y axis")
        .call(yAxisCall)
        .selectAll("text")

      g.append("text")
        .attr("class", "x axis-label")
        .attr("x", width /2)
        .attr("y", height + 50)
        .attr("font-size", "25px")
        .attr("text-anchor", "middle")
        .text("Month")

      g.append("text")
        .attr("class", "y axis-label")
        .attr("x", - (height /2))
        .attr("y", -60)
        .attr("font-size", "25px")
        .attr("text-anchor", "middle")
        .attr("transform", "rotate(-90)")
        .text("Revenue")

      const rects = g.selectAll("rect").data(data)
      rects.enter()
        .append("rect")
        .attr("x", (d) => {return x(d.month)})
        .attr("y", (d) => {return y(d.revenue)})
        .attr("width", x.bandwidth)
        .attr("height", (d) => { return height - y(d.revenue)})
        .attr("fill", "gray");
      /*}
    ).catch((err) => {
      console.log(err);
    })*/
  }

  render(){
    return(
      <div class="app">
        <p> OpenRCA Graph</p>
        <div id="chart-area"></div>
      </div>
    );
  }
}
