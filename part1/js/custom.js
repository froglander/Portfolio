// Closes the sidebar menu
    $("#menu-close").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Opens the sidebar menu
    $("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#sidebar-wrapper").toggleClass("active");
    });
    // Scrolls to the selected menu item on the page
    $(function() {
        $('a[href*=#]:not([href=#])').click(function() {
            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') || location.hostname == this.hostname) {
                var target = $(this.hash);
                // Added this to get a value set in the html file to use as a buffer for how far to scroll to leave part of the header image showing
                var buffer = $(this).data("buffer");
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    $('html,body').animate({
                        scrollTop: target.offset().top-buffer
                    }, 1000);
                    return false;
                }
            }
        });
    });
    //#to-top button appears after scrolling
    var fixed = false;
    $(document).scroll(function() {
        if ($(this).scrollTop() > 250) {
            if (!fixed) {
                fixed = true;
                // $('#to-top').css({position:'fixed', display:'block'});
                $('#to-top').show("slow", function() {
                    $('#to-top').css({
                        position: 'fixed',
                        display: 'block'
                    });
                });
                // Displays secondary page heading once you scroll down
                $("#secondaryTitle").show();

                // Adds a background to menu links so they are visible
                $(".navbar-custom").css({ background: 'rgba(0, 0, 0, 0.30)'});
                $(".navbar-nav > li > a").css({ color: '#eee'});
            }
        } else {
            if (fixed) {
                fixed = false;
                $('#to-top').hide("slow", function() {
                    $('#to-top').css({
                        display: 'none'
                    });
                });
                // Transition the secondaryTitle off the screen when you scroll back up
                $('#secondaryTitle').hide("slow", function() {
                    $('#secondaryTitle').css({
                        display: 'none'
                    });                    
                });  
                // Set the navbar back to transparent when you scroll back up
                $(".navbar-custom").css({ background: 'transparent'});
                $(".navbar-nav > li > a").css({ color: '#777'});
            }
        }
    });
    // Disable Google Maps scrolling
    // See http://stackoverflow.com/a/25904582/1607849
    // Disable scroll zooming and bind back the click event
    var onMapMouseleaveHandler = function(event) {
        var that = $(this);
        that.on('click', onMapClickHandler);
        that.off('mouseleave', onMapMouseleaveHandler);
        that.find('iframe').css("pointer-events", "none");
    }
    var onMapClickHandler = function(event) {
            var that = $(this);
            // Disable the click handler until the user leaves the map area
            that.off('click', onMapClickHandler);
            // Enable scrolling zoom
            that.find('iframe').css("pointer-events", "auto");
            // Handle the mouse leave event
            that.on('mouseleave', onMapMouseleaveHandler);
        }
        // Enable map zooming with mouse scroll when the user clicks the map
    $('.map').on('click', onMapClickHandler);

    
    // Added this function to calculate the position for the secondary title to display when you click the button
    // under the h1 title
    $(document).ready(function() {
        adjustTop();
        $(window).on("resize", adjustTop);
    })

    function adjustTop() {        
        var buffer = $("#hdrButton").data("buffer");
        var secondaryBuffer = (buffer - $("#secondaryTitle").height()/2 ) / 2;
        var offsetTop = $("#h1Name").offset().top;
        // var headerHeight = 69.5;

        if (offsetTop < 200) {
            offsetTop = 200;
        }
        
        var headerHeight = offsetTop - buffer + secondaryBuffer;            
        

        $("#secondaryTitle").css("top", headerHeight);
    }