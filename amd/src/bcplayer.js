// This file is part of Moodle - http://moodle.org/
//
// Moodle is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.
//
// Moodle is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.
//
// You should have received a copy of the GNU General Public License
// along with Moodle.  If not, see <http://www.gnu.org/licenses/>.

/**
 * Brightcove Player javascript module.
 * @module     media_bcplayer/bcplayer
 * @package    media_bcplayer
 * @copyright   2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/event'], ($, Event) => {
    var bcs = {};
    /**
     * Set-up.
     *
     * Adds the listener for the event to then notify video.js.
     * @param {Function} executeonload function to execute when media_videojs/video is loaded
     */
    var setUp = function() {
        // Notify Video.js about the nodes already present on the page.
        notifyVideoJS(null, $('body'));
        // We need to call popover automatically if nodes are added to the page later.
        Event.getLegacyEvents().done(function(events) {
            $(document).on(events.FILTER_CONTENT_UPDATED, notifyVideoJS);
        });

    };

    /**
     * Notify video.js of new nodes.
     *
     * @param {Event} e The event.
     * @param {NodeList} nodes List of new nodes.
     */
    var notifyVideoJS = function(e, nodes) {
        var selector = '.brightcove-video-js-container';
        // Find the descendants matching the expected parent of the audio and video
        // tags. Then also addBack the nodes matching the same selector. Finally,
        // we find the audio and video tags contained in those parents. Kind thanks
        // to jQuery for the simplicity.
        nodes.find(selector)
            .addBack(selector)
                .find('video-js').each(function(index, video) {
                var $video = $(this);
                $video.html('');
                $video.attr('data-store-account', $video.attr('data-account'));
                $video.attr('data-store-player', $video.attr('data-player'));
                $video.attr('data-store-video-id', $video.attr('data-video-id'));
                $video.removeAttr('data-account');
                $video.removeAttr('data-player');
                $video.removeAttr('data-video-id');

            // Undefine 'bc' module so it can be reset using the next player's values.
            // Because Brightcove's script forces itself to be named 'bc' when called as
            // An AMD module, you have to undefine it before calling a second 'bc' module
            // With a different url. Simply changing the path and requiring it won't work.
            // It has to be undef'd before a second call can be made.
            window.requirejs.undef('bc');

            // Set the 'bc' module path using this video's account and player ids.
            window.requirejs.config({
                paths: {
                    'bc': `${location.protocol}//players.brightcove.net/${ $video.attr('data-store-account')}/${ $video.attr('data-store-player')}_default/index.min`
                }
            });
            // After 1 second signal that the job is finished with an error
            window.require(['bc'], (bc) => {
                // Store the current bc in bcs, because we're going to undefine it.
                bcs[`bc${$video.attr('data-store-account')}${$video.attr('data-store-player')}`] = bc;
                // Initialize all the videos for this account.
                $video.attr('data-account', $video.attr('data-store-account'));
                $video.attr('data-player', $video.attr('data-store-player'));
                $video.attr('data-video-id', $video.attr('data-store-video-id'));
                $video.removeAttr('data-store-account');
                $video.removeAttr('data-store-player');
                $video.removeAttr('data-store-video-id');
                var player = bcs[`bc${$video.attr('data-account')}${$video.attr('data-player')}`](video);
                player.controls(true);
                if (player.hasClass('vjs-play-button-shape-square')) {
                    player.removeClass('vjs-play-button-shape-square');
                }
            });
        });
    };


    return {
        setUp: setUp
    };


});
