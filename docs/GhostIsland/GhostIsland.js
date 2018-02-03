function init() {
    // Input button coloring
    $('input').click(function(e) {
        var cur_id = $(e.target).attr('value');
        cur_id = cur_id.replace(" ","_");
        $(e.target).parent().children('label').addClass('greyLabel');
        $(e.target).parent().children('label.'+cur_id).removeClass('greyLabel');
    });
    
    // Collect form results
    function get_results(form) {
        var results = {};
        var val = ""
        $('form').each(function(e) {
            var q = this.name;
            val = $(this).find(":selected").text();
            if (val.length > 0) {
                val = val.trim();
            } else {
                for(var c=0; c<this.length-1; c++) {
                    if (this[c].checked === true) {
                        val = this[c].value;     
                    };
                };
            };
            results[q] = val;
        });
        results['submit_time'] = new Date();
        return results;
    };

    // Tab switching
    var currentTab = 0;
    showTab(currentTab);

    $("#prevBtn").click(function(e) {
        nextPrev(-1);
        window.scrollTo(0,0);
    });
    $("#nextBtn").click(function(e) {
        if ($("#nextBtn").html() === "Submit") {
            var form_results = get_results();
            alert(form_results);
            window.location = "http://ethanebinger.com/Fantasy-Survivor/GhostIsland/results.html" 
        };
        nextPrev(1);
        window.scrollTo(0,0);
    });

    function showTab(n) {
        var x = $(".tab");
        x[n].style.display = "block";
        if (n === 0) {
            $("#prevBtn").addClass("isHidden");
        } else {
            $("#prevBtn").removeClass("isHidden");
        };
        if (n === (x.length - 1)) {
            $("#nextBtn").html("Submit");
        } else {
            $("#nextBtn").html("Next");
        };
        fixStepIndicator(n)
        
        /*
        if (x[n].className == "tab graph") {
            $("#nextBtn").addClass("isHidden");
            $("#prevBtn").addClass("isHidden");
            $("progress").addClass("isHidden");
        };
        //*/
    };

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = $(".tab");
        // Exit the function if any field in the current tab is invalid:
        if (n === 1 && !validateform()) {
            return false;
        };
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form...
        if (currentTab >= x.length) {
            // ... the form gets submitted:
            document.getElementById("regForm").submit();
            return false;
        };
        // Otherwise, display the correct tab:
        showTab(currentTab);
    };

    function fixStepIndicator(n) {
        $("progress").val(n+1);
    };

    // Validate data
    function validateform() {
        return true;
    };

    
    
    
    
    // Define temp data
    var scores = [
        {	'name': 'Walter', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'Josh', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'Ezra', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'Ethan', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'Emily', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'David', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'Colin', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
        {	'name': 'Anastassia', 
            'total': 0, 
            'Week 1': 0, 
            'Week 2': 0, 
            'Week 3': 0,
            'Week 4': 0, 
            'Week 5': 0, 
            'Week 6': 0,
            'Week 7': 0, 
            'Week 8': 0, 
            'Week 9': 0,
            'Week 10': 0, 
            'Week 11': 0, 
            'Week 12': 0,
            'Week 13': 0, 
            'Week 14': 0, 
            'Week 15': 0
        },
    ];
    var response = [
        {   'name': 'Ethan', 
            'week': 1, 
            'date': '2/28/18', 
            'reward': '', 
            'immunity': '', 
            'eliminated': '', 
            'safe': ''
        },
    ];
    var results = [
        {	'week': 1,
            'date': '2/28/18', 
            'reward': null, 
            'immunity': null, 
            'eliminated': null,
            'idolFound': null,
            'idolPlayed': null,
            'titleQuote': null,
            'nudity': null
        },
    ];

    // Create arrays for players, keys (weeks)
    var players = scores.map(function(d) { return d.name; });
    var keys = Object.keys(scores[0]).splice(2,)

    // Define chart elements
    var margin = {top: 20, right: 20, bottom: 30, left: 80},
        width = $('#survivor_form').width() - margin.left - margin.right,
        height = 480 - margin.top - margin.bottom;

    // Define Scales and Axes
    var x = d3.scaleLinear()
        .range([0, width-100]);
    var y = d3.scaleBand()
        .domain(players)
        .rangeRound([height, 0], 0.3);
    var color = d3.scaleOrdinal()
        .domain(keys)
        .range(["#8dd3c7", "#ffffb3", "#bebada", 
                "#fb8072", "#80b1d3", "#fdb462", 
                "#b3de69", "#fccde5", "#d9d9d9", 
                "#bc80bd", "#ccebc5", "#ffed6f",
                "#1f78b4", "#33a02c", "#6a3d9a"]);
    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    // Define tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-5, 0])
        .html(function(d) {
            return 	"<strong>" + d.data.name + "</strong>" +
                    "<br><span>Weekly Score = " + String(d[1]-d[0]) + "</span>" +
                    "<br><span>Total Score = " + d.data.total + "</span>"
        });

    // Define SVG and associated elements
    var svg = d3.select("#chart")
        .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
    var chart = svg.append("g")
        .attr("transform",  "translate(" + margin.left + "," + margin.top + ")")
        .call(tip);	

    // Calculate scores
    for (var n=0; n<scores.length; n++) {
        var cur_player = scores[n].name;
        for (var i=0; i<results.length; i++) {
            for (var j=0; j<response.length; j++) {
                if (response[j].name == cur_player && results[i].week == response[j].week) {
                    // Define Week
                    var cur_week = 'Week ' + String(results[i].week)
                    // Reward
                    if (results[i].reward == response[j].reward && response[j].reward) {
                        scores[n][cur_week] += 5;
                        scores[n].total += 5;
                    };
                    // Immunity
                    if (results[i].immunity == response[j].immunity && response[j].immunity) {
                        scores[n][cur_week] += 7.5;
                        scores[n].total += 7.5;
                    };
                    // Eliminated
                    if (results[i].eliminated == response[j].eliminated && response[j].eliminated) {
                        scores[n][cur_week] += 10;
                        scores[n].total += 10;
                    };
                    // Safe
                    if (results[i].eliminated !== response[j].safe && response[j].safe) {
                        scores[n][cur_week] += 10;
                        scores[n].total += 10;
                    };
                    // Title Quote
                    if (results[i].titleQuote !== response[j].titleQuote && response[j].titleQuote) {
                        scores[n][cur_week] += 2;
                        scores[n].total += 2;
                    };
                    // Nudity
                    if (results[i].nudity !== response[j].nudity && response[j].nudity) {
                        scores[n][cur_week] += 2;
                        scores[n].total += 2;
                    };
                    // Idol Found
                    if (results[i].idolFound !== response[j].idolFound && response[j].idolFound) {
                        scores[n][cur_week] += 2;
                        scores[n].total += 2;
                    };
                    // Idol Played
                    if (results[i].idolPlayed !== response[j].idolPlayed && response[j].idolPlayed) {
                        scores[n][cur_week] += 2;
                        scores[n].total += 2;
                    };
                };
            };
        };
    };

    // Define X-Scale Domain
    x.domain([0,d3.max(scores, function(d) { return d.total; })]);

    // Render Chart
    chart.append("g")
        .selectAll("g")
        .data(d3.stack().keys(keys)(scores))
        .enter().append("g")
            .attr("fill", function (d){ return color(d.key); })
        .selectAll("rect")
        .data(function(d) { return d; })
        .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d[0]); })
            .attr("y", function(d) { return y(d.data.name); })
            .attr("width", function(d) { return x(d[1]) - x(d[0]); })
            .attr("height", y.bandwidth())
            .on("mouseenter", function(d) { 
                tip.show(d); 
                d3.select(this).style("cursor", "pointer")
                               .style("fill-opacity", 0.5);
            })
            .on("mouseleave", function(d) { 
                d3.select(this).style("fill-opacity", 1);
                tip.hide(d);
            });

    // Add Axes
    chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + height + ")")
        .call(xAxis);
    chart.append("g")
        .attr("class", "y axis")
        .call(yAxis);

    // Add Legend
    var legend = chart.append("g")
        .attr("font-family", "sans-serif")
        .attr("font-size", 10)
        .attr("text-anchor", "end")
        .selectAll("g")
            .data(keys)
            .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    legend.append("rect")
        .attr("x", width - 19)
        .attr("width", 19)
        .attr("height", 19)
        .attr("fill", color);

    legend.append("text")
        .attr("x", width - 24)
        .attr("y", 9.5)
        .attr("dy", "0.32em")
        .text(function(d) { return d; });

};