$(document).ready(function() {

  /***************** Mapbox Component ******************/

  mapboxgl.accessToken = 'pk.eyJ1IjoicG1pbGxlcmsiLCJhIjoiY2lyM3VjMzNsMDFkZHR4bHdxOWs1amt1MiJ9.nc1fPKTYXlgC1zVoYS2Oag';

  var settings = {
      lat: 38.943057,
      long: -77.321264
  }

  var geojson = {
          "type": "FeatureCollection",
          "features": [{
                  "type": "Feature",
                  "properties": {
                      "message": "Foo",
                      "iconSize": [60, 60]
                  },
                  "geometry": {
                      "type": "Point",
                      "coordinates": [
                          settings.long,
                          settings.lat
                      ]
                  }
              }]
          }


    var map = new mapboxgl.Map({
        container: 'map-one',
        style: 'mapbox://styles/mapbox/light-v9',
        center: [settings.long, settings.lat],
        interactive: false,
        zoom: 14
    });

    // Pulse Dot Experiment

    var framesPerSecond = 15;
    var initialOpacity = 1
    var opacity = initialOpacity;
    var initialRadius = 6;
    var radius = initialRadius;
    var maxRadius = 18;

    map.on('load', function () {

        // Add a source and layer displaying a point which will be animated in a circle.
        map.addSource('point', {
            "type": "geojson",
            "data": {
                "type": "Point",
                "coordinates": [
                    settings.long, settings.lat
                ]
            }
        });

        map.addLayer({
            "id": "point",
            "source": "point",
            "type": "circle",
            "paint": {
                "circle-radius": initialRadius,
                "circle-radius-transition": {duration: 0},
                "circle-opacity-transition": {duration: 0},
                "circle-color": "#007cbf"
            }
        });

        map.addLayer({
            "id": "point1",
            "source": "point",
            "type": "circle",
            "paint": {
                "circle-radius": initialRadius,
                "circle-color": "#007cbf"
            }
        });


        // Animate the point
        function animateMarker(timestamp) {
            setTimeout(function(){
                requestAnimationFrame(animateMarker);

                radius += (maxRadius - radius) / framesPerSecond;
                opacity -= ( .9 / framesPerSecond );

                map.setPaintProperty('point', 'circle-radius', radius);
                map.setPaintProperty('point', 'circle-opacity', opacity);

                if (opacity <= 0) {
                    radius = initialRadius;
                    opacity = initialOpacity;
                }

            }, 1000 / framesPerSecond);

        }

        // Start the animation.
        animateMarker(0);
    });

    /***************** Share Dropdown ******************/

    $("li a.share-trigger").on("click", function() {
        $('.share-dropdown').toggleClass("is-open");
        event.preventDefault();
    });

    /***************** Search Component ******************/

    $(".show-search").on("click", function() {
        $(".search-wrapper").addClass("is-visible");
    });

    $(".hide-search").on("click", function() {
        $(".search-wrapper").removeClass("is-visible");
        $(".search-wrapper input").removeClass("is-selected");
    });

    $(".search-wrapper input").on("click", function() {
        $(this).addClass("is-selected");
    });

    $('.search-wrapper input').keypress(function(e) {
        if (e.which === 13) { //Enter key pressed
            window.alert("Ready for implementation.");
        }
    });

    /***************** Bar Chart Animation ******************/

    $('.bar').width('0%');
    $('.bar').waypoint(function() {
        $('.bar').each(function() {
            var width = $(this).data("percentage");
            $(this).animate({
                width: width
            }, {
                duration: 2000,
                easing: 'easeOutExpo',
            });
        });
    }, {
        offset: '85%'
    });

    /***************** Stats Counter ******************/

    var counterZero = '0';
    $('.stats-number').text(counterZero);

    $('.stats-number').waypoint(function() {
        $('.stats-number').each(function() {
            var $this = $(this);
            $({
                Counter: 0
            }).animate({
                Counter: $this.attr('data-stop')
            }, {
                duration: 5000,
                easing: 'swing',
                step: function(now) {
                    $this.text(Math.ceil(now));
                }
            });
        });
        this.destroy();
    }, {
        offset: '75%'
    });

    /***************** Smooth Scroll ******************/

    $('a[href*=#]:not([href=#])').click(function() {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {

            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html,body').animate({
                    scrollTop: target.offset().top
                }, 2000);
                return false;
            }
        }
    });

    /***************** Responsive Nav ******************/

    $('.nav-toggle').click(function() {
        $(this).toggleClass('active');
        $('.navicon').toggleClass('fixed');
        $('.primary-nav-wrapper').toggleClass('open');
        event.preventDefault();
    });
    $('.primary-nav-wrapper li a').click(function() {
        $('.nav-toggle').toggleClass('active');
        $('.navicon').toggleClass('fixed');
        $('.primary-nav-wrapper').toggleClass('open');
    });

    /***************** Waypoints ******************/

    $('.wp1').waypoint(function() {
        $('.wp1').addClass('animated fadeInUp');
    }, {
        offset: '80%'
    });
    $('.wp2').waypoint(function() {
        $('.wp2').addClass('animated fadeInUp');
    }, {
        offset: '95%'
    });
    $('.wp3').waypoint(function() {
        $('.wp3').addClass('animated fadeInUp');
    }, {
        offset: '95%'
    });
    $('.wp4').waypoint(function() {
        $('.wp4').addClass('animated fadeInUp');
    }, {
        offset: '75%'
    });
    $('.wp5').waypoint(function() {
        $('.wp5').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });
    $('.wp6').waypoint(function() {
        $('.wp6').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });
    $('.wp7').waypoint(function() {
        $('.wp7').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });
    $('.wp8').waypoint(function() {
        $('.wp8').addClass('animated fadeIn');
    }, {
        offset: '75%'
    });

    /***************** Overlay touch/hover events ******************/

    if (Modernizr.touch) {
        $('figure').bind('touchstart touchend', function(e) {
            $(this).toggleClass('hover');
        });
    }
});
