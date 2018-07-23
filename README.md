# README
http://crowd-sound.herokuapp.com

CrowdSound is a SoundCloud inspired webapp. All logged-in users can upload content, view / edit their profile, like tracks, comment on tracks, and follow other users. Users who are not logged in are still able to listen to tracks and view artists.

The backend framework implements Ruby on Rails, with a combination of ActiveStorage and AWS cloud storage to manage user uploads. The frontend uses React.js and Redux to handle state.

Setup:
bundle install 
bundle exec rails db:setup 
npm install 
npm run webpack

npm install --save webpack react react-dom react-redux redux redux-logger babel-core babel-loader babel-preset-react babel-preset-env redux-thunk react-router-dom lodash react-addons-css-transition-group
