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
 * Main class for 'media_bcplayer'.
 *
 * @package    media_bcplayer
 * @copyright   2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license   http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

defined('MOODLE_INTERNAL') || die();


class media_bcplayer_plugin extends core_media_player {

    /**
    * Setup page requirements.
    *
    * @param moodle_page $page the page we are going to add requirements to.
    * @return void
    */
    public function setup($page) {
        $page->requires->js_amd_inline("require(['media_bcplayer/bcplayer'], function (bc) {bc.init();})");
    }

    public function embed($urls, $name, $width, $height, $options)
    {
        // TODO: Implement embed() method.
    }

    public function get_rank()
    {
        // TODO: Implement get_rank() method.
    }
}
