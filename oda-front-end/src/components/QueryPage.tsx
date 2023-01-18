import React from 'react'

import { useApplicationStore } from '../useApplicationStore'
import QueryDataGraphPicker from './QueryDataGraphPicker'
import QueryInput from './QueryInput'
import BarChart from './Visualizations/BarChart'
import PieChart from './Visualizations/PieChart'

function QueryPage() {
    const dataResult = useApplicationStore((state) => state.dataResult)
    const step = useApplicationStore((state) => state.step)
    const graphicType = useApplicationStore((state) => state.chosenGraphicType)
    const data : any[] = useApplicationStore((state) => state.dataResult)




    if (step === 0) {
        return (
            <QueryInput />
        )
    }

    if (step === 1) {
        return (
            <QueryDataGraphPicker />
        )
    }
    if (step === 2 && graphicType === 'barChart') {
        return (<BarChart data={data} />
        )
    }
    if (step === 2 && graphicType === 'pieChart') {
        return (<PieChart data={data} outerRadius={200} innerRadius={200} />
        )
    }



    return (
        <div>Wrong page buddy...</div>
    )
}

export default QueryPage