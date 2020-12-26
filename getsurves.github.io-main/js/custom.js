// jQuery Initialization
jQuery(document).ready(function($) {
    "use strict";

    /* for Animation */
    new WOW().init();

    // pretty photo function call
    var pf_length = $('.pf').length;
    if (pf_length >= 1) {
        $("a[data-gal^='prettyPhoto']").prettyPhoto({ hook: 'data-gal' });
    }


    /* Smooth-Scroll */

    $(".scroll").click(function(event) {
        event.preventDefault();
        $('html,body').animate({ scrollTop: $(this.hash).offset().top }, 2000);
    });

    /* Smooth-Scroll */

    /* Go to top */

    $('#gototop').click(function(e) {
        jQuery('html, body').animate({ scrollTop: 0 }, 750, 'linear');
        e.preventDefault();
        return false;
    });

    var total_cleaningCarousel = $('.MoneyEarn_testi-carousel').length;
    if (total_cleaningCarousel >= 1) {
        $('.MoneyEarn_testi-carousel').owlCarousel({
            loop: true,
            margin: 55,
            autoplay: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                600: {
                    items: 1,
                    nav: false
                },
                1000: {
                    items: 1,
                    nav: false,
                    loop: false,
                    dots: false,
                }
            }
        });
    }


    /* -----------------------------------------------------------------------*/

    $("form.ol_paypal").live("submit", function(event) {
        var theform = this;
        var proceed = true;

        $("input, textarea, select").css('border-color', '');
        $.each($(theform).serializeArray(), function(i, field) {
            var is_required = $(theform).find('[name=' + field.name + ']').attr('required');
            if (field.value == "" && is_required) {
                $(theform).find('input[name=' + field.name + ']').css('border-color', 'red');
                $(theform).find('textarea[name=' + field.name + ']').css('border-color', 'red');
                $(theform).find('select[name=' + field.name + ']').css('border-color', 'red');
                proceed = false;
            }
            //alert(this.name);
        });
        if (!proceed) {
            event.preventDefault();
            return false;
        }

    });
    $("form:not(.ol_paypal)").live("submit", function(event) {
        //alert('j');
        event.preventDefault();
        var values = {};
        var temp_str = "";
        var theform = this;
        var proceed = true;
        var is_confirm = false;
        var confirm_pop = "";
        var is_redirect = false;
        var redirect_link = "";
        var have_type = false;
        var the_type = "";
        if ($(theform).attr('ol-form-type')) {
            if (($(theform).attr('ol-form-type') != '') && ($(theform).attr('ol-form-type') != '#')) {
                the_type = $(theform).attr('ol-form-type');
                have_type = true;
            }
        }

        $("input, textarea, select").css('border-color', '');
        $.each($(theform).serializeArray(), function(i, field) {
            values[field.name] = field.value;
            temp_str += field.name + ": " + field.value + "\n";
            var is_required = $(theform).find('[name=' + field.name + ']').attr('required');
            if (field.value == "" && is_required) {
                $(theform).find('input[name=' + field.name + ']').css('border-color', 'red');
                $(theform).find('textarea[name=' + field.name + ']').css('border-color', 'red');
                $(theform).find('select[name=' + field.name + ']').css('border-color', 'red');
                proceed = false;
            }
        });
        if (proceed) {
            if (have_type) {
                values['olanding_form_type'] = the_type;
                //alert(the_type);
            }
            //data to be sent to server
            var post_data;
            var output;
            //Ajax post data to server
            $.post('mail/new_contact.php', values, function(response) {
                //load json data from server and output message     
                if (response.type == 'error') {
                    output = '<div class="error">' + response.text + '</div>';
                } else {
                    output = '<div class="success">' + response.text + '</div>';
                    //reset values in all input fields
                    $(theform).find('input').val('');
                    $(theform).find('input').css('border-color', '');
                    $(theform).find('textarea').val('');
                }
                $(theform).find('#result').hide().html(output).slideDown();
            }, 'json');

        }
    });
    $("input, textarea, select").keyup(function() {
        $(this).css('border-color', '');
        $('#result').slideUp();
    });
    $('select').change(function() {
        $(this).css('border-color', '');
        $('#result').slideUp();
    });

    //------------------------------//--------------------------------------------------------------------//

});
