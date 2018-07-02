'use strict';
(function() {
//==============================================================================

function toggleSlides(anchor, parent) {
  if (parent.find('.speakerdeck-embed-wrapper').length === 0) {
    let scriptEl = $(document.createElement('script'))
    scriptEl.addClass('speakerdeck-embed')
    scriptEl.attr({
      'data-id': anchor.data('id'),
      'data-ratio': '1.77777777777778',
      'src': '//speakerdeck.com/assets/embed.js',
    })
    scriptEl.appendTo(parent)
    anchor.text('Hide slides')
  } else {
    parent.find('.speakerdeck-embed-wrapper').remove()
    anchor.text('View slides')
  }
}

function toggleVideo(anchor, parent) {
   if (parent.find('iframe').length === 0) {
     let dataId = anchor.data('id')
     let videoEl = $(`<div class="video-container">
      <iframe width="560" height="315"
        src="https://www.youtube.com/embed/${dataId}"
        frameborder="0" allowfullscreen>
      </iframe></div>`)
     videoEl.appendTo(parent)
     anchor.text('Hide video')
   } else {
     parent.find('.video-container').remove()
     anchor.text('View video')
   }
}

$('a[data-embed-type]').on('click', function(evt) {
  evt.preventDefault()
  let anchor = $(evt.target)

  let parent = anchor.parent('p')
  let embedType = anchor.data('embed-type')
  if (embedType === 'speakerdeck') {
    toggleSlides(anchor, parent)
  } else if (embedType === 'youtube') {
    toggleVideo(anchor, parent)
  }
})

//==============================================================================
})();
