import React, { useEffect } from 'react';
import * as d3 from 'd3';

function Daily({daily, current, screenWidth}) {

  useEffect(() => {
    
    const width = document.getElementById("graph-1").offsetWidth;
    const height = document.getElementById("graph-1").offsetHeight;

    const rectInsets = 2
    const curveFactor = 2
    const strokeWidth = 2
    const radius = (height-strokeWidth)/2
    const buffer = 2

    const length = width-height

    const weeklyMin = d3.min(daily, (d) => d.temp.min)-buffer
    const weeklyMax = d3.max(daily, (d) => d.temp.max)+buffer
    
    // create scale for graph
    const x = d3
      .scaleLinear()
      .domain([
        weeklyMin,
        weeklyMax
      ])
      .range([0, length]);

    const turbo = d3.scaleSequential()
      .domain([-10, 50])
      .interpolator(d3.interpolateTurbo);

    daily.forEach((item, idx) => {
        // remove existing graphs
        document.getElementById(`graph-${idx}`).innerHTML = "";

        const array = [...Array(Math.ceil(item.temp.max)-Math.floor(item.temp.min)).keys()].map((key)=> (turbo(Math.floor(item.temp.min)+key)))

        // create the svg
        const svg = d3
          .select(`#graph-${idx}`)
          .append("svg")
          .attr("width", width)
          .attr("height", height)
          .attr("font-family", "sans-serif")
          .attr("font-size", "10")
          .attr("text-anchor", "end");
        
        const lin = svg
          .append("defs")
          .append('linearGradient')
          .attr('id',`lin-${idx}`)
          .attr("x1", '0%')
          .attr("x2", '100%')
          .attr("y1", '50%')
          .attr("y2", '50%')

        lin
          .selectAll("stop")
          .data(array)
          .enter()
          .append("stop")
          .attr("offset", (d,i)=>`${(i/(array.length-1)*100)}%`)
          .attr("stop-color", (d)=> d)
    
        // append the weekly temp range rect
        svg
          .append("rect")
          .attr("fill", "grey")
          .attr("x", x(weeklyMin))
          .attr("y", 0)
          .attr("ry", height/curveFactor)
          .attr("width", x(weeklyMax)+height)
          .attr("height", height);
    
        // append the daily temp range rect
        svg
          .append("rect")
          .attr("fill", `url(#lin-${idx})`)
          .attr("x", x(item.temp.min))
          .attr("ry", height / curveFactor)
          .attr("y", 0)
          .attr("width", (x(item.temp.max)+height) - (x(item.temp.min)))
          .attr("height", height);
    
        // if it is the first graph, add the current temp and feels like temp
        if (idx === 0) {
          
          svg
            .append("circle")
            .attr("fill", turbo(current.feels_like))
            .attr("stroke", "white")
            .attr("stroke-width", strokeWidth)
            .attr("stroke-dasharray", "4")
            .attr("cx", x(current.feels_like)+height/2)
            .attr("cy", height / 2)
            .attr("r", radius)
            .attr("y", 0);
          svg
            .append("circle")
            .attr("fill", turbo(current.temp)) //turbo(current.temp))
            .attr("stroke", "white")
            .attr("stroke-width", strokeWidth)
            .attr("cx", x(current.temp)+height/2)
            .attr("cy", height / 2)
            .attr("r", radius)
            .attr("y", 0);
            
    }
        })

  },[daily, screenWidth])

  function day(dt) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const now = new Date();
    const then = new Date(dt * 1000);
    if (now.getDate() === then.getDate()) {
      return "Today";
    } else if (now.getDate() + 1 === then.getDate()) {
      return "Tom";
    } else {
      return days[new Date(dt * 1000).getDay()];
    }
  }
  // const rectInsets = 2;


  // daily.forEach((item, idx) => {
  //   // remove existing graphs
  //   document.getElementById(`graph-${idx}`).innerHTML = "";

  //   // create scale for graph
  //   const x = d3
  //     .scaleLinear()
  //     .domain([
  //       d3.min(daily, (d) => d.temp.min),
  //       d3.max(daily, (d) => d.temp.max),
  //     ])
  //     .range([1, width - 1]);

  //   // create the svg
  //   const svg = d3
  //     .select(`#graph-${idx}`)
  //     .append("svg")
  //     .attr("width", width)
  //     .attr("height", height)
  //     .attr("font-family", "sans-serif")
  //     .attr("font-size", "10")
  //     .attr("text-anchor", "end");

  //   // const grad = svg
  //   //   .append("defs")
  //   //   .append("LinearGradient")
  //   //   .attr("id", "grad1")
  //   //   .attr("x1", "0%")
  //   //   .attr("y1", "0%")
  //   //   .attr("x2", "100%")
  //   //   .attr("y2", "0%")
  //   //   .attr("gradientUnits", "objectBoundingBox");
  //   // grad
  //   //   .append("stop")
  //   //   .attr("offset", "0")
  //   //   .attr("stop-color", "red")
  //   //   .attr("stop-opacity", "1");
  //   // grad
  //   //   .append("stop")
  //   //   .attr("offset", "50%")
  //   //   .attr("stop-color", "white")
  //   //   .attr("stop-opacity", "1");
  //   // grad
  //   //   .append("stop")
  //   //   .attr("offset", "100%")
  //   //   .attr("stop-color", "blue")
  //   //   .attr("stop-opacity", "1");

  //   // const bar = svg.append("g");

  //   // append the weekly temp range rect
  //   svg
  //     .append("rect")
  //     .attr("fill", "lightgrey")
  //     .attr("x", x(d3.min(daily, (d) => d.temp.min)))
  //     // .attr("ry", height / 2)
  //     .attr("y", rectInsets)
  //     .attr("width", x(d3.max(daily, (d) => d.temp.max)))
  //     .attr("height", height - rectInsets * 2);

  //   // append the daily temp range rect
  //   svg
  //     .append("rect")
  //     .attr("fill", "steelblue")
  //     .attr("x", x(item.temp.min))
  //     // .attr("ry", height / 2)
  //     .attr("y", rectInsets)
  //     .attr("width", x(item.temp.max) - x(item.temp.min))
  //     .attr("height", height - rectInsets * 2);

  //   // if it is the first graph, add the current temp and feels like temp
  //   if (idx === 0) {
  //     // svg
  //     //   .append("circle")
  //     //   .attr("fill", "white")
  //     //   .attr("stroke", "lightgrey")
  //     //   .attr("stroke-width", "2")
  //     //   .attr("cx", x(current.temp))
  //     //   .attr("cy", height / 2)
  //     //   .attr("r", height / 2)
  //     //   .attr("y", 0);

  //     svg
  //       .append("line")
  //       .attr("stroke", "black")
  //       .attr("stroke-width", "2")
  //       .attr("x1", x(current.temp))
  //       .attr("y1", 0)
  //       .attr("x2", x(current.temp))
  //       .attr("y2", height);

  //     svg
  //       .append("line")
  //       .attr("stroke", "steelblue")
  //       .attr("stroke-width", "2")
  //       .attr("x1", x(current.feels_like))
  //       .attr("y1", 0)
  //       .attr("x2", x(current.feels_like))
  //       .attr("y2", height);
    // }

  return (
    <div className=' m-5 p-5 border rounded-md'>
      {daily.map((dae,idx, array) => (
        <div  key={dae.dt}>
          <div id='day-forecast' className='flex w-full'>
          <div className="flex items-center w-16"><h3>{day(dae.dt)}</h3></div>
          <div className="flex items-center gap-1 w-28">
            <img src={`http://openweathermap.org/img/wn/${dae.weather[0].icon}@2x.png`} className="w-8 h-8"/><h3>{dae.weather[0].main}</h3></div>
          <div className="flex grow justify-around items-center">
            <p>{Math.round(dae.temp.min)}</p>
            <div id={`graph-${idx}`} className="forecast-graph w-2/3 h-4"></div>
            <p>{Math.round(dae.temp.max)}</p>
          </div>
        </div>
        {array.length-1 !== idx && <hr />}
        </div>
      ))}

    </div>
  )
}


export default Daily
