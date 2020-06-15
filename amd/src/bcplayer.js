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
 * JW Player module.
 *
 * @module     media_bcplayer/bcplayer
 * @package    media_bcplayer
 * @copyright  2017 Ruslan Kabalin, Lancaster University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(['jquery', 'core/event'],($, Event) => {
    const bcs = {}; // The object that will contain all our 'bc' RJS modules.

    const removeDataAttr = (videos) => {
        // Change all the data-player attribute to keep Brightcove from trying to
        // initialize every player when the first script is retrieved.
        videos.forEach((video) => {
            video.innerHTML = '';
            video.setAttribute('data-store-account', video.getAttribute('data-account'));
            video.setAttribute('data-store-player', video.getAttribute('data-player'));
            video.setAttribute('data-store-video-id', video.getAttribute('data-video-id'));
            video.removeAttribute('data-account');
            video.removeAttribute('data-player');
            video.removeAttribute('data-video-id');
        });
    };

    const loadBrightcove = async() => {
        const videoElements = document.querySelectorAll('video-js');
        const bcAccounts = Array.prototype.slice.call(videoElements)
            .map((video) => ({acc : video.getAttribute('data-account'), player : video.getAttribute('data-player')}))
            .filter((value, index, self) => self.indexOf(value) === index);
        removeDataAttr(videoElements);
        for (let index = 0; index < bcAccounts.length; index++) {
            await getBcModule(bcAccounts[index]);
        }
    };

    const getBcModule = function (obj) {

        // Undefine 'bc' module so it can be reset using the next player's values.
        // Because Brightcove's script forces itself to be named 'bc' when called as
        // an AMD module, you have to undefine it before calling a second 'bc' module
        // with a different url. Simply changing the path and requiring it won't work.
        // It has to be undef'd before a second call can be made.
        requirejs.undef('bc');

        // Set the 'bc' module path using this video's account and player ids.
        requirejs.config({
            paths: {
                'bc': `http://players.brightcove.net/${obj.acc}/${obj.player}_default/index.min`
            }
        });

        return new Promise(((resolve) => {
            // After 1 second signal that the job is finished with an error
            require(['bc'], (bc) => {
                // Store the current bc in bcs, because we're going to undefine it.
                bcs[`bc${obj.acc}${obj.player}`] = bc;
                // Initialize all the videos for this account.
                const player = initVideosByAccount(obj);
                player.on('loadedmetadata', () => {
                    resolve(player);
                });
            });
        }));
    };

    const initVideosByAccount = function (account) {
        // eslint-disable-next-line max-len
            const videos = document.querySelectorAll(`video-js[data-store-account='${account.acc}'][data-store-player='${account.player}']`);
            let res;
            videos.forEach((video) => {
                video.setAttribute('data-account', video.getAttribute('data-store-account'));
                video.setAttribute('data-player', video.getAttribute('data-store-player'));
                video.setAttribute('data-video-id', video.getAttribute('data-store-video-id'));
                res = bcs[`bc${account.acc}${account.player}`](video);
                res.controls(true);
                if (res.hasClass('vjs-play-button-shape-square')){
                    res.removeClass('vjs-play-button-shape-square');
                }
                // res.on('loadedmetadata',() => {
                //     console.log('Video duration: ' + res.duration() + 'secounds');
                //     console.log('Video Playback speed: ' + res.playbackRate() );
                //     console.log('User Active: ' + res.userActive() );
                //
                // });
                    // Fired when the current playback position has changed * During playback this is fired every
                    // 15-250 milliseconds, depending on the playback technology in use.
                res.on('timeupdate', () => {
                    // console.log('Video duration: ' + res.duration() + 'secounds');
                    // console.log('Video Playback speed: ' + res.playbackRate() );
                    // console.log('User Active: ' + res.userActive() );
                    console.log('Video remaining time: ' + res.remainingTime() );
                });
            });
            return res;
    };

    // Load all accounts and related players
    return {
        init() {

            $(document).on('brightcoveinsertedtodom',() => {
                loadBrightcove();
            });


            Event.getLegacyEvents().done((events) => {
                let count = 0;
                $(document).on(events.FILTER_CONTENT_UPDATED, () => {
                    count++;
                    if (count <= 1) {
                        loadBrightcove();
                        // $(".editor_atto_wrap").find('video-js').addBack('video-js').each(function() {
                        //     const __self = $(this);
                        //     __self.innerHTML = '';
                        //     getBcModule({acc: __self.data('account'), player: __self.data('player')});
                        // });
                    }
                });
            });
        }

    };

});
