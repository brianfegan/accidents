import React from "react";
import c3 from "c3";
import "c3/c3.css"

class Chart extends React.Component{
  constructor(props) {
    super(props);
    this.chartRef = React.createRef();
  }
  componentDidMount() {
    const {years, columns, pie_columns, type} = this.props;
    this.chart = c3.generate({
      bindto: this.chartRef.current,
      data: {
        columns: type === 'pie' ? pie_columns : [columns],
        type
      },
      axis: {
        x: {
          type: 'category',
          categories: years,
        },
        y: {
          label: {
            text: 'Accidents'
          }
        }
      }
    });
  }
  shouldComponentUpdate(nextProps, nextState){
    const {columns, pie_columns, type, years} = nextProps;
    const thisTypeIsPie = this.props.type === 'pie';
    const nextTypeIsPie = type === 'pie';
    if (!thisTypeIsPie && nextTypeIsPie) {
      this.chart.load({
        columns: pie_columns,
        unload: ['Accidents'],
        done: () => {this.chart.transform(type)}
      });
    } else if (thisTypeIsPie && !nextTypeIsPie) {
      this.chart.load({
        columns: [columns],
        unload: years,
        done: () => {this.chart.transform(type)}
      });
    } else {
      this.chart.transform(type);
    }
    return false;
  }
  render() {
    return <div id="bar" ref={this.chartRef} />;
  }
}

export default Chart;
