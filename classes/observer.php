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
 * Event observers.
 *
 * @package    media_bcplayer
 * @copyright   2020 Brain station 23 ltd. <https://brainstation-23.com/>
 * @license    http://www.gnu.org/copyleft/gpl.html GNU GPL v3 or later
 */

use core\event\course_module_created;
use core\event\course_module_updated;

defined('MOODLE_INTERNAL') || die();

/**
 * Event observer.
 */
class media_bcplayer_observer
{

    /**
     * Observer for \core\event\course_module_created event.
     *
     * @param course_module_updated $event
     * @return void
     * @throws coding_exception
     * @throws dml_exception
     */
    public static function course_module_updated(course_module_updated $event){
        global $CFG, $DB;

        $modulename = $event->get_record_snapshot($event->other['modulename'], $event->other['instanceid']);
        $dom = new DOMDocument();
        $elem = @$dom->loadHTML($modulename->intro);
        $parentnodes = $dom->getElementsByTagName('video-js');
        foreach ($parentnodes as $parentNode){
            self::removevideojschild($parentNode);
        }
        $body = $dom->getElementsByTagName('body')->item(0);
        $modulename->intro = $dom->saveXML($body);
        $DB->update_record($event->other['modulename'], $modulename);
    }

    /**
     * Observer for \core\event\course_module_created event.
     *
     * @param course_module_created $event
     * @return void
     * @throws coding_exception|dml_exception
     */
    public static function course_module_created(course_module_created $event){
        global $CFG, $DB;

        $modulename = $event->get_record_snapshot($event->other['modulename'], $event->other['instanceid']);
        $dom = new DOMDocument();
        $elem = @$dom->loadHTML($modulename->intro);
        $parentnodes = $dom->getElementsByTagName('video-js');
        foreach ($parentnodes as $parentNode){
            self::removevideojschild($parentNode);
        }

        $body = $dom->getElementsByTagName('body')->item(0);
        $modulename->intro = $dom->saveXML($body);
        $DB->update_record($event->other['modulename'], $modulename);
    }

    /**
     * Remove video-js tag others child DOM elements.
     * @param DOMNode $parentnode
     */
    private static function removevideojschild(DOMNode $parentnode){
        if ($parentnode->hasAttribute('class')){
            $parentnode->removeAttribute('class');
            $parentnode->setAttribute('class', 'vjs-big-play-centered');
        }
        if ($parentnode->hasAttribute('data-store-video-id')){
            $parentnode->removeAttribute('data-store-video-id');
        }
        if ($parentnode->hasAttribute('data-store-account')){
            $parentnode->removeAttribute('data-store-account');
        }
        if ($parentnode->hasAttribute('data-store-player')){
            $parentnode->removeAttribute('data-store-player');
        }
        while ($parentnode->hasChildNodes()){
            $parentnode->removeChild($parentnode->firstChild);
        }

    }

}
