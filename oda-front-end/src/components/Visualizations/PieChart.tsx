import React, { useEffect, useState } from 'react';
import * as d3 from 'd3';
import { ResponsiveContainer, Pie, Tooltip, PieChart, Treemap } from 'recharts';
import renameKeys from 'lodash/keys';
import { pie } from 'd3';

function PieChartVisualization({
    data,
    outerRadius,
    innerRadius,
  } : any) {

   

    const [pieData,setPieData] = useState<any>([]);

    useEffect(() => {
      const newPieData : any[] = [];
      data.forEach(function(obj : any) {
        newPieData.push({name: obj.pref, value: obj.area})
      });


      setPieData(newPieData);
    }, [data]);

    console.log(pieData);
    

    return(
      <div style={{fontSize:'10px'}}>
        <PieChart width={800} height={700}>
          <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={0} outerRadius={200} fill="#82ca9d" label />
        <Tooltip />
        </PieChart>
      </div>
    )
}

export default PieChartVisualization;