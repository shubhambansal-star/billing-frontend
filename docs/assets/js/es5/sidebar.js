"use strict";

function loadSidebar() {
  var sidebarHTML = "<ul class=\"sidebar__list\">\n<li>\n  <a href=\"index.html\"></a>\n  <ul>\n\n    <li>\n      <a href=\"index.html\" >Home</a>\n    </li>\n    <li>\n      <a href=\"layout.html\" >About</a>\n    </li>\n    <li>\n      <a href=\"routing.html\" >Contact Us</a>\n    </li>\n    \n\n</ul>\n";
  var $sidebar = $(".doc-content__sidebar").html(sidebarHTML);
  var path = window.location.pathname;
  var page = path.split("/").pop();

  $sidebar.find('.sidebar__list [href="' + path + '"]').addClass("active");
}