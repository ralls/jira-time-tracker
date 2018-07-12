# Jira Time Tracker - Alpha

## Installation
* Via Git Clone
  * Clone
  * In Chrome, go to `chrome://extensions`
  * Drop in `dist.crx` to install
* Via Download
  * Download & extract
  * In Chrome, go to `chrome://extensions`
  * Drop in `dist.crx` to install

## Usage

When on a Jira issue page, the plugin will attempt to identify which issue and then create a progress button in the upper righthand corner of the page.
The progress tracking is completely independent from Jira, so start/stop as you please.
Keep in mind that it's up to you to start/stop the timer - it is not done for you.

To toggle the menu, click the clock icon, or:

#### Mac
`cmd + shift + x`

#### Windows / Linux
`ctrl + shift + x`

#### Issue #
A link to the issue that opens a separate tab

#### Time Spent
The sum of time spent in `days hours minutes seconds`

#### Options:
* Reset
  * Reset the timer to `0d 0h 0m 0s` on the issue. Useful for when you log time and want to start over.
* Delete
  * Delete the issue from the tracker. Useful if you're done with the project.
