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

When on a Jira issue page, the plugin will attempt to identify which issue and then create a `Start Tracking Time` button in the upper right-hand corner of the page.

Click `Start Tracking Time` to start the timer, and again to stop. If `Shift + Click` is used on `Pause Tracking Time`, the `Log Work` modal should pop up with the time in `days hours minutes` auto populated.

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
