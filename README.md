# Moodle-media_bcplayer

Plugin for fast HTML5 video player, specially for Brightcove video (bcplayer).

The Brightcove Player is up to 70% faster than any other video player. That’s fast. Each player is optimized by pre-compiling and compressing plugins, skin assets, and thumbnails to minimize download size. And, you’ll completely eliminate the need for Flash with the media source extensions (MSE) API.

Note: If you want to use Brightcove embedded code, No need to use this plugin. Just follow the [Embedding-brightcove-video](https://github.com/eLearning-BS23/moodle-media_bcplayer/blob/v-1.0.0/README.md#embedding-brightcove-video) portion. 

 How to use brightcove player :

 - Go to Media player setting
 - Enable Brightcove media player (bcplayer)
 - Install Moodle-atto_brightcove | https://github.com/eLearning-BS23/moodle-atto_brightcove atto editor plugin
 - Go to Atto editor and add Brightcove Account id, video id and player id by clicking brightcove icon from atto toolbar.
 - Click on `insert Brighrcove` video 
 - After click on `insert Brightcove` atto_birghtcove will insert necessary code to display brightcove video
 
 
 # embedding-brightcove-video:
 - Go to brightcove video, Copy ... 
    - iframe embed code (Standard) or 
    -  In-Page embed code (Advanced)
 - Go to Atto editor 
 - Open editor in source code mode
 - Pest the code in editor and this will render brightcove player automatically

[Check the docs for Choosing the Correct Embed Code for Brightcove ](https://studio.support.brightcove.com/publish/choosing-correct-embed-code.html)

# Instalation 
- Check how to install moodle plugins (https://docs.moodle.org/39/en/Installing_plugins)
- Or download and unzip the code
- Paste the code to /media/player/
