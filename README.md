# Moodle-media_bcplayer

Plugin for fast HTML5 video player, specially for Brightcove video (bcplayer).

The Brightcove Player is up to 70% faster than any other video player. That’s fast. Each player is optimized by pre-compiling and compressing plugins, skin assets, and thumbnails to minimize download size. And, you’ll completely eliminate the need for Flash with the media source extensions (MSE) API.


# How to use brightcove player :

 - Go to site adminishtration > plugins overview
 - Click on settings icon beside Brightcove
 - Enable Brightcove Player (bcplayer)
 - you can also change width/height of video
 - Install Moodle-atto_brightcove | `https://github.com/eLearning-BS23/moodle-atto_brightcove` atto editor plugin
 - Go to Atto editor and add Brightcove Account id, video id and player id by clicking brightcove icon from atto toolbar.
 - Click on `insert Brighrcove` video
 - After click on insert Brightcove atto_birghtcove will insert necessary code to display brightcove video

# embedding-brightcove-video:
 - Go to brightcove video, Copy ...
 - iframe embed code (Standard) or
 - In-Page embed code (Advanced)
 - Go to Atto editor
 - Open editor in source code mode
 - Pest the code in editor and this will render brightcove player automatically
 - Check the docs for Choosing the Correct Embed Code for Brightcove (https://studio.support.brightcove.com/publish/choosing-correct-embed-code.html)

# Instalation 

# Installing via uploaded ZIP file
- Go to the Moodle plugins directory, select your current Moodle version, then download plugin with a Download button and download the ZIP file.
- Go to `[moodledirectory]/media/player/`
- Create new folder named `bcplayer`
- extract zip content in it

# Instalation via Github
- `cd [moodledirectory]/media/player/`
- clone plugin from github `git clone https://github.com/eLearning-BS23/moodle-media_bcplayer.git bcplayer`

- Go to your moodle website from browser
- Confirm the installation request
- Check the plugin validation report
