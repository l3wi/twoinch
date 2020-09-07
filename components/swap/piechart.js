import { PieChart } from 'react-minimal-pie-chart'

const Chart = ({ distro }) => {
  console.log(distro)
  const colors = ['#f1f3f8', '#d6e0f0', '#8d93ab']

  const data = Object.assign(
    [],
    distro.map((item, i) => {
      return { title: item.name, value: item.percent * 10, color: colors[i] }
    })
  )

  return (
    <PieChart
      data={data}
      style={{ height: 200, width: 200, margin: 'auto 0' }}
      label={({ dataEntry }) => `${dataEntry.title}`}
      labelStyle={(index) => ({
        fontSize: '6px',
        color: '#9B9B9B',
      })}
    />
  )
}

export default Chart
