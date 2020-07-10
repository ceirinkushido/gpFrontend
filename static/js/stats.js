
function loadChart(type){
    var xmlhttp = new XMLHttpRequest();
    switch (type){
        case "1":
            xmlhttp.open("GET", "http://34.89.108.223/statistics/applicantserproject");
            break;
        case "2":
            xmlhttp.open("GET", "http://34.89.108.223/statistics/registerusers");
            break;
        case "3":
            xmlhttp.open("GET", "http://34.89.108.223/statistics/registercompanies");
            break;
        default:
            break;
    };
    xmlhttp.addEventListener("load", function() {
        resetCanvas();
        try{
            var stats = JSON.parse(this.responseText);
            console.log(stats);

            var labels = new Array();
            var data = new Array();
            switch (type){
                case "1":
                    for (var i in stats) {
                        labels.push(stats[i]._id.name);
                        data.push(stats[i].count);
                    }
                    break;
                case "2":
                    for (var i in stats) {
                        labels.push(stats[i]._id.date);
                        data.push(stats[i].count);
                    };
                    break;
                case "3":
                    for (var i in stats) {
                        labels.push(stats[i]._id.date);
                        data.push(stats[i].count);
                    }
                    break;
                default:
                    break;
            };
            
            //console.log(labels);
            canvas = document.querySelector('#results-graph');
            var ctx = canvas.getContext('2d');
            var config = {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Graph Line',
                    data: data,
                    backgroundColor: 'rgba(0, 119, 204, 0.3)'
                }]
            }
            };
            
            var chart = new Chart(ctx, config);
        }
        catch(e){
            console.log(e)
        }
    });
    xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    xmlhttp.send();

}
function resetCanvas(){
    //$('#results-graph').remove(); // this is my <canvas> element
    $('#graph-container').empty();
    $('#graph-container').append('<canvas id="results-graph"><canvas>');
  };