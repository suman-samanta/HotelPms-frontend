(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
      setTimeout(function () {
          if ($('#spinner').length > 0) {
              $('#spinner').removeClass('show');
          }
      }, 1);
  };
  spinner();
  
  
  // Back to top button
  $(window).scroll(function () {
      if ($(this).scrollTop() > 300) {
          $('.back-to-top').fadeIn('slow');
      } else {
          $('.back-to-top').fadeOut('slow');
      }
  });
  $('.back-to-top').click(function () {
      $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
      return false;
  });


  // Sidebar Toggler
  $('.sidebar-toggler').click(function () {
      $('.sidebar, .content').toggleClass("open");
      return false;
  });


  // Progress Bar
  $('.pg-bar').waypoint(function () {
      $('.progress .progress-bar').each(function () {
          $(this).css("width", $(this).attr("aria-valuenow") + '%');
      });
  }, {offset: '80%'});

  //hotel-list js//
  $(document).ready(function() {
    var table = $('#example').DataTable( {
        lengthChange: true,
        buttons: [ 'copy', 'excel',  'pdf' ]
    } );
    table.buttons().container()
        .appendTo( '#example_wrapper .col-md-6:eq(0)' );
} );

//reservation part js//
$(document).ready(function () {
    $('#dtHorizontalExample').DataTable({
      "scrollX": true,
    });
    $('.dataTables_length').addClass('bs-select');
  });

//subscription part js//
  $(document).ready(function () {
    $('#subscriptiontable').DataTable({
      "scrollX": true,
    });
    $('.dataTables_length').addClass('bs-select');
  });


//add employee js//
$(document).ready(function () {
  $('#addemployee').DataTable({
    "scrollX": true,
  });
  $('.dataTables_length').addClass('bs-select');
});

	///============= galary =============\\\
    $(window).on("load", function () {
		var e = $(".gallery-filter")
			, a = $("#gallery-filter");
		e.isotope({
			filter: "*"
			, layoutMode: "masonry"
			, animationOptions: {
				duration: 750
				, easing: "linear"
			}
		}), a.find("a").on("click", function () {
			var o = $(this).attr("data-filter");
			return a.find("a").removeClass("active"), $(this).addClass("active"), e.isotope({
				filter: o
				, animationOptions: {
					animationDuration: 750
					, easing: "linear"
					, queue: !1
				}
			}), !1
		})
	});

})(jQuery);
