/*
	Template Name: VRocket - HTML5 Hosting Template
	Author: Nifty Theme - Osama Bakri
	Themeforest Account: https://themeforest.net/user/niftytheme
	Contact: niftytheme@gmail.com
	Version: 1.4.0
  Page Name : Custom JavaScript File
	Created: 30 September 2019
	License: You must have a valid license purchased only from themeforest(the above link) in order to legally use the theme for your project.
*/

/*global window, jQuery */
(function ($) {

  'use strict';

  // -- :: Loading Page
  $(window).on('load', function () {
    $('#loading').fadeOut(1000);
    $('html').css('overflow-y', 'visible');
  });
  // ----------------------------------

  // -- :: Navbar
  $(window).on('scroll', function () {
    if($(window).scrollTop() > 10 ) {
      $('nav').addClass('scrolled');
    } else {
      $('nav').removeClass('scrolled');
    }
  });

  $('nav button').on('click', function() {
    $($(this).data('target')).fadeToggle();
  });

  $(document).ready(function () {
    if ($(document).width() < 974) {
      // Add slideDown animation to Bootstrap dropdown when expanding.
      $('.dropdown').on('show.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
      });

      // Add slideUp animation to Bootstrap dropdown when collapsing.
      $('.dropdown').on('hide.bs.dropdown', function() {
        $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
      });
    } else {
      return false;
    }
  });
  // ----------------------------------------------------------

  // -- :: Footer
  // Language Menu
  $('#lang-btn').on('click', function () {
    $('footer .copyright .language-menu .menu').toggleClass('show');
  });
  $(document).mouseup(function (e) {
    var container = $("footer .copyright .language-menu .menu");

    // if the target of the click isn't the container nor a descendant of the container
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      container.removeClass('show');
    }
  });

  // ----------------------------------

  // -- :: Index Page

  // Hosting Section
  $('#index-page .hosting .host-taps li').on('click', function () {
    $(this).addClass('active').siblings().removeClass('active');
    $('.host-item').hide();
    $($(this).data('show')).show();
    return false;
  });
  
  $('#index-page .hosting .host-taps .s-toggler .check').on('click', function () {
    $(this).parents('.s-toggler').find('.toggler').toggleClass('toggler--is-active');
    $('#index-page .hosting .host-items-contain').toggleClass('active--section');
  });

  // Section IX ( Boxes Nav )
  $('.se-ix ul.boxes-nav li').on('click', function() {
    $(this).addClass('active').siblings().removeClass('active');
    $($(this).data('box')).fadeIn().siblings().hide();
  });
  // ----------------------------------

  // -- :: VPS Page
  // Section 4 -> Show the content
  $('#vps-page .section-4 .contain .list li').on('click', function () {
    $('#vps-page .section-4 .contain .list li').removeClass('selected');
    $(this).addClass('selected');
    $($(this).data('show')).fadeIn().siblings().hide();
  });
  // ----------------------------------

  // -- :: Sign Up Page
  // Input Verification
  $('#sign-up-page #password-btn').on('click', function () {
    // toggle eye icon
    $('#sign-up-page #password-btn i').toggleClass('fa-eye-slash');
    var inputField = $('#sign-up-page #password-input');
    // get the attribute value
    var type = $(inputField).attr("type");
    // now test it's value
    if (type === 'password') {
      $(inputField).attr("type", "text");
    } else {
      $(inputField).attr("type", "password");
    }
  });
  // ----------------------------------

  // -- :: Login Page
  // Input Verification
  $('#login-page #password-btn').on('click', function () {
    // toggle eye icon
    $('#login-page #password-btn i').toggleClass('fa-eye-slash');
    var inputField = $('#password-input');
    // get the attribute value
    var type = $(inputField).attr("type");
    // now test it's value
    if (type === 'password') {
      $(inputField).attr("type", "text");
    } else {
      $(inputField).attr("type", "password");
    }
  });
  // ----------------------------------

  // -- :: About Us Page
  // Hide Information card
  $('#about-us-page .our-team .item .card-c').fadeOut(0);

  // Show Information Card
  $('#about-us-page .our-team .item > span, .our-team .item > img').on('click', function () {
    $(this).parents('.item').find('.card-c').fadeIn();
    // add overflow hidden to html
    if ($('html').hasClass('overflow-h') !== true) {
      $('html').addClass('overflow-h');
    } else {
      return false;
    }
  });

  // Hide Information Card
  $('#about-us-page .our-team .item .team-card button').on('click', function () {
    $(this).parents('.card-c').fadeOut();
    // remove overflow hidden to html
    if ($('html').hasClass('overflow-h') == true) {
      $('html').removeClass('overflow-h');
    } else {
      return false;
    }
  });

  // Map Section
  $("#about-us-page .flag").on('click', function () {
    $('.flag').removeClass('open');
    $(this).addClass('open');
  });
  $(document).mouseup(function (e) {
    var flag_con = $(".flag");
    // if the target of the click isn't the container nor a descendant of the container
    if (!flag_con.is(e.target) && flag_con.has(e.target).length === 0) {
      flag_con.removeClass('open');
    }
  });

}(jQuery));
