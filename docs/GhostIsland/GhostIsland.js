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
                for(var c=0; c<this.length; c++) {
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
        nextPrev(1);
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
        fixStepIndicator(n);
        window.scrollTo(0,0);
    };

    function nextPrev(n) {
        // This function will figure out which tab to display
        var x = $(".tab");
        // Exit the function if any field in the current tab is invalid:
        if (n === 1 && !validateform()) {
            alert("please fill out all questions on page");
            return false;
        };
        // Hide the current tab:
        x[currentTab].style.display = "none";
        // Increase or decrease the current tab by 1:
        currentTab = currentTab + n;
        // if you have reached the end of the form...
        if (($("#nextBtn").html() === "Submit" || currentTab >= x.length) && n !== -1) {
            var form_results = get_results();
            PushPullGithub(form_results);
        };
        // Display the correct tab:
        showTab(currentTab);
    };

    function fixStepIndicator(n) {
        $("progress").val(n+1);
    };

    // Validate data
    function validateform() {
        var x, y, z, i, valid = true;
        x = $(".tab");
        y = x[currentTab].getElementsByTagName("input");
        if (y.length === 0) {
            z = x[currentTab].getElementsByTagName("option");
            for (i=1; i<z.length; i++) {
                if (z[i].selected) {
                    valid = true;
                    break;
                } else {
                    valid = false;
                };
            };
        } else {
            for (i=0; i<y.length; i++) {
                // If a field is empty...
                if (y[i].checked) {
                    valid = true;
                    break;
                } else {
                    valid = false;
                };
            };
        };
        return valid;
    };
};

function PushPullGithub(form_results) {
    // This is SUPER janky and needs help :)
    // http://github-tools.github.io/github/docs/3.1.0/Repository.html#getRef
    // backup option? https://github.com/philschatz/octokat.js/
    $("#nextBtn").addClass("isHidden");
    $("#prevBtn").addClass("isHidden");
    $("progress").addClass("isHidden");
    $("#loading_results").removeClass("isHidden");
    $.ajax({
        type: "GET",
        url: "https://api.github.com/repos/ethanebinger/Fantasy-Survivor/contents/GhostIsland_Responses.json",
        dataType: "json",
        success: function(result) {
            // PULL existing data (saved in 'responses' object)
            var x = result.content;
            var existing_responses = atob(x);
            var responses = JSON.parse(existing_responses);
            // PUSH new data (only following index.html submission)
            if (form_results != 0) {
                responses.push(form_results);
                var responses_str = JSON.stringify(responses);
                var t_a = 'Mzk2Njc0YjdlYWQxMjZhMTFl',
                    t_b = 'NWFmNmVmZTFhMmZjZDA1NDZjZjU0NA==',
                    user = 'ethanebinger',
                    repo = 'Fantasy-Survivor';
                var push_user = form_results.name;
                let api = new GithubAPI({token: atob(t_a)+atob(t_b)});
                api.setRepo(user, repo);
                api.setBranch('master')
                    .then( () => api.pushFiles(
                        'new input from '+push_user,
                        [{
                            content: responses_str, 
                            path: 'GhostIsland_Responses.json'
                        }]
                    ))
                    .then(function() {
                        console.log('Files committed!');
                        window.location = "http://ethanebinger.com/Fantasy-Survivor/GhostIsland/results.html"
                    });
            } else {
                // load results chart
                init_chart(responses);  
            };
        }
    });
};

