import React from 'react';
import { connect } from 'react-redux';
import { AutoForm, autoDispatchersByModel } from './AutoForm.jsx'

// TopicInput allows the user to enter a desired search topic.

// mapStateToProps is used by react-redux. It's used to translate the
// store's state into the component's props. See the connect() function
// at bottom. Also:
// http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
const mapStateToProps = function(store) {
  return Object.assign({input_enabled: store.input_enabled}, store.topic);
}

// Likewise, mapStateToProps is also used by react-redux's connect()
// function. It's used to define functions for altering state, which
// then get added to the component's props for use.
// http://redux.js.org/docs/basics/UsageWithReact.html#implementing-container-components
const mapDispatchToProps = function(dispatch, ownProps) {
  // Here we combine our local dispatch functions with the functions
  // generated by autoDispatchersByModel() in ./AutoForm.jsx.
  return Object.assign({
    commitValues: function(value) {
      dispatch({
        type: 'COMMIT_TOPIC',
        value: value
      });
    }
  }, autoDispatchersByModel(dispatch, "topic"))
}

// All the heavy lifting is done in AutoForm, so all we need from React
// here is a "functional" component.
// https://facebook.github.io/react/docs/components-and-props.html
function TopicInput(props) {
  return (
    <div className="content-blok topic-input">
      <h2>
        <span className="icon-heart"></span> {gon.topic_heading}
      </h2>
      <p className="field-prompt">
        {gon.topic_label}
      </p>
      <AutoForm url='/topics/autocomplete'
                placeholder={gon.topic_placeholder}
                emptyWarning={gon.topic_empty}
                inputName='topic[name]'
                tabIndex="1"
                {...props} />
    </div>
  )
}

// As mentioned above, this is where we wire the store into
// the component's props with react-redux's connect().
// http://redux.js.org/docs/basics/UsageWithReact.html
export default connect(mapStateToProps, mapDispatchToProps)(TopicInput);
