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
    
    ///////////////// CREATE DEMOGRAPHIC INFO /////////////////

    var metadata = data.metadata;
    // 
    var dropdown = d3.select("#selDataset");
    var selectedID = dropdown.property("value"); 
    metadata.forEach((m) => {
        if (m.id == selectedID) {
            document.getElementById("sample-metadata").innerHTML = 
                `<strong>ID:</strong> ${m.id} <br>
                <strong>Ethincity:</strong> ${m.ethnicity} <br>
                <strong>Gender:</strong> ${m.gender} <br> 
                <strong>Age:</strong> ${m.age} <br> 
                <strong>Location:</strong> ${m.location} <br> 
                <strong>Belly Button Type:</strong> ${m.bbtype} <br> 
                <strong>Wash Frequency:</strong> ${m.wfreq} <br> `;
        }
    })
    
    d3.selectAll("#selDataset").on("change", getDemoInfo);
    function getDemoInfo() {
    // Set reference to metadata
    var metadata = data.metadata;
    // 
    var dropdown = d3.select("#selDataset");
    var selectedID = dropdown.property("value"); 
    metadata.forEach((m) => {
        if (m.id == selectedID) {
            document.getElementById("sample-metadata").innerHTML = 
                `<strong>ID:</strong> ${m.id} <br>
                <strong>Ethincity:</strong> ${m.ethnicity} <br>
                <strong>Gender:</strong> ${m.gender} <br> 
                <strong>Age:</strong> ${m.age} <br> 
                <strong>Location:</strong> ${m.location} <br> 
                <strong>Belly Button Type:</strong> ${m.bbtype} <br> 
                <strong>Wash Frequency:</strong> ${m.wfreq} <br> `;
        }
    })};

    var samples = data.samples;
    console.log(samples)
    

    samples.forEach((s) => {
        console.log(s.id);
        
        // Create an option element
        var opt = document.createElement("option");
        // Set value for id
        opt.value = s.id;
        // Set text for id
        opt.text = s.id;
        // Append the option element to selectSubject
        selectSubject.appendChild(opt);

        //console.log(s.sample_values);
        //console.log(s.otu_labels)
   });
   // var trace1 = {
   //     x:,
   //     y: data.samples.id,
   //     type: 'bar',
   //     orientation: 'h'
   // }
});

//* Use `sample_values` as the values for the bar chart.

//* Use `otu_ids` as the labels for the bar chart.

//* Use `otu_labels` as the hovertext for the chart.

// Plotly.newPlot('myDiv', data);