function init_chart(responses) {
    // Define temp data
    var scores = [
        {	'name': 'Walter', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Vivian', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Myles', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Lucas', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Josh', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Ezra', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Ethan', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Emily', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'David', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Colin', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Anastassia', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        },
        {	'name': 'Aaron', 
            'total': 0, 
            'Vote 1': 0, 
            'Vote 2': 0, 
            'Vote 3': 0,
            'Vote 4': 0, 
            'Vote 5': 0, 
            'Vote 6': 0,
            'Vote 7': 0, 
            'Vote 8': 0, 
            'Vote 9': 0,
            'Vote 10': 0, 
            'Vote 11': 0, 
            'Vote 12': 0,
            'Vote 13': 0, 
            'Vote 14': 0, 
            'Vote 15': 0,
            'Vote 16': 0
        }
    ];
    var results = [
        {	'vote': 1,
            'date': '2/28/18',
            'merge': 'No',
            'reward': 'Malolo', 
            'immunity': 'Naviti', 
            'eliminated': 'Stephanie Gonzalez',
            'idolFound': 'No',
            'idolPlayed': 'No',
            'titleQuote': 'Jeff Probst',
            'nudity': 'No',
            'ghostIsland': 'Jacob Derwin',
            'malolo': [
                'Brendan Shapiro',
                'Donathan Hurley',
                'Jacob Derwin',
                'James Lim',
                'Jenna Bowman',
                'Laurel Johnson',
                'Libby Vincek',
                'Michael Yerger',
                'Stephanie Gonzalez',
                'Stephanie Johnson'
            ],
            'naviti': [
                'Angela Perkins',
                'Bradley Kleihege',
                'Chelsea Townsend',
                'Chris Noble',
                'Desiree Afuye',
                'Domenick Abbate',
                'Kellyn Bechtold',
                'Morgan Ricke',
                'Sebastian Noel',
                'Wendell Holland'
            ]
        },
        {	'vote': 2,
            'date': '2/28/18',
            'merge': 'No',
            'reward': null, 
            'immunity': 'Naviti', 
            'eliminated': 'Jacob Derwin',
            'idolFound': 'Yes', //Domenick Abbate
            'idolPlayed': 'No',
            'titleQuote': null,
            'nudity': 'No',
            'ghostIsland': 'Donathan Hurley',
            'malolo': [
                'Brendan Shapiro',
                'Donathan Hurley',
                'Jacob Derwin',
                'James Lim',
                'Jenna Bowman',
                'Laurel Johnson',
                'Libby Vincek',
                'Michael Yerger',
                'Stephanie Johnson'
            ],
            'naviti': [
                'Angela Perkins',
                'Bradley Kleihege',
                'Chelsea Townsend',
                'Chris Noble',
                'Desiree Afuye',
                'Domenick Abbate',
                'Kellyn Bechtold',
                'Morgan Ricke',
                'Sebastian Noel',
                'Wendell Holland'
            ]
        },
        {	'vote': 3,
            'date': '3/7/18',
            'merge': 'Swap',
            'reward': null, 
            'immunity': 'Malolo', 
            'eliminated': 'Morgan Ricke',
            'idolFound': 'Yes', //Michael Yerger
            'idolPlayed': 'No',
            'titleQuote': 'Morgan Ricke',
            'nudity': 'No',
            'ghostIsland': 'Chris Noble',
            'malolo': [
                'Brendan Shapiro',
                'Jenna Bowman',
                'Michael Yerger',
                'Stephanie Johnson',
                'Bradley Kleihege',
                'Chelsea Townsend',
                'Sebastian Noel',
                'Kellyn Bechtold',
                'Desiree Afuye'
            ],
            'naviti': [
                'Angela Perkins',
                'Donathan Hurley',
                'James Lim',
                'Laurel Johnson',
                'Libby Vincek',
                'Chris Noble',
                'Domenick Abbate',
                'Morgan Ricke',
                'Wendell Holland'
            ]
        },
        {	'vote': 4,
            'date': '3/14/18',
            'merge': 'No',
            'reward': 'Naviti', 
            'immunity': 'Naviti', 
            'eliminated': 'Brendan Shapiro',
            'idolFound': 'No',
            'idolPlayed': 'Yes',
            'titleQuote': 'Kellyn Bechtold',
            'nudity': 'No',
            'ghostIsland': 'Kellyn Bechtold',
            'malolo': [
                'Brendan Shapiro',
                'Jenna Bowman',
                'Michael Yerger',
                'Stephanie Johnson',
                'Bradley Kleihege',
                'Chelsea Townsend',
                'Sebastian Noel',
                'Kellyn Bechtold',
                'Desiree Afuye'
            ],
            'naviti': [
                'Angela Perkins',
                'Donathan Hurley',
                'James Lim',
                'Laurel Johnson',
                'Libby Vincek',
                'Chris Noble',
                'Domenick Abbate',
                'Wendell Holland'
            ]
        }
    ];
    
    // Function to check if x in array
    var inArray = function(x,y) {
        var i;
        for (i=0; i < y.length; i++) {
            if (y[i] === x) {
                return true;
            };
        };
        return false;
    };

    // Create arrays for players, keys (votes)
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
                var malolo = results[i].malolo;
                var naviti = results[i].naviti;
                var iter_ep = [];
            for (var j=0; j<responses.length; j++) {
                // Validate Player
                if (responses[j].name === cur_player) {
                    // Determine Vote Number/Week (and ignore late sumissions)
                    var cur_vote = 0;
                    var submit_time = new Date(responses[j].submit_time);
                    if (submit_time <= new Date(2018,1,28,20)) {
                        // Extra Loop for Double Episode
                        if (inArray(1, iter_ep)) {
                            cur_vote = 2;
                        } else {
                            cur_vote = 1;
                            iter_ep.push(cur_vote);
                        };
                    } else if (submit_time <= new Date(2018,2,7,20)) {
                        cur_vote = 3;
                    } else if (submit_time <= new Date(2018,2,14,20)) {
                        cur_vote = 4;
                    } else if (submit_time <= new Date(2018,2,21,20)) {
                        cur_vote = 5;
                    } else if (submit_time <= new Date(2018,2,28,20)) {
                        cur_vote = 6;
                    } else if (submit_time <= new Date(2018,3,4,20)) {
                        cur_vote = 7;
                    } else if (submit_time <= new Date(2018,3,11,20)) {
                        cur_vote = 8;
                    } else if (submit_time <= new Date(2018,3,18,20)) {
                        cur_vote = 9;
                    } else if (submit_time <= new Date(2018,3,25,20)) {
                        cur_vote = 10;
                    } else if (submit_time <= new Date(2018,4,2,20)) {
                        cur_vote = 11;
                    } else if (submit_time <= new Date(2018,4,9,20)) {
                        cur_vote = 12;
                    } else if (submit_time <= new Date(2018,4,16,20)) {
                        cur_vote = 13;
                    } else if (submit_time <= new Date(2018,4,23,20)) {
                        cur_vote = 14;
                    } else if (submit_time <= new Date(2018,4,30,20)) {
                        cur_vote = 15;
                    };
                    // Validate Vote Number/Week
                    if (results[i].vote === cur_vote) {
                        var val_vote = 'Vote ' + String(results[i].vote);
                        // Determine by team if before merge but no swap:
                        if (results[i].merge === 'Yes' /*|| results[i].merge === 'Swap'*/) {
                            // Reward
                            if (results[i].reward == responses[j].reward && responses[j].reward) {
                                scores[n][val_vote] += 5;
                                scores[n].total += 5;
                            };
                            // Immunity
                            if (results[i].immunity == responses[j].immunity && responses[j].immunity) {
                                scores[n][val_vote] += 7.5;
                                scores[n].total += 7.5;
                            };
                        } else {
                            // Reward
                            if (results[i].reward === 'Malolo' && inArray(responses[j].reward, malolo) && responses[j].reward) {
                                scores[n][val_vote] += 5;
                                scores[n].total += 5;
                            } else if (results[i].reward === 'Naviti' && inArray(responses[j].reward, naviti) && responses[j].reward) {
                                scores[n][val_vote] += 5;
                                scores[n].total += 5;   
                            };
                            // Immunity
                            if (results[i].immunity == 'Malolo' && inArray(responses[j].immunity, malolo) && responses[j].immunity) {
                                scores[n][val_vote] += 7.5;
                                scores[n].total += 7.5;
                            } else if (results[i].immunity == 'Naviti' && inArray(responses[j].immunity, naviti) && responses[j].immunity) {
                                scores[n][val_vote] += 7.5;
                                scores[n].total += 7.5;
                            };
                        };
                        // Eliminated
                        if (results[i].eliminated == responses[j].eliminated && responses[j].eliminated) {
                            scores[n][val_vote] += 10;
                            scores[n].total += 10;
                        };
                        // Safe
                        if (results[i].eliminated !== responses[j].safe && responses[j].safe) {
                            scores[n][val_vote] += 10;
                            scores[n].total += 10;
                        };
                        // Title Quote
                        if (results[i].titleQuote == responses[j].titleQuote && responses[j].titleQuote) {
                            scores[n][val_vote] += 2;
                            scores[n].total += 2;
                        };
                        // Ghost Island Inhabitant
                        if (results[i].ghostIsland == responses[j].ghostIsland && responses[j].ghostIsland) {
                            scores[n][val_vote] += 2;
                            scores[n].total += 2;
                        };
                        // Nudity
                        if (results[i].nudity == responses[j].nudity && responses[j].nudity) {
                            scores[n][val_vote] += 2;
                            scores[n].total += 2;
                        };
                        // Idol Found
                        if (results[i].idolFound == responses[j].idolFound && responses[j].idolFound) {
                            scores[n][val_vote] += 2;
                            scores[n].total += 2;
                        };
                        // Idol Played
                        if (results[i].idolPlayed == responses[j].idolPlayed && responses[j].idolPlayed) {
                            scores[n][val_vote] += 2;
                            scores[n].total += 2;
                        };
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
