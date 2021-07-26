<?php
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
 * Plugin file for media players.
 *
 * @package   media_bcplayer
 * @copyright 2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
defined('MOODLE_INTERNAL') || die();

/**
 * Plugin class for media_bcplayer.
 *
 * Media players return embed HTML for a particular way of playing back audio
 * or video (or another file type).
 * @package   media_bcplayer
 * @copyright 2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */
class media_bcplayer_plugin extends core_media_player_native
{

    /**
     * Setup page requirements.
     *
     * The typical javascript requirements MUST not take action on the content
     * directly. They are meant to load the required libraries and listen
     * to events in order to know when to take action. The role of this method
     * is not to provide a way for plugins to look for content to embed on the page.
     *
     * @param moodle_page $page The page we are going to add requirements to.
     * @since Moodle 3.2
     */
    public function setup($page){
        $page->requires->js_amd_inline("require(['media_bcplayer/bcplayer'], function (bc) {bc.setUp();})");
    }

    /**
     * Generates code required to embed the player.
     *
     * The returned code contains a placeholder comment '<!--FALLBACK-->'
     * (constant core_media_player::PLACEHOLDER) which indicates the location
     * where fallback content should be placed in the event that this type of
     * player is not supported by user browser.
     *
     * The $urls parameter includes one or more alternative media formats that
     * are supported by this player. It does not include formats that aren't
     * supported (see list_supported_urls).
     *
     * The $options array contains key-value pairs. See OPTION_xx constants
     * for documentation of standard option(s).
     *
     * @param array $urls URLs of media files
     * @param string $name Display name; '' to use default
     * @param int $width Optional width; 0 to use default
     * @param int $height Optional height; 0 to use default
     * @param array $options Options array
     */
    public function embed($urls, $name, $width, $height, $options) {
        // TODO: Implement embed() method.
    }

    /**
     * Gets the ranking of this player. This is an integer used to decide which
     * player to use (after applying other considerations such as which ones
     * the user has disabled).
     *
     * This function returns the default rank that can be adjusted by the administrator
     * on the Manage media players page.
     *
     */
    public function get_rank() {
        // TODO: Implement get_rank() method.
    }
}
