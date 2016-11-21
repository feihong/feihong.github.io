'use strict';

$('a[data-embed-type]').on('click', function(evt) {
  evt.preventDefault()
  var anchor = $(evt.target)
  var parent = anchor.parent()
  var embedType = anchor.data('embed-type')
  if (embedType === 'speakerdeck' && parent.find('div').length === 0) {
    var id = anchor.data('id')
    var node = $(`<script class="speakerdeck-embed" data-id="${id}" data-ratio="1.77777777777778" src="//speakerdeck.com/assets/embed.js"></script>`)
    node.appendTo(parent)
  }
})
