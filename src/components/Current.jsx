import { transform } from "lodash";
import React from "react";

function Current({ current }) {
  const {
    uvi,
    humidity,
    temp,
    feels_like,
    wind_speed,
    wind_deg,
    dew_point,
    dt,
    pressure,
    sunrise,
    sunset,
    visiblity,
  } = current;

  return (
    <div className="flex w-full h-20 justify-around">
      <div className="flex flex-col items-center justify-center">
        <h1>UVI</h1>
        <h1>{uvi}</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>Humidity</h1>
        <h1>{humidity}%</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>Temp</h1>
        <h1>{temp}</h1>
        <h1 className="text-blue-600">{feels_like}</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>Temp</h1>
        <h1>{temp}</h1>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1>Wind</h1>
        <div className="flex flex-col items-center">
          <h1>
            {wind_speed}ms<sup>-1</sup>
          </h1>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            transform={`rotate(${wind_deg})`}
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 11l3-3m0 0l3 3m-3-3v8m0-13a9 9 0 110 18 9 9 0 010-18z"
            />
          </svg>
        </div>
      </div>
    </div>
    // <UVI />
    // function degToRad(deg) {
    //   return deg*(Math.PI/180)
    // }

    // const width = "128"
    // const height = "128"
    // const rectInsets = "2"

    // const sequentialScale = d3.scaleSequential()
    // .domain([300, 0])
    // .interpolator(d3.interpolateWarm);

    // const y = d3
    //   .scaleLinear([0,13], )
    //   .domain([100, 0])
    //   .range([0, height - rectInsets]);

    // // create the svg
    // const svg = d3
    //   .select(`#thing`)
    //   .append("svg")
    //   .attr("width", width)
    //   .attr("height", height)
    //   .attr("font-family", "sans-serif")
    //   .attr("font-size", "10")
    //   .attr("text-anchor", "end")
    //   .append("g")
    //   .attr("transform", `translate(${width/2}, ${height/2})`);

    // const colours = [];

    // d3.range(300).forEach(function(d, i) {
    //   colours.push({
    //     startAngle: degToRad(-150+i),
    //     endAngle: degToRad(-150+i+1),
    //     fill: sequentialScale(i),
    //     isUv: false
    //   })
    // })

    // // const arc = d3.arc()
    // // .innerRadius(40)
    // // .outerRadius(45)
    // // .startAngle(degToRad(-150))
    // // .endAngle(degToRad(150))

    // // svg.append("path").attr("d", arc).attr("fill", "black")

    // function uvPosition(uvi, number){
    //   return Math.round(uvi/13*number-1)
    // }

    // colours[uvPosition(13,300)].isUv = true

    // const arc = d3.arc()
    // .innerRadius(40)
    // .outerRadius(45)

    // svg.selectAll('.arc')
    //       .data(colours)
    //       .enter()
    //       .append('path')
    //       .attr('class', 'arc')
    //       .attr("id",  function(d){
    //         return d.isUv ? 'isUv' : d.startAngle
    //       })
    //       .attr('d', arc)
    //       .style('fill', function(d){
    //         return d.fill;
    //       })

    // svg.selectAll('#isUv')
    // .append("circle")
    // .attr('r', 10)
  );
}

export default Current;
