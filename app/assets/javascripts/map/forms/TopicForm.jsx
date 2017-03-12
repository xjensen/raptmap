import React from 'react';
import { connect } from 'react-redux';
import { AutoForm, autoDispatchersByModel } from './AutoForm.jsx'

// TopicForm allows the user to enter a desired search topic.

// mapStateToProps is used by react-redux. It's used to translate the
// store's state into the component's props. See the connect() function
// at bottom. Also:
// http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
const mapStateToProps = function(store) {
  return store.topic.live;
}

// Likewise, mapStateToProps is also used by react-redux's connect()
// function. It's used to define functions for altering state, which
// then get added to the component's props for use.
// http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
const mapDispatchToProps = function(dispatch, ownProps) {
  // Here we combine our local dispatch functions with the functions
  // generated by autoDispatchersByModel() in ./AutoForm.jsx.
  return Object.assign({
    // suggestionObject isn't needed here but it's part of what gets
    // sent to commitValues() by handleSubmit() in AutoForm.
    commitValues: function(value, suggestionObject) {
      dispatch({
        type: 'CHANGE_ALL',
        topic: {
          name: value
        },
        // LocationForm will be displayed next, so tell the store that
        // it has been revealed to the user.
        location: {
          revealed: true
        }
      });
    }
  }, autoDispatchersByModel(dispatch, "topic"))
}

// All the heavy lifting is done in AutoForm, so all we need from React
// here is a "functional" component.
// https://facebook.github.io/react/docs/components-and-props.html
function TopicForm(props) {
  return (
    <div className="topic-form">
      <p className="field-prompt">
        <span className="icon-heart"></span> Find people interested in:
      </p>
      <AutoForm url='/topics/autocomplete'
                placeholder="e.g., Basketball, Knitting, Mah Jong, etc."
                warning="Please add a topic"
                {...props} />
    </div>
  )
}

// As mentioned above, this is where we wire the store into
// the component's props with react-redux's connect().
// http://redux.js.org/docs/basics/UsageWithReact.html
export default connect(mapStateToProps, mapDispatchToProps)(TopicForm);
