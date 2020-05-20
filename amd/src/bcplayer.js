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
 * @module     media_jwplayer/jwplayer
 * @package    media_jwplayer
 * @copyright  2017 Ruslan Kabalin, Lancaster University
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

define(function() {
    /**
     * @param arr
     * @param i
     * @returns {[]|any[]|unknown[]|void}
     * @private
     */
    function _slicedToArray(arr, i) {
        return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
    }

    /**
     * @private
     */
    function _nonIterableRest() {
        // eslint-disable-next-line max-len
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
    }

    /**
     * @param o
     * @param minLen
     * @returns {any[]|unknown[]}
     * @private
     */
    function _unsupportedIterableToArray(o, minLen) {
        if (!o) return;
        if (typeof o === "string") return _arrayLikeToArray(o, minLen);
        var n = Object.prototype.toString.call(o).slice(8, -1);
        if (n === "Object" && o.constructor) n = o.constructor.name;
        if (n === "Map" || n === "Set") return Array.from(o);
        if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
    }

    /**
     * @param arr
     * @param len
     * @returns {any[]}
     * @private
     */
    function _arrayLikeToArray(arr, len) {
        if (len == null || len > arr.length) len = arr.length;
        for (var i = 0, arr2 = new Array(len); i < len; i++) {
            arr2[i] = arr[i];
        }
        return arr2;
    }

    /**
     * @param arr
     * @param i
     * @returns {[]}
     * @private
     */
    function _iterableToArrayLimit(arr, i) {
        if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = undefined;
        try {
            for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
                _arr.push(_s.value);
                if (i && _arr.length === i) break;
            }
        } catch (err) {
            _d = true;
            _e = err;
        } finally {
            try {
                if (!_n && _i["return"] != null) _i["return"]();
            } finally {
                if (_d) throw _e;
            }
        }
        return _arr;
    }

    /**
     * @param arr
     * @returns {*}
     * @private
     */
    function _arrayWithHoles(arr) {
        if (Array.isArray(arr)) return arr;
    }

    var videoElements = document.querySelectorAll('[data-video-id]');
    var bcAccounts = Array.prototype.slice.call(videoElements).map(function (video) {
        return video.getAttribute('data-account');
    }).filter(function (value, index, self) {
        return self.indexOf(value) === index;
    });
    var bcs = {}; // The object that will contain all our 'bc' RJS modules.

    var index = 0;
    var accountsPlayer = []; // Change all the data-player attribute to keep Brightcove from trying to
// initialize every player when the first script is retrieved.

    videoElements.forEach(function (video, index) {
        var playerId = video.getAttribute('data-player');
        var accountId = video.getAttribute('data-account');

        if (accountsPlayer[accountId]) {
            if (!accountsPlayer[accountId].includes(playerId)) {
                accountsPlayer[accountId].push(playerId);
            }
        } else {
            accountsPlayer[accountId] = [playerId];
        }

        video.setAttribute('data-store-player', playerId);
        video.removeAttribute('data-player');
    });
    /**
     * @param account string
     */
    function initVideosByAccount(account) {
        var videos = document.querySelectorAll("[data-account='".concat(account, "']"));
        videos.forEach(function (video) {
            video.setAttribute('data-player', video.getAttribute('data-store-player'));
            bcs["bc".concat(account)](video);
        });
    }

    /**
     * @param account string
     * @param player string
     */
    function getBcModule(account, player) {
        var pl = player ? player : 'default'; // Undefine 'bc' module so it can be reset using the next player's values.
        // Because Brightcove's script forces itself to be named 'bc' when called as
        // an AMD module, you have to undefine it before calling a second 'bc' module
        // with a different url. Simply changing the path and requiring it won't work.
        // It has to be undef'd before a second call can be made.

        window.requirejs.undef('bc'); // Set the 'bc' module path using this video's account and player ids.

        window.requirejs.config({
            paths: {
                'bc': "http://players.brightcove.net/".concat(account, "/").concat(pl, "_default/index.min")
            }
        }); // Get this bc module. Since it's async, get the next bc in the callback.

        require(['bc'], function (bc) {
            // Store the current bc in bcs, because we're going to undefine it.
            bcs["bc".concat(account)] = bc; // Initialize all the videos for this account.

            initVideosByAccount(account);

            if (index < bcAccounts.length - 1) {
                getBcModule(bcAccounts[++index]);
            }
        });
    }

    // Load all accounts and related players
    return {
        init: function() {
            for (var _i = 0, _Object$entries = Object.entries(accountsPlayer); _i < _Object$entries.length; _i++) {
                var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
                    key = _Object$entries$_i[0],
                    value = _Object$entries$_i[1];

                for (var _i2 = 0, _Object$entries2 = Object.entries(value); _i2 < _Object$entries2.length; _i2++) {
                    var _Object$entries2$_i = _slicedToArray(_Object$entries2[_i2], 2),
                        ind = _Object$entries2$_i[0],
                        val = _Object$entries2$_i[1];

                    getBcModule(key, val);
                }
            }
        }

    };

});
