window.onbeforeunload = function(e) {
  window.location.href = window.location.href.replace(window.location.hash, "")
}

