'use strict';

$('a[data-embed-type]').on('click', function(evt) {
  evt.preventDefault()
  var anchor = $(evt.target)
  var dataId = anchor.data('id')
  var parent = anchor.parent()
  var embedType = anchor.data('embed-type')
  if (embedType === 'speakerdeck' && parent.find('div').length === 0) {
    var node = $(`<script class="speakerdeck-embed" data-id="${dataId}" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>`)
    node.appendTo(parent)
  } else if (embedType === 'youtube' && parent.find('iframe').length === 0) {
    var node = $(`<div class="video-container"><iframe width="560" height="315" src="https://www.youtube.com/embed/${dataId}" frameborder="0" allowfullscreen></iframe></div>`)
    node.appendTo(parent)
  }
})
