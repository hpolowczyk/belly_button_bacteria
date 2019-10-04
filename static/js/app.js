// Declare the data variable
const data = 'data/samples.json';

// Using d3, fetch the JSON data
d3.json(data).then((data) => {

    ///////////////// CREATE SUBJECT DROPDOWN /////////////////
    // Set reference to all test subject IDs
    var names = data.names;
    // Reference the select id for the subject dropdown
    var selectSubject = document.getElementById("selDataset");
    // Using a for-loop, create a function to input text into the subject dropdown
    names.forEach((name) => {
        // Create an option element
        var opt = document.createElement("option");
        // Set value for id
        opt.value = name;
        // Set text for id
        opt.text = name;
        // Append the option element to selectSubject
        selectSubject.appendChild(opt);
    })

    // Create a function to update the page with plots and demographic info
    function updatePage() {
        // Create a reference to the data's metadata array
        var metadata = data.metadata;
        // Set dropdown variable for input in selDataset
        var dropdown = d3.select("#selDataset");
        // Reference the value in dropdown
        var selectedID = dropdown.property("value"); 
        // Using a for-loop, create the demographic info and the gauge plot
        metadata.forEach((m) => {
        
        ///////////////// CREATE DEMOGRAPHIC INFO /////////////////

        // If the id in the metadata matches the selected id
        if (m.id == selectedID) {
            // Change the HTML content found in sample-metadata
            document.getElementById("sample-metadata").innerHTML = 
                // Print the selected subject's demographic info 
                `<b>ID:</b> ${m.id} <br>
                <b>Ethincity:</b> ${m.ethnicity} <br>
                <b>Gender:</b> ${m.gender} <br> 
                <b>Age:</b> ${m.age} <br> 
                <b>Location:</b> ${m.location} <br> 
                <b>Belly Button Type:</b> ${m.bbtype} <br> 
                <b>Wash Frequency:</b> ${m.wfreq} <br> `;

            ///////////////// CREATE GAUGE PLOT /////////////////
                
            // Create an array from 9 to 0 
            var numArray = Array.from({length: 10}, (v,k) => k).reverse();
                
            // Create trace
            var gaugeTrace =  {
                value: m.wfreq,
                title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs Per Week" },
                type: "indicator",
                // Identify plot type and displays value beneath gauge plot
                mode: "gauge+number",
                gauge: {
                    // Adjust axis range and tick marks
                    axis: { range: [null, 9], 
                            ticktext:  numArray,
                            tickvals: numArray
                    },
                    // Create sections based on the provided ranges and adjusts section colour 
                    steps: [
                        {range: [8, 9], color: "rgba(0,105,11,1)"},
                        {range: [7, 8], color: "rgba(10,120,22,1)"},
                        {range: [6, 7], color: "rgba(14,127,0,1)"},
                        {range: [5, 6], color: "rgba(110,154,22,1)"},
                        {range: [4, 5], color: "rgba(170,202,42,1)"},
                        {range: [3, 4], color: "rgba(202,209,95,1)"},
                        {range: [2, 3], color: "rgba(210,206,145,1)"},
                        {range: [1, 2], color: "rgba(225,226,202,1)"},
                        {range: [0, 1], color: "rgba(235, 230,215,1)"}
                    ],
                    // Remove inside bar in gauge plot
                    bar: {thickness: 0} ,
                    // Create threshold that adjusts based on the subject's wash frequency
                    threshold: {
                        line: {color: "rgba(128,5,32,1)", width: 4 },
                        thickness: 1,
                        value: m.wfreq
                    }
                }
            };
            // Create the data array for the plot
            var gaugeData = [gaugeTrace];
            // Plot the chart to a div tag with id "gauge"
            Plotly.newPlot("gauge", gaugeData);
        };
    });
    
    // Create a reference to the data' samples array
    var samples = data.samples;
    // Initialize a blank list for samples in bar chart
    var barList = [];

    // Using a for-loop
    samples.forEach((sample) => {
        // If the id value in the sample matches the selected ID
        if(sample.id == selectedID) {
            // Reference specific arrays in the sample
            var otuIds = sample.otu_ids;
            var sampleValues = sample.sample_values;
            var otuLabels = sample.otu_labels;

            ///////////////// CREATE BUBBLE PLOT /////////////////

            // Create trace
            var bubbleTrace = {
                // Set x and y values
                x: otuIds,
                y: sampleValues,
                mode: "markers",
                // Set text
                text:otuLabels,
                // Adjust marker color and size accordingly
                marker: {
                    color:otuIds,
                    size:sampleValues,
                    colorscale: "Earth"
                }
            };
            // Create the data array for the plot
            var bubbleData = [bubbleTrace]
            // Plot the chart to a div tag with id "bubble"
            Plotly.newPlot("bubble",bubbleData)

            // Using a for-loop, reoganize the values into a new array for correct readibility for sorting
            for (var j = 0; j < sampleValues.length; j++)
            // Push new array to the empty barList 
            barList.push ({'otu_ids': `OTU ${otuIds[j]}`, 
                            'value': sampleValues[j], 
                            'label': otuLabels[j]});
        };
    });

    // Sort the list in ascending order
    var sorted = barList.sort((a,b) => b.value - a.value);
    // Select only top 10
    var sliced = sorted.slice(0,10);
    // Reverse the list to ensure it is in descending order
    var reversed = sliced.reverse();

    ///////////////// CREATE BAR CHART /////////////////

    // Create trace
    var barTrace = {
        // Set x and y values
        x: reversed.map(r => r.value),
        y: reversed.map(r => r.otu_ids),
        // Set text
        text: reversed.map(r => r.label),
        type: "bar",
        // Make sure the bar chart is horizontal
        orientation: "h"
    };
    // Create the data array for the plot
    var barData = [barTrace];
    // Plot the chart to a div tag with id "bar"
    Plotly.newPlot("bar",barData);
    };

    // Load page with plots and info based on the input value in selDataset
    d3.selectAll("#selDataset").selectAll(updatePage)
    // Update page with plots and info based on the input value in selDataset
    d3.selectAll("#selDataset").on("change", updatePage);
});
