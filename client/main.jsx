import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import callPromise from '/lib/callPromise';
import App from './App';

Meteor.callPromise = callPromise;

Meteor.startup(() => {
  render(<App />, document.getElementById('react-target'));
});
