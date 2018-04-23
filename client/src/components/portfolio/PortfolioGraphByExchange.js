import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';

// const browsers = Object.keys(browserUsage[0])
//   .filter(k => k !== 'date')
//   .map(k => ({ label: k, usage: browserUsage[0][k] }));
const browsers = [
  { label: 'Google Chrome', usage: '48.000001' },
  { label: 'Firefox', usage: '12.00' },
  { label: 'Internet Explorer', usage: '5.00' },
  { label: 'Opera', usage: '5.00' },
  { label: 'Safari', usage: '10.00' },
  { label: 'Beta', usage: '10.00' },
  { label: 'Others', usage: '10.00' },
];

function Label({ x, y, children }) {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".33em"
      fontSize={9}
    >
      {children}
    </text>
  );
}

export default ({
                  width = 500,
                  height = 400,
                  events = false,
                  margin = {
                    top: 10,
                    left: 5,
                    right: 5,
                    bottom: 30,
                  },
                }) => {
  if (width < 10) {
    console.log('width kleiner als 10');
    return null;
  };

  const radius = Math.min(width, height) / 2;
  return (
    <svg width={width} height={height}>
      <LinearGradient from='#17ead9' to='#6078ea' id='gradients'/>
      <rect
        x={0}
        y={0}
        rx={14}
        width={width}
        height={height}
        fill="url('#gradients')"
      />
      <Group top={height / 2 - margin.top} left={width / 2}>
        <Pie
          data={browsers}
          pieValue={d => d.usage}
          outerRadius={radius - 20}
          innerRadius={radius - 130}
          fill="white"
          fillOpacity={d => 1 / (d.index + 2) }
          cornerRadius={3}
          padAngle={0}
          centroid={(centroid, arc) => {
            const [x, y] = centroid;
            const { startAngle, endAngle } = arc;
            if (endAngle - startAngle < .1) return null;
            return <Label x={x} y={y}>{arc.data.label}</Label>;
          }}
        />
      </Group>
    </svg>
  );
};
