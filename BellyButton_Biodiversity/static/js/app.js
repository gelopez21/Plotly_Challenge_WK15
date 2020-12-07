function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
  
    d3.json(`/metadata/${sample}`).then(function(data) {
    
      
      var panel = d3.select("#sample-metadata");
      var age = data.AGE;
      console.log("metadata age", age);
  
      console.log("metadata panel", panel);
  
      // panel.html("")
  
      Object.entries(data).forEach(([key, value]) => {
        panel.append("h4").text(`${key}: ${value}`);
      }); 
      
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
    })
  }
  
  function buildCharts(sample) {
    d3.json(`/samples/${sample}`).then(function(data) {

      var trace2 = [
        {
          x: data.otu_ids,
          y: data.sample_values,
          mode: 'markers',
          text: data.otu_labels,
          marker: {
            size: data.sample_values,
            color: data.otu_ids
            //symbol: "cross"
          },
          type: 'scatter'
        } 
      ];
      
      var data2 = [trace2];
  
      var layout2 = {
        xaxis: { title: "OTU ID" }
      };
      Plotly.newPlot('bubble', trace2, layout2);  
      console.log("before", data.sample_values);
  
      samplevalues = data.sample_values.sort().reverse().slice(0,10);
      console.log("top 10:",samplevalues);
  
      var trace1 = {
          values: data.sample_values.sort().reverse().slice(0,10),
          labels: data.otu_ids.sort().reverse().slice(0,10),
          hoverinfo: data.otu_labels.sort().reverse().slice(0,10),
          type: 'pie'
      };
  
      var data = [trace1];    
      console.log("after", data);
  
            var layout = {
          height: 400,
          width: 500
      };
  
      Plotly.newPlot("pie", data, layout);
    })
  }
  
  function init() {
    // dropdown select element
    var selector = d3.select("#selDataset");
  
    // populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
      // build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // Initialize the dashboard
  init();
  