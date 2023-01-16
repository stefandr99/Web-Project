import React from 'react'

import { useApplicationStore } from '../useApplicationStore'
import QueryDataGraphPicker from './QueryDataGraphPicker'
import QueryInput from './QueryInput'
import BarChart from './Visualizations/BarChart'

function QueryPage() {
    const dataResult = useApplicationStore((state) => state.dataResult)
    const step = useApplicationStore((state) => state.step)
    const graphicType = useApplicationStore((state) => state.chosenGraphicType)



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
        return (<BarChart />
        )
    }



    return (
        <div>Wrong page buddy...</div>
    )
}

export default QueryPage