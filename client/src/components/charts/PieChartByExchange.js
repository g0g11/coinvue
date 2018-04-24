import _ from 'lodash';
import React from 'react';
import { Pie } from '@vx/shape';
import { Group } from '@vx/group';
import { LinearGradient } from '@vx/gradient';

function Label({ x, y, children }) {
  return (
    <text
      fill="white"
      textAnchor="middle"
      x={x}
      y={y}
      dy=".33em"
      fontSize={12}
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
                  data,
                }) => {
  if (width < 10) {
    return null;
  }

  const amountExchanges = _(data)
    .map(data => ({
      total: data.amount * data.currency.priceEUR,
      exchange: data.exchange.name,
    }))
    .groupBy('exchange')
    .map((exchange, name) => ({
      exchange: name,
      total: _.sumBy(exchange, 'total'),
    }))
    .value();

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
          data={amountExchanges}
          pieValue={d => d.total}
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
            return <Label x={x} y={y}>{arc.data.exchange}</Label>;
          }}

        />
      </Group>
    </svg>
  );
};
