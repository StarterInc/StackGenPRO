import React from "react";
import { Bar } from "react-chartjs-2";
import {Button} from 'react-bootstrap'

const data = {
  labels: [
	  {{#variables}}"{{variablename}}",{{/variables}}
	  ],
  datasets: [
    {
      label: "{{objectname}}",
      backgroundColor: "rgba(255,99,132,0.2)",
      borderColor: "rgba(255,99,132,1)",
      borderWidth: 1,
      hoverBackgroundColor: "rgba(255,99,132,0.4)",
      hoverBorderColor: "rgba(255,99,132,1)",
      data: [65, 59, 80, 81, 56, 55, 40, 65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

class {{objectname}}Chart extends React.Component {
  render() {
    return (
	<div style={ {maxWidth:'100%', maxHeight:350} }>
      <Button onClick={this.fetchData} >
        Refresh Data
      </Button>
      <Bar
        data={data}
        options={ { maintainAspectRatio: false } }
        
      />
      </div>
    );
  }
}

export default {{objectname}}Chart;
