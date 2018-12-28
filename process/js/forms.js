'use strict';

$(function() {
  // Contact form
  var th = $("#contactForm");

  th.validate({
    submitHandler: function(form) {
      var formData = th.serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: 'POST',
        url: th.attr('action'),
        data: formData
      })
      .done(function(response) {
        // Show success message
        th.find(".subSuccess").show();
        th.find(".subError").hide();

        // Clear the form.
        $('#name').val('');
        $('#email').val('');
        $('#phone').val('');
        $('#company').val('');
        $('#message').val('');
      })
      .fail(function(data) {
        // Show error message
        th.find(".subSuccess").hide();
        th.find(".subError").show();
      });
    },
    rules: {
      name: {
        required: true,
        maxlength: 30
      },
      emailaddr: {
        required: true,
        maxlength: 100
      },
      phone: {
        minlength: 10,
        maxlength: 18
      },
      company: {
        maxlength: 100
      },
      message: {
        required: true,
        minlength: 10,
        maxlength: 1000
      }
    },
    messages: {
      name: {
        required: "* Name cannot be blank.",
        maxlength: "* Name is too long (limit 30 characters)."
      },
      emailaddr: {
        required: "* E-mail cannot be blank.",
        maxlength: "* E-mail is too long (limit 100 characters)."
      },
      phone: {
        minlength: "* Phone number must be at least 10 characters.",
        maxlength: "* Phone number is too long (limit 18 characters)."
      },
      company: {
        maxlength: "* Company/Organization is too long (limit 100 characters)."
      },
      message: {
        required: "* Message cannot be blank.",
        minlength: "* Message must be longer than 10 characters.",
        maxlength: "* Message must be shorter than 1000 characters."
      }
    }
  });
});
