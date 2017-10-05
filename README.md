

Features:
Can play videos
Have a playlist showing at least 5 videos in the queue
Can change current video with next/previous button
Shuffle button that randomizes order and prevents same order from appearing twice
in a row
Allow user to change video order
 - Drag and drop would be most intuitive way to do this

Dev Cycle:
Get basic page up
Get basic video player up
Create basic, unchangeable playlist for testing
Creat next/prev button
Shuffle feature - Model after iTunes shuffle ( *** explain Big O complexity *** )
New playlist Component that allows users to add videos and drag/drop the video order, allowing for personalized playlist
* Style should attempt to be sort of youtube-esque, night-version
- alternating colors for playlist
- have active color for current video
- Add toggle npm for autoplay
Consider TWO youtube players, for varying screen widths; when viewport changes,
the players are switched in unison. @media should be able to help with this.
AJAX request to get video title
Write Big O complexity for Shuffle method
