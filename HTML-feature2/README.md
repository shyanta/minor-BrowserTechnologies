# Video Element

## What is the Video Element and how to use it?
### What?
The video Element is used to create videos in a html page.
You can enter different formats and the browser will render and show the
right video.

### How?
A video element has to be entered in the following way:
```
<video width="480" controls
  poster="https://archive.org/download/WebmVp8Vorbis/webmvp8.gif" >
  <source
    src="https://archive.org/download/WebmVp8Vorbis/webmvp8.webm"
    type="video/webm">
  <source
    src="https://archive.org/download/WebmVp8Vorbis/webmvp8_512kb.mp4"
    type="video/mp4">
  <source
    src="https://archive.org/download/WebmVp8Vorbis/webmvp8.ogv"
    type="video/ogg">
  Your browser doesn't support HTML5 video tag.
</video>
```
## Compatibility
The Video tag is compatible with all of the new browsers. But IE8 or lower doesn't support it.
And so do more browsers have older versions that won't support it. 

## Poor Browser Fixes
For the browsers that don't
support it, create a download link, like the following link:
`<a href="https://archive.org/download/WebmVp8Vorbis/webmvp8.webm">download it</a> to watch it on your own computer`

## Sources
1. [Developer Mozilla Video](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/video)
2. [Can I Use #video](http://caniuse.com/#search=video)

