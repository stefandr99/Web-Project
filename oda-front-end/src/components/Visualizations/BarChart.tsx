import * as d3 from 'd3';
import { useEffect, useRef } from 'react';
import { useApplicationStore } from '../../useApplicationStore';

const BarChart = ({data}: any) => {

    const svgRef = useRef(null);
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        const margin = { top: 20, right: 20, bottom: 120, left: 40 };
        const width = +svg.attr("width") - margin.left - margin.right;
        const height = +svg.attr("height") - margin.top - margin.bottom;
        const x = d3.scaleBand().rangeRound([0, width]).padding(0.1);
        const y = d3.scaleLinear().rangeRound([height, 0]);
        const g = svg.append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        x.domain(data.map((d:any) => d.pref));
        //@ts-ignore
        y.domain([0, d3.max(data, d => d.area)]);

        g.append("g")
        .attr("class", "axis axis--x")
        .attr("transform", `translate(0,${height})`)
        //@ts-ignore
        .call(d3.axisBottom(x).tickSizeOuter(0).tickFormat(d => d).tickSize(0).tickPadding(10).tickValues(data.map(d => d.pref)))
        .selectAll("text")  
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

        g.append("g")
            .attr("class", "axis axis--y")
            //@ts-ignore
            .call(d3.axisLeft(y).ticks(10))
            .append("text")
            .attr("y", 6)
            .attr("text-anchor", "end")
            .text("Area");

        g.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
                    //@ts-ignore

            .attr("x", d => x(d.pref))
            .attr("y", (d:any) => y(d.area))
            .attr("width", x.bandwidth())
            .attr("height", (d : any) => height - y(d.area));
    }, [data])

    return (
        <svg ref={svgRef} width={1600} height={600} />
    );
}

export default BarChart;