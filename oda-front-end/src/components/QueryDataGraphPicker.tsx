import React from 'react'
import { useApplicationStore } from '../useApplicationStore';

function QueryDataGraphPicker() {
    const dataResult = useApplicationStore((state) => state.dataResult)
    const nextStep = useApplicationStore((state) => state.nextStep)
    const setGraphicType = useApplicationStore((state) => state.setChoosenGraphicType)

    function generateGraphic(graphicType: string) {
        setGraphicType('barChart')
        nextStep()
    }


    const [theadData, setTheadData] = React.useState<any[]>(Object.keys(dataResult[0]))
    const [tbodyData, setTbodyData] = React.useState<any[]>(dataResult)

    return (
        <div className='text-xs flex pt-4'>
            <div className='flex flex-col flex-grow'>
                <span className='py-4 text-xl'>
                    Choose the type of graphic
                </span>
                <div>
                    <div onClick={()=>{generateGraphic('barChart')}} className=' text-[#1a1a1a] border-4 text-2xl flex flex-col items-center justify-center border-[#1a1a1a] bg-slate-200 rounded-2xl h-56 w-56'>
                        <div className='w-32 h-32'>
                            <img src='https://www.svgrepo.com/show/99962/bar-chart.svg' />
                        </div>
                        Bar Chart
                    </div>
                </div>
            </div>
            <div className='max-h-[600px] w-[500px] overflow-auto'>
                <table>
                    <thead>
                        <tr className='rounded' >
                            {theadData.map(heading => {
                                return <th className='px-4 py-2 sticky top-0 bg-[#1a1a1a] uppercase font-extrabold' key={heading}>{heading}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {tbodyData.map((row, index) => {
                            return <tr key={index}>
                                {theadData.map((key, index) => {
                                    return <td className='px-4 py-2 bg-[#4e4e4e]' key={row[key]}>{row[key]}</td>
                                })}
                            </tr>;
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QueryDataGraphPicker