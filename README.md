
How to Use:
使い方：

Click on index.html to open.
index.htmlをクッリクしてください。

Videos will begin playing automatically.
自動的にビデオが始まります。

The shuffle button will always produce a unique shuffle. No two videos will be
at the same index.
シャフルのボタンは毎回ユニークなシャフルを作ります。各ビデオは新たなポジションに動きます。

Users can change the order of videos by clicking, and then dragging them to where
they wish.
ビデオをクリック＆ドラッグして、希望のポジションに動かすことで、ユーザーは望ましいリストを作れます。


-----------
Maintenance:
メンテナンス:

Formatting:
All videos to be played MUST be formatted in this way: {title: STRING, videoId: STRING}.
The 'videoId' string is the unique YouTube id.
For example: https://www.youtube.com/watch?v=uLKCXn_aQrY&t=0s
In this example, the unique id is between 'watch?v=' and '&t=0s'.

フォーマット:
全部のビデオはフォーマットを守ってください：{title: STRING, videoId: STRING}
'videoId'の文字列とはユニークなYouTube IDです。
例えば: https://www.youtube.com/watch?v=uLKCXn_aQrY&t=0s
上記の例ではユニークなIDは'watch?v='と'&t=0s'の間です。

--

YouTube API
YouTube has a special API designed for it. Using 'react-youtube', we can use
these events. Whenever a change occurs in the player, an event is generated and
can be found at 'stateChange(event)'. If you wish to do further improvements, I
have left the unique numbers needed to do so.

YouTube API
YouTubeには特別なAPIがあります。'react-youtube'で私たちもこのイベントを使えます。YouTubeの
プレーヤーが変わる度に、新しいイベントが作られます。'stateChange(event)'で全部のイベントが見えます。
このプレーヤーの開発を続けるために、イベントの数を残しておきました。

-----------
The following NPM were used. If you have an error, consider checking these pages.
以下のNPM使いました。エラーが起こったら、このページを見てください。
react-sortable-hoc
https://github.com/clauderic/react-sortable-hoc
react-youtube
https://github.com/troybetz/react-youtube
react-bootstrap
https://react-bootstrap.github.io/components.html
