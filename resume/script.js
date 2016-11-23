'use strict';

$('a[data-embed-type]').on('click', function(evt) {
  evt.preventDefault()
  var anchor = $(evt.target)
  var dataId = anchor.data('id')
  var parent = anchor.parent()
  var embedType = anchor.data('embed-type')
  if (embedType === 'speakerdeck' && parent.find('div').length === 0) {
    var node = $(document.createElement('script'))
    node.addClass('speakerdeck-embed')
    node.attr('data-id', dataId)
    node.attr('data-ratio', '1.77777777777778')
    node.attr('src', "//speakerdeck.com/assets/embed.js")
    node.appendTo(parent)
  } else if (embedType === 'youtube' && parent.find('iframe').length === 0) {
    var node = $(`<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${dataId}" frameborder="0" allowfullscreen></iframe></div>`)
    node.appendTo(parent)
  }
});
