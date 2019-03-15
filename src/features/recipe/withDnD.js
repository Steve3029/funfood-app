import React from 'react';

const move = (arr, startIndex, toIndex) => {
  arr = arr.slice();
  arr.splice(toIndex, 0, arr.splice(startIndex, 1)[0]);
  return arr;
};

// This is HOC providing dnd function to its wrapped component.
function withDnD(WrappedComponent, collectionName) {
  return class extends React.Component {

    constructor(props) {
      super(props);
      this.state = {
        dragging: false,
        draggingIndex: -1,
        startPageY: 0,
        offsetPageY: 0,
      };
    }

    // handle dragging start activity
    handleMouseDown = (evt, index) => {
      this.setState({
        dragging: true,
        startPageY: evt.pageY,
        currentPageY: evt.pageY,
        draggingIndex: index,
        lineHeight: evt.target.parentNode.clientHeight,
      });
    };

    // handle drop off
    handleMouseUp = () => {
      this.setState({
        dragging: false,
        startPageY: 0,
        draggingIndex: -1
      });
    };

    // handle mouse moving
    handleMouseMove = evt => {
      let offset = evt.pageY - this.state.startPageY;
      const draggingIndex = this.state.draggingIndex;
      const lineHeight = this.state.lineHeight;

      if (offset > lineHeight && draggingIndex < this.props.values[collectionName].length - 1) {
        // move down
        offset -= lineHeight;
        this.props.setFieldValue(collectionName, move(this.props.values[collectionName], draggingIndex, draggingIndex + 1));
        this.setState({
          draggingIndex: draggingIndex + 1,
          startPageY: this.state.startPageY + lineHeight,
        });
      } else if (offset < -lineHeight && draggingIndex > 0) {
        // move up
        offset += lineHeight;
        this.props.setFieldValue(collectionName, move(this.props.values[collectionName], draggingIndex, draggingIndex - 1));
        this.setState({
          draggingIndex: draggingIndex - 1,
          startPageY: this.state.startPageY - lineHeight,
        });
      }
      this.setState({ offsetPageY: offset });
    };

    getDraggingStyle = index => {
      if (index !== this.state.draggingIndex)
        return {};
      return {
        backgroundColor: "#eee",
        transform: `translate(10px, ${this.state.offsetPageY}px)`,
        opacity: 0.5,
      };
    };

    render() {
      return (
        <div>
          <WrappedComponent
            handleMouseDown={this.handleMouseDown}
            getDraggingStyle={this.getDraggingStyle}
            handleMouseMove={this.handleMouseMove}
            handleMouseUp={this.handleMouseUp}
            isDragging={this.state.dragging}
            {...this.props}
          />
        </div>
      );
    }
  };
}

export default withDnD;